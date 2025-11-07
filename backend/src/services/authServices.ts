import 'dotenv/config';
import { generateAccessToken, generateOTP, generateRefreshToken, generateResetToken } from '../utils/generateToken'
import prisma from '../config/prisma'
import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken';
import { sendverificationEmail, sendForgetEmail, sendResetEmail } from '../nodemailer/email';
import { AppError } from '../utils/AppError';
import { checkAccount } from '../utils/checkAccount';

const findUserByEmail = async (email: string,) => {
    return await prisma.user.findUnique({
        where: { email }
    })
}

const register = async (username: string, password: string, email: string) => {

    const existingUser = await findUserByEmail(email.toLowerCase())
    if (existingUser) throw new AppError("Email already exists. Please login instead.", 409);

    const hashedpwd = await bcrypt.hash(password, 10);
    const { code, expires } = generateOTP()

    await prisma.user.create({
        data: {
            username,
            email,
            password: hashedpwd,
            verified: false,
            otpCode: code,
            otpExpires: expires,
        }
    })
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
    return { user: { id: foundUser.id, email: foundUser.email, name: foundUser.username }, accessToken, refreshToken };
}
const login = async (email: string, password: string) => {
    const user = await findUserByEmail(email);
    if (!user) throw new AppError("Invalid email or password.", 401);
    if (!user.password) throw new AppError("This account uses Google or GitHub login.", 400);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new AppError("Invalid email or password.", 401);


    const accessToken = generateAccessToken(user.role, user.id)
    const refreshToken = generateRefreshToken(user.id)

    return { user: { id: user.id, email: user.email, name: user.username }, accessToken, refreshToken };

}

const forgetPassword = async (email: string) => {
    const user = await findUserByEmail(email)

    if (!user) throw new AppError('Invalid email', 401)
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
    if (!user) throw new AppError("Invalid email or reset token.", 401);

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

    return { user: { id: user.id, email: user.email, name: user.username }, accessToken, refreshToken };

}

const refresh = async (refreshToken: string) => {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as JwtPayload;

    const userId = decoded.userId;

    const user = await prisma.user.findUnique({
        where: { id: userId },
    });

    if (!user) throw new AppError('Invalid token', 404);

    const newAccessToken = generateAccessToken(user.role, user.id);
    return newAccessToken
};

const googleCallback = async (code: string) => {


    const tokenResponse = await fetch(process.env.GOOGLE_ACCESS_TOKEN_URL!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            code,
            client_id: process.env.GOOGLE_CLIENTID,
            client_secret: process.env.GOOGLE_CLIENTSECRET,
            redirect_uri: process.env.GOOGLE_CALLBACK_URL,
            grant_type: "authorization_code"
        }),
    });

    const { id_token } = await tokenResponse.json();

    const token_info_response = await fetch(
        `${process.env.GOOGLE_TOKEN_INFO_URL}?id_token=${id_token}`
    );

    const { email, name, sub: providerId } = await token_info_response.json();
    if (!email) throw new AppError("Something went wrong");


    const user = await checkAccount(providerId, "google", email, name);

    return {
        accessToken: generateAccessToken(user.role, user.id),
        refreshToken: generateRefreshToken(user.id)
    };

}

const githubCallback = async (code: string) => {

    const tokenResponse = await fetch(process.env.GITHUB_ACCESS_TOKEN_URL!, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            code,
            client_id: process.env.GITHUB_CLIENTID,
            client_secret: process.env.GITHUB_CLIENTSECRET,
            redirect_uri: process.env.GITHUB_CALLBACK_URL,
        }),
    });

    const { access_token } = await tokenResponse.json();
    if (!access_token) throw new AppError("Something went wrong");


    const userResponse = await fetch(`${process.env.GITHUB_INFO_URL}`, {
        headers: {
            "Authorization": `Bearer ${access_token}`,
            "Accept": "application/json",
        },
    });

    if (!userResponse.ok) throw new AppError("Something went wrong");

    const userData = await userResponse.json();
    let email = userData.email
    if (!email) {
        const emailsResponse = await fetch(`${process.env.GITHUB_INFO_URL}/emails`, {
            headers: { Authorization: `Bearer ${access_token}` }
        });
        const emails = await emailsResponse.json();
        email = emails.find((e: any) => e.primary)?.email;
        if (!email) throw new AppError("Something went wrong");

    }

    const { id: providerId, name } = userData
    const user = await checkAccount(providerId.toString(), "github", email, name);

    return {
        accessToken: generateAccessToken(user.role, user.id),
        refreshToken: generateRefreshToken(user.id)
    };

}


export { register, verifyEmail, login, resetPassword, refresh, forgetPassword, googleCallback, githubCallback }
