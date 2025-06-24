import 'dotenv/config'
import jwt from 'jsonwebtoken'
import { AppError } from './AppError';
import dotenv from 'dotenv'

dotenv.config();

export const generateAccessToken = (role:string ,id:number) => {
   const secret = process.env.ACCESS_TOKEN_SECRET;
    if (!secret) {
        throw new AppError('Access token secret is not defined in environment variables' , 400);
    }
    const accessToken = jwt.sign(
        { 'userId':id , 'role':role },
        secret,
        { expiresIn: '1m' }
    )
    return accessToken;
}

export const generateRefreshToken = (id:number) => {
    const secret = process.env.REFRESH_TOKEN_SECRET;
    if (!secret) {  
        throw new AppError('Refresh token secret is not defined in environment variables', 400);
    }
    const refreshtoken = jwt.sign(
        { 'userId': id },
        secret,
        { expiresIn: '1d' }
    )

    return refreshtoken;
}