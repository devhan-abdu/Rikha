import { Request, Response, NextFunction, RequestHandler } from "express";
import { body, cookie, param, validationResult } from 'express-validator';

const register: RequestHandler[] = [
   body('name').notEmpty().withMessage('Username is required'),
   body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
   body('email').isEmail().withMessage('Please enter a valid email').notEmpty().withMessage('email is required'),
   ((req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
      next();
   }) as RequestHandler
]

const verifyEmail: RequestHandler[] = [
   body('email').isEmail().withMessage('Please enter a valid email').notEmpty().withMessage('email is required'),
   body('otp').notEmpty().withMessage('otp required'),
   ((req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
      next();
   }) as RequestHandler
]
const login: RequestHandler[] = [
   body('email').isEmail().withMessage('Please enter a valid email').notEmpty().withMessage('email is required'),
   body('password').notEmpty().withMessage('password is  required'),
   ((req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
      next();
   }) as RequestHandler
]


const forgetPassword: RequestHandler[] = [
   body('email').isEmail().withMessage('Please enter a valid email').notEmpty().withMessage('email is required'),
   ((req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
      next();
   }) as RequestHandler
]

const resetPassword: RequestHandler[] = [
   param('token').notEmpty().withMessage('token not found'),
   body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
   ((req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
      next();
   }) as RequestHandler
]
const logout: RequestHandler[] = [
   cookie('resfresh').notEmpty().withMessage('token not found'),
   ((req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
      next();
   }) as RequestHandler
]



export { register, verifyEmail, login, logout, forgetPassword, resetPassword }; 