import { Request, Response, NextFunction , RequestHandler } from "express";
import {body , validationResult} from 'express-validator';

 export const validateRegistration:RequestHandler[] =[
    body('name').notEmpty().withMessage('Username is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('email').isEmail().withMessage('Email is not valid'),
   ( (req:Request , res:Response , next:NextFunction)=>{
        const errors= validationResult(req);
        if(!errors.isEmpty()) return res.status(400).json({errors:errors.array()});
        next();
    }) as RequestHandler
 ]


