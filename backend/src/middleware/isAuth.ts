import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from "dotenv"


dotenv.config();


export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.cookies?.access;
  if (!accessToken) {
    return res.status(401).json({ message: "Unauthorized" })
  }


  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!) as JwtPayload;
    req.user = { userId: decoded.userId, role: decoded.role };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" })
  }
}


