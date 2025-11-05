import express from 'express';
import * as  userController from '../controllers/userController'
import { isAuth } from '../middleware/isAuth';


const router = express.Router();


router.route("/user/me")
.get(isAuth,userController.getUser)
.patch(isAuth,userController.updateUser)
.delete(isAuth,userController.deleteUser);



export { router as userRouter };
