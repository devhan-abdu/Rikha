import { OrderStatus, PaymentStatus } from "@prisma/client";
import prisma from "../config/prisma";
import { ExtendedOrderBody } from "../validators/order.schema";
import { AppError } from "../utils/AppError";
import { randomUUID } from 'crypto'
import { chapaRefund, createTransaction } from "../utils/createTransaction";

const createOrder = async (data: ExtendedOrderBody) => {
    const { userId, items, paymentMethod, addressId } = data;

    const user = await prisma.user.findUnique({
        where: { id: userId }
    })
    if (!user) throw new AppError('User not found', 404);

    const userAddress = await prisma.userAddress.findUnique({
        where: { id: addressId }
    })
    if (!userAddress) throw new AppError('Address not found', 404);

    const shippingData = {
        name: userAddress.name,
        country: userAddress.country,
        city: userAddress.city,
        subcity: userAddress.subcity,
        woreda: userAddress.woreda,
        houseNumber: userAddress.houseNumber,
        phoneNumber: userAddress.phoneNumber,
    };

    const tx_ref = `order-${randomUUID()}`;

    const newOrder = await prisma.$transaction(async (tx) => {
        const productId = items.map(item => item.productId);
        const products = await tx.product.findMany({
            where: {
                id: { in: productId }
            }
        });
        const productsMap = new Map(products.map(p => [p.id, p]))
        let serverTotalPrice = 0;

        for (const item of items) {
            const product = productsMap.get(item.productId)
            if (!product) throw new AppError(`Product with ID ${item.productId} not found.`);
            if (product.stock - product.reserved_qnt < item.quantity)
                throw new AppError(`Insufficient stock for product ${product.title}.`);


            await tx.product.update({
                where: { id: product.id },
                data: { reserved_qnt: { increment: item.quantity } },
            });

            const finalPrice = product.discount
                ? product.price * (1 - product.discount)
                : product.price;

            serverTotalPrice += finalPrice * item.quantity;

        }

        const order = await tx.order.create({
            data: {
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
        timeout: 5000,
    })

    const paymentUrl = await createTransaction(tx_ref, newOrder.totalAmount, newOrder.id)
    return paymentUrl;
}


const verifyPaymentAndHandleOrder = async (id: string) => {

    const verifyRes = await fetch(`https://api.chapa.co/v1/transaction/verify/${id}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${process.env.CHAPA_SECRET_KEY}`,
        }
    });
    const result = await verifyRes.json();
    const paymentStatus = result.status;


    if (paymentStatus === "success") {
        return await prisma.$transaction(async (tx) => {

            const order = await tx.order.findUnique({
                where: { tx_ref: id },
                include: { items: true }
            })
            if (!order) throw new AppError("Order not found.");

            for (const item of order.items) {
                await tx.product.update({
                    where: { id: item.productId },
                    data: {
                        reserved_qnt: { decrement: item.quantity },
                        stock: { decrement: item.quantity }
                    }
                })
            }

            return await tx.order.update({
                where: { tx_ref: id },
                data: {
                    paymentStatus: PaymentStatus.FAILED,
                    orderStatus: OrderStatus.PENDING_PAYMENT,
                },
                include: { shipping: true, items: true }
            });

        }, { timeout: 10000 });
    } else {

        return await prisma.$transaction(async (tx) => {
            const order = await tx.order.findUnique({
                where: { tx_ref: id },
                include: { items: true }
            })
            if (!order) throw new AppError("Order not found.");

            for (const item of order.items) {
                await tx.product.update({
                    where: { id: item.productId },
                    data: { reserved_qnt: { decrement: item.quantity } }
                });
            }

            return await tx.order.update({
                where: { tx_ref: id },
                data: {
                    paymentStatus: PaymentStatus.FAILED,
                    orderStatus: OrderStatus.PENDING_PAYMENT,
                },
                include: { shipping: true, items: true }
            });

        }, { timeout: 10000 });
    }
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
                            image: true,
                            title: true,
                            brand: true,
                            price: true,
                            discount: true,
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
    return prisma.$transaction(async (tx) => {
        const order = await tx.order.findUnique({
            where: { id: orderId },
            include: { items: true }
        });

        if (order?.userId !== userId) throw new AppError("Unauthorized", 403);

        if (!order) throw new AppError("Order not found", 404);
        if (!["PENDING_PAYMENT", "PROCESSING"].includes(order.orderStatus)) {
            throw new AppError("Cannot cancel", 400);
        }

        for (const item of order.items) {
            const updateData: any = {
                reserved_qnt: { decrement: item.quantity }
            };
            if (order.orderStatus === "PROCESSING") {
                updateData.stock = { increment: item.quantity };
            }
            await tx.product.update({
                where: { id: item.productId },
                data: updateData
            });
        }

        let paymentStatus = order.paymentStatus;
        if (order.orderStatus === "PROCESSING") {
            try {
                await chapaRefund(order.tx_ref);
                paymentStatus = "REFUNDED";
            } catch (e) {
                throw new AppError("Refund failed", 500);
            }
        }

        return tx.order.update({
            where: { id: orderId },
            data: {
                orderStatus: "CANCELLED",
                paymentStatus
            }
        });
    }, { timeout: 10000 });
};

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