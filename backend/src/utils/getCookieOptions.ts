import { CookieOptions } from "express";
import dotenv from 'dotenv'

dotenv.config();
const isProduction = process.env.NODE_ENV === 'production';

export const getCookieOptions = (): CookieOptions => ({
  httpOnly: true,
  secure: true,
  sameSite: 'none',
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: "/",
})