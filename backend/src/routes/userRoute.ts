import express from 'express';
import { validateRegistration } from '../middleware/validate';
import { handleEmailVerify, handleRegisterUser,handleLogin, handleForgotPassword, handleLogout, handleUpdateProfile ,handleprofile ,handleAllUsers ,handleResetPassword ,handleDeleteUser, handleRefreshToken} from '../controllers/userControllers';
import { isAdmin, isAuth } from '../middleware/isAuth';

const router = express.Router();

router.post('/auth/register', validateRegistration, handleRegisterUser);
router.post('/auth/verify-email', handleEmailVerify);
router.post('/auth/login', handleLogin)
router.post('/auth/logout' , handleLogout)

router.post('/auth/forgot-password', handleForgotPassword);
router.put('/auth/reset-password/:token', handleResetPassword);

router.get('/profile', isAuth,handleprofile);
router.put('/profile', isAuth, handleUpdateProfile);

router.get('/users', isAuth,isAdmin, handleAllUsers);
router.delete('/users/:id', isAuth, isAdmin, handleDeleteUser);

router.post('/refresh-token', handleRefreshToken); // Assuming this is for refreshing tokens, you might want to implement a dedicated handler for it.



export default router;
