import express from "express";
import { orderController, verifyTransaction , orderStatusController,getUserOrdersController } from "../controllers/orderController";
import { isAuth } from "../middleware/isAuth";

const router = express.Router();

router.get('/verify-payment/:id' ,verifyTransaction)
router.use(isAuth)

router.post('/order',orderController);
router.get('/order/status',orderStatusController )
router.get('/orders',getUserOrdersController  )


export {router as orderRouter}