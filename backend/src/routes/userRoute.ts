import express from 'express';
import * as authValidation from '../middleware/authValidation'
import * as  userController from '../controllers/userController'
import { isAuth } from '../middleware/isAuth';


const router = express.Router();

router.use(isAuth)

router.route("/user/me")
.get(userController.getUser)
.put(userController.updateUser)
.delete(userController.deleteUser);



export { router as userRouter };
