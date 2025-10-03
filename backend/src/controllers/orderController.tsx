import { catchAsync } from "../utils/catchAsync"
import { NextFunction, Response, Request } from "express"
import prisma from "../config/prisma";
import { randomBytes } from "crypto";
import { OrderStatus, PaymentStatus } from "@prisma/client"
import { OrderBodySchema, OrderItem } from "../types/type";
import z from "zod";
import * as orderService from "../services/orderService";


// steps needed 
// 1,  validation related to the data done in controller then the controller pass the correct value the service layer do  database related validation and then creat the order then (is call the payment intialize function (question is it controler or function) thne done the database logic and also 
// 2,   then creating the order 
// 3, payment integration the user get the url 
/////////// this all in one endpoint 

// 4, then call backa url
//1 we need to check if the payment is valid then
// 2, update the order and payment status
// then send the order confirmation page (here is it mandatory to have the return url or not )


// backend middleware 
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

export const verifyTransaction = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { tx_ref } = req.body;

    if (!tx_ref) {
        return res.status(400).json({ success: false, message: "Transaction reference is required." });
    }

    const { success, order } = await orderService.verifyPaymentAndHandleOrder(tx_ref);

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