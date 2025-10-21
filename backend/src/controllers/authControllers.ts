import { Request, Response } from "express";
import * as authServices from "../services/authServices";
import { catchAsync } from '../utils/catchAsync'
import { randomBytes } from "crypto";

import dotenv from 'dotenv';
import { getCookieOptions } from "../utils/getCookieOptions";
import { AppError } from "../utils/AppError";

dotenv.config();

const register = catchAsync(async (req: Request, res: Response) => {
    const { name, password, email } = req.body;

    await authServices.register(name, password, email);

    res.status(201).json({
        success: true,
    });
})

const verifyEmail = catchAsync(async (req: Request, res: Response) => {
    const { email, otp } = req.body;
    const { accessToken, refreshToken, user } = await authServices.verifyEmail(email, otp);

    res.cookie('refresh', refreshToken, getCookieOptions());

    res.status(200).json({
        success: true,
        accessToken,
        user
    });
})

const login = catchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const { accessToken, refreshToken, user } = await authServices.login(email, password);

    res.cookie('refresh', refreshToken, getCookieOptions())
    res.status(200).json({
        success: true,
        accessToken,
        user
    });

})

const logout = catchAsync(async (req: Request, res: Response) => {
    const cookies = req.cookies;
    if (!cookies?.refresh) return res.sendStatus(204)
    res.clearCookie('refresh', getCookieOptions());
    res.json({ message: 'Cookie cleared' });
})

const forgetPassword = catchAsync(async (req: Request, res: Response) => {
    const { email } = req.body;

    await authServices.forgetPassword(email);

    res.status(200).json({
        success: true,
        message: 'Password reset email sent'
    });
})

const resetPassword = catchAsync(async (req: Request, res: Response) => {
    const { password, email } = req.body;
    const { token } = req.params;

    const { accessToken, refreshToken, user } = await authServices.resetPassword(email, token, password);
    res.cookie('refresh', refreshToken, getCookieOptions())

    res.status(200).json({
        success: true,
        accessToken,
        user
    })
})

const refresh = catchAsync(async (req: Request, res: Response) => {

    const cookies = req.cookies;
    if (!cookies.refresh) return res.status(401).json({ message: "Unauthorized" })
    const refreshToken = cookies.refresh

    const accessToken = await authServices.refresh(refreshToken);

    res.status(200).json({
        success: true,
        accessToken
    });
})

const googleAuthRedirect = catchAsync(async (req: Request, res: Response) => {
    const SCOPES = [
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile",
    ];
    const scopes = encodeURIComponent(SCOPES.join(" "));

    const clientId = process.env.CLIENTID;
    const redirectUri = process.env.CALLBACK_URL;
    const OAUTH_URL = process.env.GOOGLE_OAUTH_URL
    const state = randomBytes(16).toString("hex");;
    const authUrl = `${OAUTH_URL}?client_id=${clientId}&redirect_uri=${redirectUri}&access_type=offline&response_type=code&state=${state}&scope=${scopes}`;
    res.redirect(authUrl);
})

const handleGoogleCallback = catchAsync(async (req: Request, res: Response) => {
    const code = req.query.code as string || undefined;
    if (!code) throw new AppError("Authorization code missing", 400);
    const refreshToken = await authServices.googleCallback(code);

    res.cookie('refresh', refreshToken, getCookieOptions());
    res.redirect(`${process.env.FRONTEND_URL}`);
})



export { register, login, logout, verifyEmail, resetPassword, forgetPassword, refresh, googleAuthRedirect, handleGoogleCallback }



