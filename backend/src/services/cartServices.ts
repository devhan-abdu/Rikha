import prisma from "../config/prisma"
import { CartData } from "../validators/order.schema";

const addToCart = async (userId: number, items: CartData[]) => {

    prisma.$transaction(async (tx) => {

        if (items.length === 0) {
            await tx.cartItem.deleteMany({ where: { userId } })
            return { cart: [], outOfStock: [] }
        }

        await tx.cartItem.deleteMany({ where: { userId } })

        const productIds = items.map(item => item.productId)
        const products = await tx.product.findMany({
            where: { id: { in: productIds } },
            select: { id: true, stock: true },
        });

        const productMap = new Map(products.map(p => [p.id, p]));

        const outOfStock: number[] = [];

        const validItems = items.filter((i) => {
            const p = productMap.get(i.productId);
            if (!p) return false

            if (i.quantity > p.stock) {
                outOfStock.push(i.productId)
                return false
            }

            return true
        })

        if (validItems.length > 0) {
            await tx.cartItem.createMany({
                data: validItems.map((item) => ({
                    userId,
                    productId: item.productId,
                    quantity: item.quantity
                }))
            })
        }

        const cart = await tx.cartItem.findMany({
            where: { userId },
            include: {
                product: {
                    select: {
                        image: true,
                        title: true,
                        shortDesc: true,
                        price: true,
                        discount: true,
                        stock: true,
                        slug: true,
                    },
                },
            },
        });

        return { cart, outOfStock };
    });
};

const getCart = async (userId: number) => {

    return await prisma.cartItem.findMany({
        where: { userId },
        include: {
            product: {
                select: {
                    image: true,
                    title: true,
                    shortDesc: true,
                    price: true,
                    discount: true,
                    stock: true,
                    slug: true
                }
            }
        },
    });

}



const mergeCart = async (userId: number, items: CartData[]) => {

    if (items.length === 0) return { merged: [], outOfStock: [] }

    const productIds = items.map(item => item.productId);

    const products = await prisma.product.findMany({
        where: { id: { in: productIds } },
        select: { id: true, stock: true }
    })

    const productMap = new Map(products.map(p => [p.id, p]));
    const outOfStock: number[] = [];

    const validItems = items.filter((i) => {
        const p = productMap.get(i.productId);
        if (!p) return false

        if (i.quantity > p.stock) {
            outOfStock.push(i.productId)
            return false
        }
        return true
    })



    if (validItems.length === 0) return { merged: [], outOfStock };

    const merged = await prisma.$transaction(
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
    return { merged, outOfStock };
}

export { addToCart, getCart, mergeCart }