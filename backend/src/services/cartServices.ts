import prisma from "../config/prisma"
import { AppError } from "../utils/AppError";

const productSelect = {
    image: true,
    title: true,
    shortDesc: true,
    price: true,
    discount: true,
    stock: true,
    slug: true,
};


const addCart = async (userId: number, productId: number, quantity: number) => {
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) throw new AppError("Product not found", 404);

    await prisma.cartItem.upsert({
        where: { userId_productId: { userId, productId } },
        update: { quantity: { increment: quantity } },
        create: { userId, productId, quantity },
        include: { product: { select: productSelect } },
    });

    return await getCart(userId)

}

const getCart = async (userId: number) => {
    const cartItems = await prisma.cartItem.findMany({
        where: { userId },
        include: {
            product: {
                select: productSelect
            }
        },
    });

    return cartItems.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        ...item.product,
        availableStock: item.product.stock,
        outOfStock: item.product.stock < item.quantity,
    }))


}

const updateQuantity = async (userId: number, productId: number, quantity: number) => {
    const existing = await prisma.cartItem.findUnique({
        where: { userId_productId: { userId, productId } },
    })

    if (!existing) throw new AppError("Cart item not found", 400)

    if (quantity <= 0) {
        await prisma.cartItem.delete({ where: { userId_productId: { userId, productId } } });
        return
    }

    await prisma.cartItem.update({
        where: { userId_productId: { userId, productId } },
        data: { quantity },
        include: { product: { select: productSelect } },
    });


    return await getCart(userId)


}

const deleteCart = async (userId: number, productId: number) => {
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

    return await getCart(userId)

}

const clearCart = async (userId: number) => {
    await prisma.cartItem.deleteMany({
        where: { userId }
    })

    return await getCart(userId)

}

const merge = async (userId: number, items: { productId: number; quantity: number }[]) => {
    const productIds = items.map(item => item.productId);

    const products = await prisma.product.findMany({
        where: { id: { in: productIds } }
    })

    const productMap = new Map(products.map(p => [p.id, p]))

    const validItems = items.filter((i) => productMap.has(i.productId));

    if (validItems.length === 0) return [];

    await prisma.$transaction(async (tx) => {
        const result: any[] = []
        for (const item of validItems) {

            const updated = await tx.cartItem.upsert({
                where: { userId_productId: { userId, productId: item.productId } },
                update: { quantity: { increment: item.quantity } },
                create: { userId, productId: item.productId, quantity: item.quantity },
                include: { product: { select: productSelect } },
            });

            const { product } = updated
            const isOutOfStock = updated.product.stock < updated.quantity
            result.push({
                productId: updated.productId,
                quantity: updated.quantity,
                ...product,
                availableStock: updated.product.stock,
                outOfStock: isOutOfStock,

            })
        }

    }
    )

    return await getCart(userId)

}


export { addCart, getCart, deleteCart, updateQuantity, merge, clearCart }