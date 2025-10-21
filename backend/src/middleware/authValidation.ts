import { Request, Response, NextFunction, RequestHandler } from "express";
import { body, cookie, param, validationResult } from 'express-validator';

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};


const register: RequestHandler[] = [
   body('name').notEmpty().withMessage('Username is required'),
   body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
   body('email').isEmail().withMessage('Please enter a valid email').notEmpty().withMessage('email is required'),
   validate
]

const verifyEmail: RequestHandler[] = [
   body('email').isEmail().withMessage('Please enter a valid email').notEmpty().withMessage('email is required'),
   body('otp').notEmpty().withMessage('otp required'),
   validate
]
const login: RequestHandler[] = [
   body('email').isEmail().withMessage('Please enter a valid email').notEmpty().withMessage('email is required'),
   body('password').notEmpty().withMessage('password is  required'),
   validate
]


const forgetPassword: RequestHandler[] = [
   body('email').isEmail().withMessage('Please enter a valid email').notEmpty().withMessage('email is required'),
   validate
]

const resetPassword: RequestHandler[] = [
   param('token').notEmpty().withMessage('token not found'),
   body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
   validate
]
const logout: RequestHandler[] = [
   cookie('resfresh').notEmpty().withMessage('token not found'),
   validate
]



export { register, verifyEmail, login, logout, forgetPassword, resetPassword }; 