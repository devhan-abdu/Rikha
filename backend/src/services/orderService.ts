import { OrderStatus, PaymentStatus } from "@prisma/client";
import prisma from "../config/prisma";
import { ExtendedOrderBody } from "../validators/order.schema";
import { AppError } from "../utils/AppError";
import { randomInt, randomUUID } from 'crypto'
import { chapaRefund, createTransaction } from "../utils/createTransaction";
import { deleteSelectedCartItems } from "./cartServices";

const createOrder = async (data: ExtendedOrderBody) => {
    const { userId, items, paymentMethod, addressId } = data;

    const [user, address] = await Promise.all([
        prisma.user.findUnique({ where: { id: userId } }),
        prisma.userAddress.findUnique({ where: { id: addressId } })
    ]);

    if (!user) throw new AppError("User not found", 404);
    if (!address) throw new AppError("Address not found", 404);

    const shippingData = {
        name: address.name,
        country: address.country,
        city: address.city,
        subcity: address.subcity,
        woreda: address.woreda,
        houseNumber: address.houseNumber,
        phoneNumber: address.phoneNumber,
    };

    const tx_ref = `order-${randomUUID()}`;
    let productIds: number[] = [];

    const newOrder = await prisma.$transaction(async (tx) => {
        productIds = items.map(item => item.productId);
        const products = await tx.product.findMany({
            where: { id: { in: productIds } }
        });

        const productsMap = new Map(products.map(p => [p.id, p]))

        let serverTotalPrice = 0;
        for (const item of items) {
            const product = productsMap.get(item.productId)
            if (!product) throw new AppError(`Product with ID ${item.productId} not found.`, 404);
            if (product.stock - product.reserved_qnt < item.quantity) {
                console.log(product.title, "updateQuantity", product.reserved_qnt)
                throw new AppError(`Insufficient stock for product ${product.title}.`, 409);
            }

            const finalPrice = product.discount
                ? product.price * (1 - product.discount)
                : product.price;

            serverTotalPrice += finalPrice * item.quantity;
        }

        await Promise.all(
            items.map(item =>
                tx.product.update({
                    where: { id: item.productId },
                    data: { reserved_qnt: { increment: item.quantity } },
                    select: { id: true, stock: true, reserved_qnt: true, title: true }
                })
            )
        )

        const id = randomInt(1, 2_147_483_647);
        const order = await tx.order.create({
            data: {
                id,
                userId: userId,
                tx_ref: tx_ref,
                totalAmount: serverTotalPrice,
                paymentMethod: paymentMethod,
                orderStatus: OrderStatus.PENDING_PAYMENT,
                paymentStatus: PaymentStatus.PENDING,
                shipping: { create: shippingData },
                items: {
                    createMany: {
                        data: items
                    },
                },
            },

            include: {
                items: true,
                shipping: true,
            }
        });

        return order
    }, {
        timeout: 100000,
        maxWait: 5000
    })

    const paymentUrl = await createTransaction(tx_ref, newOrder.totalAmount, newOrder.id)
    await deleteSelectedCartItems(userId, productIds)
    return paymentUrl;
}


const verifyPaymentAndHandleOrder = async (tx_ref: string) => {

    const verify = await fetch(`https://api.chapa.co/v1/transaction/verify/${tx_ref}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${process.env.CHAPA_SECRET_KEY}`,
        }
    }).then(res => res.json());

    const status = verify.status

    await prisma.$transaction(async tx => {

        const order = await tx.order.findUnique({
            where: { tx_ref },
            include: { items: true }
        })

        if (!order) return

        if (status === "success") {

            await Promise.all(
                order.items.map(item =>
                    tx.product.update({
                        where: { id: item.productId },
                        data: {
                            reserved_qnt: { decrement: item.quantity },
                            stock: { decrement: item.quantity }
                        }
                    })))

            await tx.order.update({
                where: { tx_ref },
                data: {
                    paymentStatus: PaymentStatus.COMPLETED,
                    orderStatus: OrderStatus.PROCESSING,
                },
                include: { shipping: true, items: true }
            })

        } else {

            await Promise.all(
                order.items.map(item =>
                    tx.product.update({
                        where: { id: item.productId },
                        data: {
                            reserved_qnt: { decrement: item.quantity },
                        }
                    })))

            await tx.order.update({
                where: { tx_ref },
                data: {
                    paymentStatus: PaymentStatus.FAILED,
                    orderStatus: OrderStatus.PENDING_PAYMENT,
                },
                include: { shipping: true, items: true }
            })
        }
    }, {
        timeout: 100000,
        maxWait: 5000
    })
}



const orderStatus = async (txRef: string, userId: number) => {
    const order = await prisma.order.findUnique({
        where: {
            tx_ref: txRef,
            userId: userId,
        },
        select: {
            id: true,
            userId: true,
            orderStatus: true,
            paymentStatus: true
        }
    })

    if (!order) {
        throw new AppError("Order not found", 404);
    }
    return order;
}

const getOrdersByUserId = async (userId: number) => {
    const orders = await prisma.order.findMany({
        where: { userId, isRemoved: false },
        include: {
            items: {
                include: {
                    product: {
                        select: {
                            id: true,
                            image: true,
                            title: true,
                            price: true,
                            discount: true,
                            shortDesc: true,
                            stock: true,
                            slug: true,
                        }
                    }
                }
            },
            shipping: true,
        },
        orderBy: {
            orderDate: 'desc'
        }
    })

    return orders;
}

const updateOrderStatus = async (orderId: number, userId: number) => {


    const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: { items: true }
    });

    if (!order) throw new AppError("Order not found", 404);
    if (order?.userId !== userId) throw new AppError("Unauthorized", 403);

    if (!["PENDING_PAYMENT", "PROCESSING"].includes(order.orderStatus)) {
        throw new AppError("Cannot cancel", 400);
    }

    const updatedOrder = await prisma.$transaction(async (tx) => {

        await Promise.all(
            order.items.map((item) => {
                const updateData: any = {
                    reserved_qnt: { decrement: item.quantity }
                };
                if (order.orderStatus === "PROCESSING") {
                    updateData.stock = { increment: item.quantity };
                }

                return tx.product.update({
                    where: { id: item.productId },
                    data: updateData
                });
            })
        )

        return tx.order.update({
            where: { id: orderId },
            data: {
                orderStatus: "CANCELLED",
            }
        });



    });

    let paymentStatus = order.paymentStatus

    if (order.orderStatus === "PROCESSING") {
        try {
            await chapaRefund(order.tx_ref);
            paymentStatus = "REFUNDED";
        } catch {
        }

        await prisma.order.update({
            where: { id: orderId },
            data: { paymentStatus },
        });
    }

    return { ...updatedOrder, paymentStatus }
}

const removeOrder = async (orderId: number, userId: number) => {

    const order = await prisma.order.findUnique({
        where: { id: orderId }
    })
    if (!order) throw new AppError("Order not found", 404)
    if (order?.userId !== userId) throw new AppError("Unauthorized", 403);

    if (order.orderStatus !== "DELIVERED" && order.orderStatus !== "CANCELLED") {
        throw new AppError("Cannot remove active order", 400);
    }
    await prisma.order.update({
        where: { id: orderId },
        data: {
            isRemoved: true
        }
    })
    return true
}



export { createOrder, verifyPaymentAndHandleOrder, orderStatus, getOrdersByUserId, updateOrderStatus, removeOrder }