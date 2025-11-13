import { catchAsync } from "../utils/catchAsync"
import { NextFunction, Response, Request } from "express"
import * as orderService from "../services/orderService";



const orderController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = Number(req.user?.userId);


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

    const order = await orderService.verifyPaymentAndHandleOrder(id);

    res.status(200).json({
        success: true,
        data: order
    });
})

const orderStatus = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const txRef = req.query.tx_ref as string;
    const userId = Number(req.user?.userId);


    if (!txRef) {
        return res.status(400).json({
            success: false,
            message: "Transaction reference required."
        });
    }
    const order = await orderService.orderStatus(txRef, userId);

    res.status(200).json({
        success: true,
        data: order
    })

})

const getUserOrders = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = Number(req.user?.userId);


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
const updateOrderStatus = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = Number(req.user?.userId);

    const orderId = Number(req.params.id)

    const order = await orderService.updateOrderStatus(orderId, userId);
    res.status(200).json({
        success: true,
        data: order
    });

})
const removeOrder = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = Number(req.user?.userId);

    const orderId = Number(req.params.id)

    const isRemoved = await orderService.removeOrder(orderId, userId);
    res.status(200).json({
        success: isRemoved,
    });

})


export { orderController, verifyTransaction, orderStatus, getUserOrders, updateOrderStatus, removeOrder }