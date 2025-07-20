import 'dotenv/config'
import jwt from 'jsonwebtoken'
import { AppError } from './AppError';
import dotenv from 'dotenv'
import { randomInt, randomBytes } from 'crypto';

dotenv.config();

 const generateAccessToken = (role:string ,id:number) => {
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
 const generateRefreshToken = (id:number) => {
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

const generateOTP = () => {
    return {
        code: randomInt(100000, 999999).toString(),
        expires: new Date(Date.now() + 1* 60 * 60 * 1000),
    }
}

const generateResetToken = () => {
    return {
        token: randomBytes(10).toString('hex'),
        expires: new Date(Date.now() + 1 * 60 * 60 * 1000)
    }

}

export {generateOTP , generateAccessToken , generateResetToken , generateRefreshToken}