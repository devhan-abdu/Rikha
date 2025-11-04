import express from "express";
import * as order from "../controllers/orderController"
import { isAuth } from "../middleware/isAuth";
import { validate } from "../middleware/Validation";
import { OrderBodySchema } from "../validators/order.schema";

const router = express.Router();

router.post('/order',isAuth,validate(OrderBodySchema),order.orderController);
router.get('/verify-payment/:id' ,order.verifyTransaction)
router.get('/order-status',isAuth,order.orderStatus)
router.get('/my-orders',isAuth,order.getUserOrders)
router.patch("/cancel/:id", isAuth, order.updateOrderStatus)
router.delete("/remove/:id", isAuth, order.removeOrder)


export {router as orderRouter}