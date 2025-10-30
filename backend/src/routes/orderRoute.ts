import express from "express";
import { orderController, verifyTransaction , orderStatusController,getUserOrdersController } from "../controllers/orderController";
import { isAuth } from "../middleware/isAuth";
import { validate } from "../middleware/Validation";
import { OrderBodySchema } from "../validators/order.schema";

const router = express.Router();

router.get('/verify-payment/:id' ,verifyTransaction)
router.post('/order',isAuth,validate(OrderBodySchema),orderController);
router.get('/order/status',isAuth,orderStatusController )
router.get('/orders',isAuth,getUserOrdersController)


export {router as orderRouter}