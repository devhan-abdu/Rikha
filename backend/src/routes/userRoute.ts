import express from 'express';
import * as  userController from '../controllers/userController'
import { isAuth, optionalAuth } from '../middleware/isAuth';


const router = express.Router();


router.route("/user/me")
    .get(isAuth, userController.getUser)
    .patch(isAuth, userController.updateUser)
    .delete(isAuth, userController.deleteUser);

router.patch("/user/change-password", isAuth, userController.changePassword)
router.post("/contact", optionalAuth, userController.sendContactMessage)



export { router as userRouter };
