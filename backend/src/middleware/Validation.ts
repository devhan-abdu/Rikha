import { Response, Request, NextFunction } from "express";
import { ZodError, ZodSchema } from "zod";


export const validate = (schema: ZodSchema<any>,  target: "body" | "params" | "query" = "body") => 
(req: Request, res: Response, next: NextFunction) => {
   try {
      schema.parse(req[target])
      next()
   } catch(err) {
      if( err instanceof ZodError) {
         return res.status(400).json({
            success: false,
            message: "Validation failed"
         })
      }
      next(err)
   }
}