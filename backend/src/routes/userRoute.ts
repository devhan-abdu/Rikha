import express from 'express';
import { validateRegistration } from '../middleware/validate';
import { handleEmailVerify, handleRegisterUser,handleLogin, handleForgotPassword, handleLogout, handleResetPassword} from '../controllers/userControllers';
import { RequestHandler } from 'express';

const router = express.Router();

router.post('/register', validateRegistration, handleRegisterUser);
router.post('/verify-email', handleEmailVerify);
router.post('/login', handleLogin)
router.post('/logout' , handleLogout)

router.post('/forgot-password', handleForgotPassword);
router.post('/reset-password', handleResetPassword);



export default router;
