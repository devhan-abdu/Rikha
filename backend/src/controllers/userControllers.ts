// import { verifyOtp, registerUser, login, logout, forgetPwd, restPwd } from "../services/auth.js";
import { NextFunction, Request, Response } from "express";
import { registerUser, verifyOtp, login, logout, forgetPassword, resetPassword } from "../services/userServices";
import {  getUserProfile, updateUserProfile, getAllUsers ,deleteUser } from "../services/userServices";

import dotenv from 'dotenv';

dotenv.config();

export interface AuthenticatedRequest extends Request {
    user?: any;
}

export const handleRegisterUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, password, email } = req.body; //how error for req.body undifine handled 😕
        await registerUser(name, password, email);
        res.status(201).send('Registration successful! Please check your email for the OTP.');
    } catch (error) {
        next(error);
    }
}


// userControllers.ts
export const handleEmailVerify = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { otp } = req.body;
        if (!otp) {
            res.status(400).json('otp are required');
            return;
        }
        ;
        const { user, tokens } = await verifyOtp(otp);

        res.cookie('jwt', tokens.refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            message: 'OTP verified successfully',
            user,
            accessToken: tokens.accessToken,
        });
    } catch (error) {
        next(error);
    }
};


export const handleLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: 'Email and password are required' });
            return;
        }

        const { user, tokens } = await login(email, password);


        res.cookie('access', tokens.accessToken, {
            httpOnly: true,
            // secure: process.env.NODE_ENV === 'production',
            // sameSite: 'strict',
            maxAge: 15 * 60 * 1000,
        });


        res.cookie('refresh', tokens.refreshToken, {
            httpOnly: true,
            // secure: process.env.NODE_ENV === 'production',
            // sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });


        res.status(200).json({
            message: 'Successfully logged in',
            user,
        });
    } catch (error) {
        next(error);
    }
};

export const handleLogout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const refreshToken = req.cookies?.refresh;
        if (!refreshToken) {
            res.sendStatus(204);
            return;
        }

        res.clearCookie('refresh', {
            httpOnly: true,
            // secure: process.env.NODE_ENV === 'production',
            // sameSite: 'strict',
        })
        res.clearCookie('access', {
            httpOnly: true,
            // secure: process.env.NODE_ENV === 'production',
            // sameSite: 'strict',
        })
        await logout(refreshToken)
        res.sendStatus(204);

    } catch (error) {
        next(error);
    }
}

export const handleForgotPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = req.body;
        if (!email) {
            res.status(400).json({ success: false, message: 'email required' })
            return
        }
        await forgetPassword(email);
        res.status(200).json({ success: true, message: 'Password reset email sent' });
        return;
    } catch (error) {
        next(error);
    }
}
export const handleResetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { password } = req.body;
        const { token } = req.params;
        if (!token) {
            res.status(404).json({ success: false, message: 'token not found' })
            return
        }
        if (!password) {
            res.status(400).json({ success: false, message: 'password is required' });
            return;
        }
        if (password.length < 6) {
            res.status(400).json({ success: false, message: 'password must be at least 6 characters long' })
            return;
        }

        await resetPassword(token, password);
        res.status(200).json({ success: true, message: "password reset successfully" })
    } catch (error) {
        next(error);
    }
}

// handleUpdateProfile ,handleprofile ,handleAllUsers ,handleResetPassword ,handleDeleteUser
export const handleprofile = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {

        const userId = req.user.id
        const userInfo = await getUserProfile(userId)
        res.status(200).json({ success: true, user: userInfo });

    } catch (error) {
        next(error);
    }
}

export const handleUpdateProfile = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const { name, email }: { name?: string, email?: string } = req.body;

        if (!name && !email) {
            res.status(400).json({ success: false, message: 'At least one field (name or email) is required' });
            return;
        }
        // if(!req?.user){   not needed middleware already handled it  💪
        //     res.status(401).json({ success: false, message: 'user not found' });
        //     return;
        // }

        const updateduUser = await updateUserProfile(req.user.id, name, email);
        res.status(200).json({ success: true, message: 'profile updated successfully', user: updateduUser });

    } catch (error) {
        next(error);
    }
}

export const handleAllUsers = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {    // may add later pagination and search functionality
    try {
        const users = await getAllUsers();
        res.status(200).json({ success: true, users });
    } catch (error) {
        next(error);
    }
}

export const handleDeleteUser = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
      
    try {
        const userId = req.params.id;
        if(!userId){
            res.status(400).json({ success: false, message: 'User ID is required' });
            return;
        }
        const deletedUser = await deleteUser(userId);
       
        res.status(200).json({ success: true, message: 'User deleted successfully', user: deletedUser });
    }catch (error) {
        next(error);
    }
}

