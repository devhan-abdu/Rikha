import express from 'express';
import * as  userController from '../controllers/userController'
import { isAuth } from '../middleware/isAuth';


const router = express.Router();


router.route("/user/me")
    .get(isAuth, userController.getUser)
    .patch(isAuth, userController.updateUser)
    .delete(isAuth, userController.deleteUser);

router.patch("/user/change-password", isAuth, userController.changePassword)



export { router as userRouter };
