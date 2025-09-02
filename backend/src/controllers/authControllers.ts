import { NextFunction, Request, Response } from "express";
import * as authServices from "../services/authServices";
import { catchAsync } from '../utils/catchAsync'

import dotenv from 'dotenv';
import { getCookieOptions } from "../utils/getCookieOptions";

dotenv.config();

export interface AuthenticatedRequest extends Request {
    user?: any;
}

const register =  catchAsync(async ( req:Request, res: Response, next: NextFunction ) => {
    const { name, password, email} = req.body;

    await authServices.register(name, password, email );

     res.status(201).json({
            success: true,
            message: 'Registration successful! Please check your email for the OTP.'
        });
})

const verifyEmail = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {email, otp} = req.body;
    const { user, tokens } = await authServices.verifyEmail(email, otp);

        res.cookie('access', tokens.accessToken, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000,
        });
        res.cookie('refresh', tokens.refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            success: true,
            message: 'OTP verified successfully',
            user,
        });
})

const login = catchAsync( async (req: Request, res: Response, next: NextFunction) => {
     const {email, password} = req.body;

     const { user, tokens } = await authServices.login(email, password);
 
        res.cookie('access', tokens.accessToken,getCookieOptions())         
        res.cookie('refresh', tokens.refreshToken,getCookieOptions())

        res.status(200).json({
            success: true,
            message: 'Login successful',
            user,
        });
     
})

const logout = catchAsync( async (req: Request, res: Response, next: NextFunction) => {
      
        res.clearCookie('refresh',getCookieOptions());
        res.clearCookie('access',getCookieOptions());

        await authServices.logout( req.cookies.refresh)

        res.sendStatus(204);
    })
    

const forgetPassword =catchAsync (async (req: Request, res: Response, next: NextFunction) => {
         const { email } = req.body;

        await authServices.forgetPassword(email);

        res.status(200).json({
             success: true,
             message: 'Password reset email sent'
             });     
})

const resetPassword =catchAsync( async (req: Request, res: Response, next: NextFunction) => {
        const { password, email } = req.body;
        const { token } = req.params; 

        await authServices.resetPassword(email, token, password);

        res.status(200).json({
             success: true,
            message: "password reset successfully"
         })
})

const refresh = catchAsync ( async (req: Request, res: Response, next: NextFunction) => {
  
        const tokens = await authServices.refresh(req.cookies?.refresh);

        res.cookie('access', tokens.accessToken, getCookieOptions())
        res.cookie('refresh', tokens.refreshToken,getCookieOptions())

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
//         // if(!req?.user){   not needed middleware already handled it  💪
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

export { register, login, logout, verifyEmail, resetPassword, forgetPassword, refresh}



