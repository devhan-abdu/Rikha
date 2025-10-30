import express from 'express';
import { validate } from '../middleware/Validation'
import * as  authController from '../controllers/authControllers'
import loginLimiter from '../middleware/loginLimiter';
import { forgetPasswordSchema, loginSchema, registerSchema, resetPasswordSchema, verifyEmailSchema } from '../validators/auth.schema';

const router = express.Router();

router.post('/auth/register', validate(registerSchema), authController.register);
router.post('/auth/verify-email', validate(verifyEmailSchema), authController.verifyEmail);
router.post('/auth/login',loginLimiter, validate(loginSchema), authController.login)
router.post('/auth/logout', authController.logout)

router.post('/auth/refresh', authController.refresh);

router.post('/auth/forgot-password', validate(forgetPasswordSchema), authController.forgetPassword);
router.put('/auth/reset-password/:token',loginLimiter, validate(resetPasswordSchema), authController.resetPassword);

router.get('/auth/google', authController.googleAuthRedirect)
router.get('/auth/github', authController.githubAuthRedirect)
router.get('/auth/google/callback',authController.handleGoogleCallback)
router.get('/auth/github/callback', authController.handleGithubCallback)


export { router as authRouter };
