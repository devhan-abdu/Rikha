import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import  dotenv from "dotenv"


dotenv.config();


export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization || req.headers.Authorization as string
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as JwtPayload;
    req.user = { userId: decoded.userId, role: decoded.role };
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Forbidden' });
  }
}


