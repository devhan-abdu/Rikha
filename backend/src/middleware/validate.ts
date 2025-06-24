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




// export const validateLogin = async (req:Request, res:Response, next:NextFunction) => {
//   const { username, pwd } = req.body;

//   if (!username || !pwd) return res.status(400).json({ message: "Username and password required" });

//   const foundUser = userRepo.findUserByUserName(username);
//   if (!foundUser) return res.status(401).json({ message: "Invalid credentials" });

//   const match = await bcrypt.compare(pwd, foundUser.password);
//   if (!match) return res.status(401).json({ message: "Invalid credentials" });
//   req.user = foundUser;
//   next();
// };

// export const validateReset = async (req:Request, res:Response, next:NextFunction) => {
//     const {pwd , confPwd} = req.body;
//     if(pwd !== confPwd) return res.status(400).json({success:false , message:"Password and confirm password not match"});
//     if(pwd.length < 6) return res.status(400).json({success:false , message:"Passwod length must be at least 6 char"}) ;
//     next();
// }   

