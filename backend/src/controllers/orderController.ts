import { catchAsync } from "../utils/catchAsync"
import { NextFunction, Response, Request } from "express"
import * as orderService from "../services/orderService";

export interface AuthenticatedRequest extends Request {
    user?: any;
}

const orderController = catchAsync(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const userId = req.user?.userId;

    const { items, paymentMethod, addressId } = req.body;

    const paymentUrl = await orderService.createOrder({ items, paymentMethod, addressId, userId })

    res.status(200).json({
        success: true,
        data: paymentUrl
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

const orderStatusController = catchAsync(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

    const txRef = req.query.tx_ref as string;
    const userId = req.user?.userId;
    if (!txRef || !userId) {
        return res.status(400).json({
            success: false,
            message: "Transaction reference and user authentication are required."
        });
    }
    const order = await orderService.orderStatus(txRef, userId);

    res.status(200).json({
        success: true,
        data:order
    })

})

const getUserOrdersController = catchAsync(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const userId = req.user.userId;

    if (!userId) {
        return res.status(401).json({
            success: false,
            message: "User ID not found "
        });
    }

    const orders = await orderService.getOrdersByUserId(userId);
    res.status(200).json({
        success: true,
        data: orders
    });

})

export { orderController, verifyTransaction, orderStatusController, getUserOrdersController }