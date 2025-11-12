import { Request, Response, NextFunction } from "express";
import jwt, { decode, JwtPayload, TokenExpiredError } from 'jsonwebtoken';
import dotenv from "dotenv"
import prisma from "../config/prisma";
import { generateAccessToken } from "../utils/generateToken";
import { getCookieOptions } from "../utils/getCookieOptions";

dotenv.config();


interface JwtPayloadWithId extends JwtPayload {
  userId: string;
  role: string;
}


export const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.cookies?.access;
  const refreshToken = req.cookies?.refresh;

  if (!accessToken) {
    if (!refreshToken) return res.status(401).json({ message: "Unauthorized" });
    return await refresh(req, res, next);
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!) as JwtPayloadWithId;
    req.user = { userId: decoded.userId, role: decoded.role };
    return next();
  } catch (err: any) {
    if (err instanceof TokenExpiredError) {
      if (!refreshToken) return res.status(401).json({ message: "Unauthorized" });
      return await refresh(req, res, next);
    }

    return res.status(401).json({ message: "Invalid token" })
  }
}
export const optionalAuth = async (req: Request, res: Response, next: NextFunction) => {
  const refreshToken = req.cookies?.refresh;

  if (!refreshToken) {
    return next();
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as JwtPayloadWithId;
    req.user = { userId: decoded.userId, role: decoded.role };
  } catch (err: any) {
    console.log(err)
  }
  return next()
}

const refresh = async (req: Request, res: Response, next: NextFunction) => {
  const refreshToken = req.cookies?.refresh;
  if (!refreshToken) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as JwtPayloadWithId;
    const user = await prisma.user.findUnique({ where: { id: Number(decoded.userId) } })
    if (!user) return res.status(401).json({ message: "Invalid  refresh token" })

    const newAccessToken = generateAccessToken(user.role, user.id);
    res.cookie("access", newAccessToken, getCookieOptions(true));
    req.user = { userId: decoded.userId, role: decoded.role };
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }

}


