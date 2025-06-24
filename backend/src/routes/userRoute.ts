import express from 'express';
import { validateRegistration } from '../middleware/validate';
import { handleEmailVerify, handleRegisterUser,handleLogin} from '../controllers/userControllers';
import { RequestHandler } from 'express';

const router = express.Router();

router.post('/register', validateRegistration, handleRegisterUser);
router.post('/verify-email', handleEmailVerify);
router.post('/login', handleLogin)

export default router;
