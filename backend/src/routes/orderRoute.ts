import express from "express";
import { orderController, verifyTransaction , orderStatusController,getUserOrdersController } from "../controllers/orderController";
import { isAuth } from "../middleware/isAuth";

const router = express.Router();

router.get('/verify-payment/:id' ,verifyTransaction)
router.post('/order',isAuth,orderController);
router.get('/order/status',isAuth,orderStatusController )
router.get('/orders',isAuth,getUserOrdersController)


export {router as orderRouter}