import { catchAsync } from "../utils/catchAsync"
import { NextFunction, Response, Request } from "express"
import { OrderBodySchema } from "../types/type";
import * as orderService from "../services/orderService";


const orderController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const validationResult = OrderBodySchema.safeParse(req.body);
    if (!validationResult.success) {
        res.status(404).json({
            success: false,
            message: "bad request "
        })
        return
    }
    const paymentUrl = await orderService.createOrder(validationResult.data)

    res.status(200).json({
        success: true,
        url: paymentUrl
    });

})

 const verifyTransaction = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id

    if (!id) {
        return res.status(400).json({ success: false, message: "Transaction reference is required." });
    }

    const { success, order } = await orderService.verifyPaymentAndHandleOrder(id);

    if (success === true) {
        res.status(200).json({
            success: true,
            message: "Payment verified and order confirmed.",
            data: order
        });
    } else {
        res.status(400).json({
            success: false,
            message: "Payment verification failed. Order status updated/stock reverted.",
            data: order 
        });
    }
})

export { orderController, verifyTransaction}