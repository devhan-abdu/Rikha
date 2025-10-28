import 'dotenv/config';
import { generateAccessToken, generateOTP, generateRefreshToken, generateResetToken } from '../utils/generateToken'
import prisma from '../config/prisma'
import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken';
import { sendverificationEmail, sendForgetEmail, sendResetEmail } from '../nodemailer/email';
import { AppError } from '../utils/AppError';


const findUserByEmail = async (email: string,) => {
    return await prisma.user.findUnique({
        where: { email }
    })
}


const register = async (name: string, password: string, email: string) => {

    const user = await findUserByEmail(email)
    if (user) throw new AppError('User already exists with this email', 409);

    const hashedpwd = await bcrypt.hash(password, 10);

    const { code, expires } = generateOTP()

    await prisma.user.create({
        data: {
            name,
            email,
            password: hashedpwd,
            verified: false,
            otpCode: code,
            otpExpires: expires,
        }
    })
    console.log(code)
    await sendverificationEmail(email, code)
}

const verifyEmail = async (email: string, otp: string) => {
    const foundUser = await prisma.user.findUnique({
        where: {
            email,
            otpCode: otp,
            otpExpires: {
                gt: new Date()
            }
        }
    })
    if (!foundUser) throw new AppError('otp invalid or expired', 400);

    const accessToken = generateAccessToken(foundUser.role, foundUser.id);
    const refreshToken = generateRefreshToken(foundUser.id);

    await prisma.user.update({
        where: { id: foundUser.id },
        data: {
            verified: true,
            otpCode: null,
            otpExpires: null,
        }
    })
    return { user: { id: foundUser.id, email: foundUser.email, name: foundUser.name }, accessToken, refreshToken };
}
const login = async (email: string, password: string) => {
    const user = await findUserByEmail(email);
    if (!user) throw new AppError('user not found', 404);

    if (user.provider === "credentials") {
        if (!user.password) throw new AppError("Password missing", 400);
        if (user.verified === false) throw new AppError('Please verify your email before logging in', 403);
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new AppError("Password incorrect", 400);
    } else {
        throw new AppError(`Please log in with ${user.provider}`, 400);
    }

    const accessToken = generateAccessToken(user.role, user.id)
    const refreshToken = generateRefreshToken(user.id)

    return { user: { id: user.id, email: user.email, name: user.name }, accessToken, refreshToken };

}

const forgetPassword = async (email: string) => {
    const user = await findUserByEmail(email)

    if (!user) throw new AppError('User not found', 401)
    const { token, expires } = generateResetToken();


    await prisma.user.update({
        where: { id: user.id },
        data: {
            resetToken: token,
            resetExpires: expires
        }
    })

    await sendForgetEmail(email, `${process.env.CLIENT_END_POINT}/reset-password?email=${email}&token=${token}`)

}
const resetPassword = async (email: string, token: string, password: string) => {
    const user = await prisma.user.findUnique({
        where: {
            email,
            resetToken: token,
            resetExpires: {
                gt: new Date()
            }
        }
    })
    if (!user) throw new AppError('User not found', 401)

    const hashedpassword = await bcrypt.hash(password, 10);
    await prisma.user.update({
        where: { id: user.id },
        data: {
            password: hashedpassword,
            resetToken: null,
            resetExpires: null,
            verified: true
        }
    })
    const accessToken = generateAccessToken(user.role, user.id)
    const refreshToken = generateRefreshToken(user.id)

    return { user: { id: user.id, email: user.email, name: user.name }, accessToken, refreshToken };

}

const refresh = async (refreshToken: string) => {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as JwtPayload;

    const userId = decoded.userId;

    const user = await prisma.user.findUnique({
        where: { id: userId },
    });

    if (!user) throw new AppError('User not found', 404);

    const newAccessToken = generateAccessToken(user.role, user.id);
    return newAccessToken
};

const googleCallback = async (code: string) => {
    const clientId = process.env.CLIENTID;
    const clientSecret = process.env.CLIENTSECRET;
    const redirectUri = process.env.CALLBACK_URL;
    const access_token_url = process.env.GOOGLE_ACCESS_TOKEN_URL!;

    const data = {
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code"
    }

    const tokenResponse = await fetch(access_token_url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    const access_token_data = await tokenResponse.json();
    const { id_token } = access_token_data;

    const token_info_response = await fetch(
        `${process.env.GOOGLE_TOKEN_INFO_URL}?id_token=${id_token}`
    );

    const token_info_data = await token_info_response.json();

    const { email, name } = token_info_data;

    const user = await prisma.user.upsert({
        where: { email },
        update: {
            name,
            verified: true,
        },
        create: {
            name,
            email,
            verified: true,
            provider: "google",
        }
    })

    const accessToken = generateAccessToken(user.role, user.id)
    const refreshToken = generateRefreshToken(user.id)

    return { accessToken, refreshToken };

}


export { register, verifyEmail, login, resetPassword, refresh, forgetPassword, googleCallback }
