import { Request , Response  , NextFunction } from "express";
import jwt from 'jsonwebtoken';

import { AppError } from "../utils/AppError";

export interface  AuthenticatedRequest extends Request {
    user?: any; 
}


export const isAuth= (req:AuthenticatedRequest , res:Response , next:NextFunction) => {
    const  token = req.cookies?.access;
    if(!token) {
         res.status(401).json({
            message:'unauthorized, no token provided'
         })
         return;
    } 
    try {
        const decoded = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET!)
        req.user = decoded;
    }catch (error) {
        return next(new AppError('Unauthorized, invalid token', 401));
    }
}

export const isAdmin = (req:AuthenticatedRequest , res:Response , next:NextFunction) => {
    if(req.user?.role !== 'admin') {
        return next(new AppError('Forbidden, admin access only', 403));
    }
    next();
}

