import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});

export const verifyEmailSchema = z.object({
  email: z.string().email(),
  otp: z.string().min(1),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const forgetPasswordSchema = z.object({
  email: z.string().email(),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1),
  password: z.string().min(6),
});

export const userUpdateSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  username: z.string().optional(),
  avatarUrl: z.string().optional(),
  email: z.email().optional(),
  phoneNumber: z
    .string()
    .min(10)
    .regex(/^(09|07)\d{8}$/)
    .optional(),
}).refine(data => Object.keys(data).length > 0, {
  message: "At least one field must be provided"
});


export type userData = z.infer<typeof userUpdateSchema>
