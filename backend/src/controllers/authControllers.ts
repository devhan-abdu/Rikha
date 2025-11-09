import { Request, Response } from "express";
import * as authServices from "../services/authServices";
import { catchAsync } from '../utils/catchAsync'
import { randomBytes } from "crypto";

import dotenv from 'dotenv';
import { getCookieOptions } from "../utils/getCookieOptions";
import { AppError } from "../utils/AppError";
import { success } from "zod";

dotenv.config();

export interface SessionRequest extends Request {
    session?: any;
}

const register = catchAsync(async (req: Request, res: Response) => {
    const { name, password, email } = req.body;

    await authServices.register(name, password, email);

    res.status(200).json({
        success: true,
        message: "User registered successfully. Please verify your email.",
    });
})

const verifyEmail = catchAsync(async (req: Request, res: Response) => {
    const { email, otp } = req.body;
    const { accessToken, refreshToken, user } = await authServices.verifyEmail(email, otp);

    res.cookie('access', accessToken, getCookieOptions(true));
    res.cookie('refresh', refreshToken, getCookieOptions(false));

    return res.status(200).json({
        success: true,
        message: "Login successful.",
        data: user,
    });
})

const login = catchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const { accessToken, refreshToken, user } = await authServices.login(email, password);

    res.cookie('access', accessToken, getCookieOptions(true))
    res.cookie('refresh', refreshToken, getCookieOptions(false))

    return res.status(200).json({
        success: true,
        message: "Login successful.",
        data: user,
    });

})

const logout = catchAsync(async (req: Request, res: Response) => {

    res.clearCookie('access', getCookieOptions(true));
    res.clearCookie('refresh', getCookieOptions(false));

    res.status(200).json({ success: true, message: "Logged out successfully." });
})

const forgetPassword = catchAsync(async (req: Request, res: Response) => {
    const { email } = req.body;

    await authServices.forgetPassword(email);

    res.status(200).json({
        success: true,
        message: "Reset code sent to email.",
    });
})

const resetPassword = catchAsync(async (req: Request, res: Response) => {
    const { password, email } = req.body;
    const { token } = req.params;
    if (!token) {
        return res.status(400).json({
            success: false,
            message: "Token is missing",
        });
    }

    const { accessToken, refreshToken, user } = await authServices.resetPassword(email, token, password);

    res.cookie('access', accessToken, getCookieOptions(true))
    res.cookie('refresh', refreshToken, getCookieOptions(false))

    return res.status(200).json({
        success: true,
        message: "Password reset successfull",
        data: user,
    });
})

const refresh = catchAsync(async (req: Request, res: Response) => {

    const cookies = req.cookies;
    if (!cookies.refresh) return res.status(401).json({ message: "Unauthorized" })

    const refreshToken = cookies.refresh
    const accessToken = await authServices.refresh(refreshToken);

    res.cookie('access', accessToken, getCookieOptions(true))

    res.status(200).json({
        success: true,
    });
})

const googleAuthRedirect = catchAsync(async (req: Request, res: Response) => {
    const SCOPES = [
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile",
    ];
    const scopes = encodeURIComponent(SCOPES.join(" "));

    const clientId = process.env.GOOGLE_CLIENTID;
    const redirectUri = process.env.GOOGLE_CALLBACK_URL;
    const OAUTH_URL = process.env.GOOGLE_OAUTH_URL
    const state = randomBytes(16).toString("hex");;
    const authUrl = `${OAUTH_URL}?client_id=${clientId}&redirect_uri=${redirectUri}&access_type=offline&response_type=code&state=${state}&scope=${scopes}`;
    res.redirect(authUrl);
})

const githubAuthRedirect = catchAsync(async (req: SessionRequest, res: Response) => {

    const clientId = process.env.GITHUB_CLIENTID;
    const redirectUri = process.env.GITHUB_CALLBACK_URL;
    const OAUTH_URL = process.env.GITHUB_OAUTH_URL
    const state = randomBytes(16).toString("hex");

    const authUrl = `${OAUTH_URL}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user user:email&state=${state}`
    res.redirect(authUrl);
})

const handleGoogleCallback = catchAsync(async (req: SessionRequest, res: Response) => {
    const code = req.query.code as string || undefined;
    if (!code) throw new AppError("Authorization code missing", 400);

    const { accessToken, refreshToken } = await authServices.googleCallback(code);

    res.cookie('access', accessToken, getCookieOptions(true));
    res.cookie('refresh', refreshToken, getCookieOptions(false));
    res.redirect(`${process.env.FRONTEND_URL}`);
})
const handleGithubCallback = catchAsync(async (req: Request, res: Response) => {
    const code = req.query.code as string || undefined;
    if (!code) throw new AppError("Authorization code missing", 400);

    const { accessToken, refreshToken } = await authServices.githubCallback(code);

    res.cookie('access', accessToken, getCookieOptions(true));
    res.cookie('refresh', refreshToken, getCookieOptions(false));
    res.redirect(`${process.env.FRONTEND_URL}`);
})



export { register, login, logout, verifyEmail, resetPassword, forgetPassword, refresh, googleAuthRedirect, handleGoogleCallback, githubAuthRedirect, handleGithubCallback }



