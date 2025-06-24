import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import { ErrorRequestHandler } from 'express';


export const errorHandler = (err:any, req:Request, res:Response, next:NextFunction) => {
   if(err instanceof AppError) {
       res.status(err.statusCode).json({
         success:false,
         message:err.message
      })
      return;
   }

   const message = 
   typeof err === "object" && err !==null && "message" in err
   ?(err as {message :string}).message
   :"Internal server error";
   res.status(500).json({ success: false, message });
}


