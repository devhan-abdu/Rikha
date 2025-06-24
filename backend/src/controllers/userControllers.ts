// import { verifyOtp, registerUser, login, logout, forgetPwd, restPwd } from "../services/auth.js";
import { NextFunction, Request, Response } from "express";
import { registerUser, verifyOtp, login } from "../services/userServices";
import dotenv from 'dotenv';

dotenv.config();


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


export const handleLogin = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json('email and password are required');
            return;
        }
        const { user, tokens } = await login(email, password);

        res.cookie('jwt', tokens.refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            message: ' successfully login in',
            user,
            accessToken: tokens.accessToken,
        });
    } catch (error) {
        next(error);
    }
}

// export const logoutHandler = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const refreshToken = req.cookies?.jwt;
//         if (!refreshToken) return res.sendStatus(204);
//         const userFound = await logout(refreshToken)

//         res.clearCookie('jwt', {
//             httpOnly: true,
//             // secure: true,
//             // sameSite: 'None',
//         })

//         if (!userFound) return res.sendStatus(204)
//         return res.status(200).json({ message: 'Logged out successfully' });
//     } catch (error) {
//         next(error);
//     }
// }

// export const forgetPwdHandler = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const { email } = req.body;
//         if (!email || !email.includes('@')) res.status(400).json({ success: false, message: 'invalid email' })
//         await forgetPwd(email);
//         return res.status(200).json('check you email we send it ')
//     } catch (error) {
//         next(error);
//     }
// }
// export const resetPwdHandler = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const { pwd } = req.body;
//         const { token } = req.params;
//         await restPwd(token, pwd);
//         return res.status(200).json({ success: true, message: "password reset successfully" })
//     } catch (error) {
//         next(error);
//     }
// }