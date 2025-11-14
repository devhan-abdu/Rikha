import { CookieOptions } from "express";
import dotenv from "dotenv";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

export const getCookieOptions = (isAccessToken: boolean): CookieOptions => ({
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  maxAge: isAccessToken
    ? 15 * 60 * 1000
    : 30 * 24 * 60 * 60 * 1000,
  path: "/",
  domain: ".rikha.store"
});
