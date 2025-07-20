import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";


export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
   if (err instanceof AppError) {
      res.status(err.statusCode).json({
         success: false,
         message: err.message,
      })
      return;
   }
   console.error(err.stack || err?.message, "custom error handler")
   res.status(500).json({
      success: false,
      message: 'Something went wrong',
   });
}


