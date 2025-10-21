import express from 'express';
import * as authValidation from '../middleware/authValidation'
import * as  authController from '../controllers/authControllers'
import loginLimiter from '../middleware/loginLimiter';

const router = express.Router();

router.post('/auth/register', authValidation.register, authController.register);
router.post('/auth/verify-email', authValidation.verifyEmail, authController.verifyEmail);
router.post('/auth/login',loginLimiter, authValidation.login, authController.login)
router.post('/auth/logout', authValidation.logout, authController.logout)

router.post('/auth/refresh', authController.refresh);

router.post('/auth/forgot-password', authValidation.forgetPassword, authController.forgetPassword);
router.put('/auth/reset-password/:token',loginLimiter, authValidation.resetPassword, authController.resetPassword);

router.get('/auth/google', authController.googleAuthRedirect)
router.get('/auth/google/callback',authController.handleGoogleCallback)


export { router as authRouter };
