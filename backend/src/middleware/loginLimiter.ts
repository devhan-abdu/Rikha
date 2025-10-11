import { NextFunction, Request, Response } from "express";
import rateLimit from "express-rate-limit";

const loginLimiter = rateLimit({
    windowMs: 60 * 10000,
    max: 5,
    message: {
        message: 'Too many attempts from this Ip, please try again after a 60 second pause'
    },
    handler: (req: Request, res: Response, next: NextFunction, options) => {
        res.status(options.statusCode).json(options.message)
    },
    standardHeaders: true,
    legacyHeaders: false,
})

export default loginLimiter