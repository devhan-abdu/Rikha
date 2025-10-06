import { OrderStatus, PaymentStatus } from "@prisma/client";
import prisma from "../config/prisma";
import { OrderBody, OrderItem } from "../types/type";
import { AppError } from "../utils/AppError";
import { randomBytes } from 'crypto'
import { createTransaction } from "../utils/createTransaction";

const createOrder = async (data: OrderBody) => {
    const { items, shippingAddressData, totalAmount, userId, paymentMethod } = data;

    const user = await prisma.user.findUnique({
        where: { id: userId }
    })
    if (!user) throw new AppError('User not found', 404);
    const productId = items.map(item => item.productId);
    const products = await prisma.product.findMany({
        where: {
            id: { in: productId }
        }
    });
    const productsMap = new Map(products.map(p => [p.id, p]))
    let serverTotalPrice = 0;
    const orderItemsForCreation: OrderItem[] = [];

    for (const item of items) {
        const product = productsMap.get(item.productId);

        if (!product) throw new AppError(`Product with ID ${item.productId} not found.`);
        if (product.stock < item.quantity) throw new AppError(`Insufficient stock for product ${product.title}.`);

        const finalPrice = product.discount ? product.price * (1 - product.discount) : product.price;
        serverTotalPrice += finalPrice * item.quantity;

        orderItemsForCreation.push({
            productId: item.productId,
            quantity: item.quantity,
        });
    }
    if (Math.abs(serverTotalPrice - totalAmount) > 0.01) {
        throw new AppError(`Total amount mismatch - possible tampering${serverTotalPrice}`);
    }


    const tx_ref = `order-${randomBytes(4).toString("hex")}`;

    const newOrder = await prisma.$transaction(async (tx) => {

        for (const item of items) {
            await tx.product.update({
                where: { id: item.productId },
                data: { stock: { decrement: item.quantity } }
            })
        }

        if (shippingAddressData.isDefault) {
            await tx.userAddress.create({
                data: {
                    userId: userId,
                    ...shippingAddressData
                }
            });
        }
        const { isDefault, ...shipping } = shippingAddressData
        const order = await tx.order.create({
            data: {
                userId: userId,
                tx_ref: tx_ref,
                totalAmount: serverTotalPrice,
                paymentMethod: paymentMethod,
                orderStatus: OrderStatus.PENDING,
                paymentStatus: PaymentStatus.PENDING,
                shipping: {
                    create: shipping
                },

                items: {
                    createMany: {
                        data: orderItemsForCreation
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
        timeout: 1000,
    })

    const paymentUrl = await createTransaction(tx_ref, serverTotalPrice, newOrder.id)
    return paymentUrl;
}


const verifyPaymentAndHandleOrder = async (id: string): Promise<{ success: boolean; order: any }> => {

    const verifyRes = await fetch(`https://api.chapa.co/v1/transaction/verify/${id}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${process.env.CHAPA_SECRET_KEY}`,
        }
    });
    const result = await verifyRes.json();
    const paymentStatus = result.status;
    console.log(id, "the id already ")


    if (paymentStatus === "success") {
        const order = await prisma.order.update({
            where: { tx_ref: id },
            data: {
                paymentStatus: PaymentStatus.COMPLETED,
                orderStatus: OrderStatus.PROCESSING
            },
            include: { shipping: true, items: true }
        });
        return { success: true, order: order };
    } else {

        try {
            const rollbackResult = await prisma.$transaction(async (tx) => {

                const orderWithItems = await prisma.order.findUnique({
                    where: { tx_ref: id },
                    select: {
                        id: true, items: true
                    }
                })
                if (!orderWithItems) throw new AppError("Order not found for rollback.");

                for (const item of orderWithItems.items) {
                    await tx.product.update({
                        where: { id: item.productId },
                        data: {
                            stock: { increment: item.quantity }
                        }
                    })
                }

                const updatedOrder = await tx.order.update({
                    where: { tx_ref: id },
                    data: {
                        paymentStatus: PaymentStatus.FAILED,
                        orderStatus: OrderStatus.PENDING,
                    },
                    include: { shipping: true, items: true }
                });

                return updatedOrder;
            }, { timeout: 10000 });

            return { success: false, order: rollbackResult };
        } catch (e: any) {
            console.error("Critical Rollback Failure:", e);
            return { success: false, order: null, };
        }
    }
}

export { createOrder, verifyPaymentAndHandleOrder }