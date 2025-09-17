import prisma from "../config/prisma"
import { AppError } from "../utils/AppError";

export const addCart = async (productId: number, quantity: string, userId: number) => {
    const product = await prisma.product.findUnique({
        where: { id: productId }
    });
    const qnt = parseInt(quantity)
    if (!product) throw new AppError("product not found", 404);
    if (product.stock < qnt) throw new AppError("not enough stock available", 400);

    await prisma.cartItem.upsert({
        where: {
               userId_productId: {
                userId,
                productId
            }
        },
        update: {
            quantity: { increment: qnt }
        },
        create: {
            userId,
            productId: product.id,
            quantity: qnt,

        }
    })

}

export const getCart = async (userId: number) => {
    const cartItems = await prisma.cartItem.findMany({
        where: { userId },
        include: { 
            product: {
                select: {
                    title: true,
                    image: true,
                    price: true,
                    brand: true,
                }
            }
        },
    });
    if (!cartItems.length) return [];

   return cartItems;
}

export const deleteCart = async (productId: number, userId: number) => {
    const cartItem = await prisma.cartItem.findUnique({
         where: {
            userId_productId: {
                userId,
                productId
            }
        }
    });

    if (!cartItem) throw new AppError("product  not found", 404);
    await prisma.cartItem.delete({
        where: {
            userId_productId: {
                userId,
                productId
            }
        }
    })
}

export const clearCart = async (userId: number) => {
    // is this needed to check if each product exist ornot  as pro dev but i assume their a possible way the frontend and the prisam not sync
    await prisma.cartItem.deleteMany({
        where: { userId }
    })
}

export const merge = async (userId: number, items: { productId: number, quantity: number }[]) => {
    const productIds = items.map(item => item.productId);

    const products = await prisma.product.findMany({
        where: { id: { in: productIds } }
    })

    const productMap = new Map(products.map(p=>[p.id , p]))

    const validItems = items.filter(item => {
        const product = productMap.get(item.productId)
        return product && item.quantity > 0 && product.stock >= item.quantity;
    })

    if (validItems.length === 0) return [];

    const result = await prisma.$transaction(
        validItems.map(item =>
            prisma.cartItem.upsert({
                where: {
                    userId_productId: {
                        userId,
                        productId: item.productId
                    }
                },
                update: {
                    quantity: { increment: item.quantity }
                },
                create: {
                    userId,
                    productId: item.productId,
                    quantity: item.quantity
                }
            })
        )
    );
    return result;
}