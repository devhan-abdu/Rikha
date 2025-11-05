import { Prisma } from "@prisma/client";
import prisma from "../config/prisma";
import { AppError } from "../utils/AppError";
import { randomInt } from 'crypto';
import { sendverificationEmail } from "../nodemailer/email";
import { userData } from "../validators/auth.schema";

const getUserProfile = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: { id: Number(userId) },
        select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
            phoneNumber: true,
            avatarUrl: true,
            email: true,
            role: true,
            verified: true,
            createdAt: true,
            updatedAt: true,
        }
    })

    if (!user) throw new AppError('User not found', 400)
    return user;
}
const updateUserProfile = async (userId: number, data: userData) => {

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new AppError('user not found ', 404)

    const updatedData: Prisma.UserUpdateInput = {};

    if (data.email && data.email !== user.email) {
        const existingUser = await prisma.user.findUnique({ where: { email: data.email } });
        if (existingUser) throw new AppError(' email already in use', 400)

        const otp = randomInt(100000, 999999).toString();
        const otpExpires = new Date(Date.now() + 60 * 60 * 1000);

        Object.assign(updatedData, {
            email: data.email,
            verified: false,
            otp,
            otpExpires
        })

        await sendverificationEmail(data.email, otp);
    }

    Object.assign(updatedData, data);

    return prisma.user.update({
        where: { id: userId },
        data: updatedData,
        select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
            phoneNumber: true,
            avatarUrl: true,
            email: true,
            role: true,
            verified: true,
            createdAt: true,
            updatedAt: true,
        }
    });
}

const getAllUsers = async () => {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
            phoneNumber: true,
            avatarUrl: true,
            email: true,
            role: true,
            verified: true,
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