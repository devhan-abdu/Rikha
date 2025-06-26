import 'dotenv/config';
import { generateAccessToken, generateRefreshToken } from '../utils/generateToken'
import { randomInt, randomBytes } from 'crypto';
import prisma from '../config/prisma'
import { Prisma } from '@prisma/client';
import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken';
import { sendverificationEmail, sendForgetEmail, sendResetEmail } from '../mailtrap/email';
import { AppError } from '../utils/AppError';




export async function registerUser(name: string, password: string, email: string) {

    const user = await prisma.user.findUnique({
        where: { email: email }
    })
    if (user) throw new AppError('User already exists with this email', 409);
    const hashedpwd = await bcrypt.hash(password, 10);

    const otpCode = randomInt(100000, 999999).toString();
    const otpExpires = new Date(Date.now() + 1 * 60 * 60 * 1000);

    await prisma.user.create({
        data: {
            name,
            email,
            password: hashedpwd,
            verified: false,
            otpCode,
            otpExpires,
        }
    })
    await sendverificationEmail(email, otpCode);


}

export async function verifyOtp(otp: string) {
    const foundUser = await prisma.user.findFirst({
        where: {
            otpCode: otp,
            otpExpires: {
                gt: new Date()
            }
        }
    })
    if (!foundUser) throw new AppError('otp invalid or expired', 400);

    const accessToken = generateAccessToken(foundUser.role, foundUser.id);
    const refreshToken = generateRefreshToken(foundUser.id);

    // modifing user
    await prisma.user.update({
        where: { id: foundUser.id },
        data: {
            verified: true,
            otpCode: null,
            otpExpires: null,
            refreshToken: refreshToken

        }
    })
    return { user: { id: foundUser.id, email: foundUser.email, name: foundUser.name }, tokens: { accessToken, refreshToken } };
}

export async function login(email: string, password: string) {
    const user = await prisma.user.findUnique({
        where: { email }
    })

    if (!user) throw new AppError('user not found', 404);
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) throw new AppError('password is incorrect', 400);
    if (user.verified === false) throw new AppError('Please verify your email before logging in', 403);


    const accessToken = generateAccessToken(user.role, user.id)
    const refreshToken = generateRefreshToken(user.id)

    await prisma.user.update({
        where: { id: user.id },
        data: {
            refreshToken: refreshToken

        }
    })
    return { user: { id: user.id, email: user.email, name: user.name }, tokens: { accessToken, refreshToken } };

}

export async function logout(refreshToken: string) {
    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as JwtPayload;

        const user = await prisma.user.findUnique({
            where: { id: decoded.userId }
        });
        if (!user) return;

        await prisma.user.update({
            where: { id: decoded.userId },
            data: { refreshToken: null }
        });
    }
    catch (error) {
        return;
    }
}

export async function forgetPassword(email: string) {
    const user = await prisma.user.findUnique({
        where: { email: email }
    })
    if (!user) throw new AppError('email is incorrect', 400)
    if (user.verified === false) throw new AppError('please verify your email first')
    const resetToken = randomBytes(10).toString('hex');
    const resetExpires = new Date(Date.now() + 1 * 60 * 60 * 1000);

    await prisma.user.update({
        where: { id: user.id },
        data: {
            resetToken,
            resetExpires
        }
    })

    await sendForgetEmail(email, `${process.env.CLIENT_END_POINT}/api/auth/reset-password/${resetToken}`)

}
export async function resetPassword(token: string, password: string) {
    const user = await prisma.user.findFirst({
        where: {
            resetToken: token,
            resetExpires: {
                gt: new Date()
            }
        }
    })
    if (!user || !user.verified) return;


    const hashedpassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
        where: { id: user.id },
        data: {
            password: hashedpassword,
            resetToken: null,
            resetExpires: null
        }
    })
}


export const getUserProfile = async (userId: string) => {
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
export const updateUserProfile = async (userId: string, name?: string, email?: string) => {

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

export const getAllUsers = async () => {
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

export const deleteUser = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: { id: Number(userId) }
    })
    if (!user) throw new AppError('user not found', 404);

    const deletedUser = await prisma.user.delete({
        where: { id: Number(userId) }
    })
    return deletedUser;
}

export const refreshTokenService = async (refreshToken: string) => {
  const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as JwtPayload;

  const userId = decoded.userId;

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) throw new AppError('User not found', 404);

  if (user.refreshToken !== refreshToken) {
    await prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null },
    });
    throw new AppError('Refresh token does not match', 403);
  }

  const newAccessToken = generateAccessToken(user.role, user.id);
  const newRefreshToken = generateRefreshToken(user.id);

  await prisma.user.update({
    where: { id: userId },
    data: { refreshToken: newRefreshToken },
  });

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
};
