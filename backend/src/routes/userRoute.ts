import express from 'express';
import * as authValidation from '../middleware/authValidation'
import * as  authController from '../controllers/authControllers'
import { isAdmin, isAuth } from '../middleware/isAuth';


const router = express.Router();

router.post('/auth/register', authValidation.register, authController.register);
router.post('/auth/verify-email', authValidation.verifyEmail, authController.verifyEmail);
router.post('/auth/login', authValidation.login, authController.login)
router.post('/auth/logout', authValidation.logout, authController.logout)

router.post('/auth/forgot-password', authValidation.forgetPassword, authController.forgetPassword);
router.put('/auth/reset-password/:token', authValidation.resetPassword, authController.resetPassword);

router.get('/auth/google', authController.googleAuthRedirect)
router.get('/auth/google/callback', authController.handleGoogleCallback)

router.post('/refresh-token', authController.refresh);



export { router as userRouter };
