import { Prisma } from "@prisma/client";
import prisma from "../config/prisma";
import { AppError } from "../utils/AppError";
import { randomInt }  from 'crypto';
import { sendverificationEmail } from "../nodemailer/email";

 const getUserProfile = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: { id: Number(userId) },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true,
        }
    })

    if (!user) throw new AppError('User not found', 400)
    return user;
}
 const updateUserProfile = async (userId: string, name?: string, email?: string) => {

    const updatedData: Prisma.UserUpdateInput = {};

    const user = await prisma.user.findUnique({ where: { id: Number(userId) } });
    if (!user) throw new AppError('user not found ', 404)

    if (email && email !== user.email) {

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) throw new AppError(' email already in use', 404)
        const otp = randomInt(100000, 999999).toString();
        const otpExpires = new Date(Date.now() + 1 * 60 * 60 * 1000);

        Object.assign(updatedData, {
            email,
            verified: false,
            otp,
            otpExpires

        })

        await sendverificationEmail(email, otp);
    }

    if (name) updatedData.name = name;

    const updatedUser = await prisma.user.update({
        where: { id: Number(userId) },
        data: updatedData,
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true,
        }

    })

    return updatedUser;
}

 const getAllUsers = async () => {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true,
        }
    })
    return users;
}

 const deleteUser = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: { id: Number(userId) }
    })
    if (!user) throw new AppError('user not found', 404);

    const deletedUser = await prisma.user.delete({
        where: { id: Number(userId) }
    })
    return deletedUser;
}

export { getAllUsers, getUserProfile, updateUserProfile, deleteUser }