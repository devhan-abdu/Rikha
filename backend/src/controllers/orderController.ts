import { catchAsync } from "../utils/catchAsync"
import { NextFunction, Response, Request } from "express"
import { OrderBodySchema } from "../types/type";
import * as orderService from "../services/orderService";

export interface AuthenticatedRequest extends Request {
    user?: any;
}

const orderController = catchAsync(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const userId = req.user?.userId;

    const validationResult = OrderBodySchema.safeParse(req.body);
    if (!validationResult.success) {
        res.status(404).json({
            success: false,
            message: "bad request "
        })
        return
    }
    const { items, shippingAddressData, paymentMethod } = validationResult.data;

    const paymentUrl = await orderService.createOrder({ items, shippingAddressData, paymentMethod, userId })

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

const orderStatusController = catchAsync(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

    const txRef = req.query.tx_ref as string;
    const userId = req.user?.userId;

    if (!txRef || !userId) {
        return res.status(400).json({
            success: false,
            message: "Transaction reference and user authentication are required."
        });
    }

    const { success, order } = await orderService.orderStatus(txRef, userId);

    if (!success) {
        res.status(404).json({
            success: false,
            message: "Order not found or access denied."
        })
    } else {
        res.status(200).json({
            success: order.orderStatus,
            orderId: order.id
        })
    }


})

const getUserOrdersController = catchAsync(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const userId = req.user.userId;

    if (!userId) {
        return res.status(401).json({
            success: false,
            message: "User ID not found in token"
        });
    }

    const orders = await orderService.getOrdersByUserId(userId);
    res.status(200).json({
        success: true,
        data: orders
    });

})

export { orderController, verifyTransaction, orderStatusController, getUserOrdersController }