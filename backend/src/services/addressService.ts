import prisma from "../config/prisma"
import { AddressData } from "../types/type"
import { AppError } from "../utils/AppError"

const getAll = async (userId: number): Promise<AddressData[]> => {
    const addresses = await  prisma.userAddress.findMany({
        where: { userId: userId },
        orderBy: [
            { isDefault: 'desc' },
            { createdAt: 'desc' },
        ],
        select: {
            id: true,
            userId: true,
            name: true,
            country: true,
            city: true,
            subcity: true,
            woreda: true,
            houseNumber: true,
            phoneNumber: true,
            isDefault: true
        }
    })
    return addresses
}
const getDefault = async (userId: number): Promise<AddressData | null> => {
    const address = await prisma.userAddress.findFirst({
        where: {
            userId: userId,
        },
        orderBy: [
            { isDefault: 'desc' },
            { createdAt: 'desc' },
        ],
        select: {
            id: true,
            userId: true,
            name: true,
            country: true,
            city: true,
            subcity: true,
            woreda: true,
            houseNumber: true,
            phoneNumber: true,
            isDefault: true
        }
    })

    return address
}
const create = async (userId: number, data: AddressData): Promise<AddressData> => {
    if (data.isDefault) {
        const address = await prisma.$transaction([
            prisma.userAddress.updateMany({
                where: { userId },
                data: {
                    isDefault: false
                }
            }),
            prisma.userAddress.create({
                data: {
                    ...data,
                    userId
                }
            })
        ])
        return address[1]
    } else {
        return await prisma.userAddress.create({ data: { ...data, userId } })
    }
}

const update = async (userId: number, id: number, data: AddressData): Promise<AddressData> => {

    const address = await prisma.userAddress.findUnique({ where: { id } })
    if (!address || address.userId !== userId) {
        throw new AppError("Address not found or unauthorized")
    }

    const updateAddress = await prisma.userAddress.update({
        where: { id },
        data: {
            ...data
        }
    })

    return updateAddress

}
const setDefault = async (userId: number, id: number): Promise<AddressData> => {

    const address = await prisma.userAddress.findUnique({ where: { id } })
    if (!address || address.userId !== userId) {
        throw new AppError("Address not found or unauthorized")
    }

    const defaultAddress = await prisma.$transaction([
        prisma.userAddress.updateMany({ where: { userId }, data: { isDefault: false } }),
        prisma.userAddress.update({ where: { id }, data: { isDefault: true } }),
    ]);
    return defaultAddress[1]
}

const deleteAddress = async (userId: number, id: number): Promise<AddressData> => {
    const address = await prisma.userAddress.findUnique({ where: { id } })
    if (!address || address.userId !== userId) {
        throw new AppError("Address not found or unauthorized")
    }
    return await prisma.userAddress.delete({
        where: { id }
    })
}

export { getAll, getDefault, create, update, setDefault, deleteAddress }
