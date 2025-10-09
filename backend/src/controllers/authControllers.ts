import { NextFunction, Request, Response } from "express";
import * as authServices from "../services/authServices";
import { catchAsync } from '../utils/catchAsync'
import { randomBytes } from "crypto";

import dotenv from 'dotenv';
import { getCookieOptions } from "../utils/getCookieOptions";

dotenv.config();

export interface AuthenticatedRequest extends Request {
    user?: any;
}

const register = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { name, password, email } = req.body;

    await authServices.register(name, password, email);

    res.status(201).json({
        success: true,
        message: 'Registration successful! Please check your email for the OTP.'
    });
})

const verifyEmail = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { email, otp } = req.body;
    const { user, tokens } = await authServices.verifyEmail(email, otp);

    res.cookie('access', tokens.accessToken, getCookieOptions(true));
    res.cookie('refresh', tokens.refreshToken, getCookieOptions(false));

    res.status(200).json({
        success: true,
        message: 'OTP verified successfully',
        user,
    });
})

const googleAuthRedirect = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
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

const handleGoogleCallback = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const code = req.query.code as string || undefined;
    if (!code) {
        return res.status(400).json({ error: "Authorization code missing" });
    }
    const { accessToken, refreshToken } = await authServices.googleCallback(code);

    res.cookie('access', accessToken, getCookieOptions(true));
    res.cookie('refresh', refreshToken, getCookieOptions(false));
    res.redirect(`${process.env.FRONTEND_URL}/`);

})


const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const { user, tokens } = await authServices.login(email, password);

    res.cookie('access', tokens.accessToken, getCookieOptions(true))
    res.cookie('refresh', tokens.refreshToken, getCookieOptions(false))
    console.log(res.getHeaders()['set-cookie']);
    res.status(200).json({
        success: true,
        message: 'Login successful',
        user,
    });

})

const logout = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    res.clearCookie('refresh', getCookieOptions(true));
    res.clearCookie('access', getCookieOptions(false));

    await authServices.logout(req.cookies.refresh)

    res.sendStatus(204);
})


const forgetPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    await authServices.forgetPassword(email);

    res.status(200).json({
        success: true,
        message: 'Password reset email sent'
    });
})

const resetPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { password, email } = req.body;
    const { token } = req.params;

    await authServices.resetPassword(email, token, password);

    res.status(200).json({
        success: true,
        message: "password reset successfully"
    })
})

const refresh = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const tokens = await authServices.refresh(req.cookies?.refresh);

    res.cookie('access', tokens.accessToken, getCookieOptions(true))
    res.cookie('refresh', tokens.refreshToken, getCookieOptions(false))

    res.status(200).json({
        success: true,
        message: 'Tokens refreshed successfully'
    });
})


// handleUpdateProfile ,handleprofile ,handleAllUsers ,handleResetPassword ,handleDeleteUser
// export const handleGetUser = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
//     try {

//         const userId = req.user.userId

//         const userInfo = await getUser(userId)
//         res.status(200).json({ success: true, user: userInfo });

//     } catch (error) {
//         next(error);
//     }
// }

// export const handleUpdateProfile = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
//     try {
//         const { name, email }: { name?: string, email?: string } = req.body;

//         if (!name && !email) {
//             res.status(400).json({ success: false, message: 'At least one field (name or email) is required' });
//             return;
//         }
//         // if(!req?.user){   💪
//         //     res.status(401).json({ success: false, message: 'user not found' });
//         //     return;
//         // }

//         const updateduUser = await updateUserProfile(req.user.userId, name, email);
//         res.status(200).json({ success: true, message: 'profile updated successfully', user: updateduUser });

//     } catch (error) {
//         next(error);
//     }
// }

// export const handleAllUsers = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {    // may add later pagination and search functionality
//     try {
//         const users = await getAllUsers();
//         res.status(200).json({ success: true, users });
//     } catch (error) {
//         next(error);
//     }
// }

// export const handleDeleteUser = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

//     try {
//         const userId = req.params.id;
//         if (!userId) {
//             res.status(400).json({ success: false, message: 'User ID is required' });
//             return;
//         }
//         const deletedUser = await deleteUser(userId);

//         res.status(200).json({ success: true, message: 'User deleted successfully', user: deletedUser });
//     } catch (error) {
//         next(error);
//     }


// }

export { register, login, logout, verifyEmail, resetPassword, forgetPassword, refresh, googleAuthRedirect, handleGoogleCallback }



