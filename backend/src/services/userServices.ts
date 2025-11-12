import { Prisma } from "@prisma/client";
import prisma from "../config/prisma";
import { AppError } from "../utils/AppError";
import { randomInt } from 'crypto';
import { sendPasswordChangedEmail, sendverificationEmail } from "../nodemailer/email";
import { contactData, userData } from "../validators/auth.schema";
import bcrypt from "bcrypt"

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

const changePassword = async (userId: number, password: string, newPassword: string) => {
    const user = await prisma.user.findUnique({
        where: { id: userId }, include: {
            oauthAccounts: true
        }
    },);
    if (!user) throw new AppError("User not found", 404);

    if (user.oauthAccounts.length <= 0 && !user.password) {
        throw new AppError(
            "You signed in using an external provider. Please manage your password there.",
            400
        );

    }

    const isMatch = await bcrypt.compare(password, user.password!);
    if (!isMatch) throw new AppError("Current password is incorrect", 401);

    const isSame = await bcrypt.compare(newPassword, user.password!);
    if (isSame) throw new AppError("New password cannot be the same as the old one", 400);

    const hashed = await bcrypt.hash(newPassword, 10);
    const update = await prisma.user.update({
        where: { id: user.id },
        data: { password: hashed },
    });

    await sendPasswordChangedEmail(update, {
        city: "Addis Ababa",
        country: "ET",
    });

    return update;
};


const deleteUser = async (userId: number) => {
    const user = await prisma.user.findUnique({
        where: { id: Number(userId) }
    })
    if (!user) throw new AppError('user not found', 404);

    const deletedUser = await prisma.user.delete({
        where: { id: Number(userId) }
    })
    return deletedUser;
}
const createContactMessage = async (userId: number | null, data: contactData) => {
    let userIdValue: number | null = null

    if (userId) {
        const user = await prisma.user.findUnique({
            where: { id: Number(userId) }
        })
        if (user) {
            userIdValue = user.id
        }
    }


    return await prisma.contactMessage.create({
        data: {
            ...data,
            userId: userIdValue
        }
    })

}



export { getAllUsers, getUserProfile, updateUserProfile, deleteUser, changePassword, createContactMessage }