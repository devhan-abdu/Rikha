
import { NextFunction, Response, Request } from "express";
import * as cartService from '../services/cartServices'
import { catchAsync } from "../utils/catchAsync";



const handleAdd = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const userId = Number(req.user?.userId);
    const { cartItems } = req.body;

    if (!cartItems) {
        return res.status(400).json({ success: false, message: "at least one item needed" })
    }

    const result = await cartService.addToCart(userId, cartItems)
    res.status(200).json({ success: true, data: result });

})
const handleGet = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = Number(req.user?.userId);

    const cartItems = await cartService.getCart(userId)
    res.status(200).json({ success: true, data: cartItems });

})



const handleMerge = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const userId = Number(req.user?.userId);
    const { cartItems } = req.body
    if (!cartItems) {
        return res.status(400).json({ success: false, message: "at least one item needed" })
    }
    const result = await cartService.mergeCart(userId, cartItems)
    res.status(200).json({ success: true, data: result })

})

export { handleAdd, handleGet, handleMerge }

