
import { NextFunction, Response, Request } from "express";
import * as cartServices from '../services/cartServices'
import { catchAsync } from "../utils/catchAsync";


const handleAdd = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const { productId, quantity } = req.body;
    const userId = Number(req.user?.userId);

    const cartItem = await cartServices.addCart(userId, productId, quantity)
    res.status(200).json({ success: true, data: cartItem });

})

const handleGet = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const userId = Number(req.user?.userId);
    const cartItems = await cartServices.getCart(userId)
    res.status(201).json({ success: true, data: cartItems });

})

const handleDelete = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const productId = Number(req.params.productId);
    const userId = Number(req.user?.userId);

    if (!productId) {
        res.status(400).json({ success: false, message: "ProductId required" })
        return;
    }
    const id = await cartServices.deleteCart(userId, productId)
    res.status(201).json({ success: true, data: id })

})
const handleUpdate = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const productId = Number(req.params.productId);
    const userId = Number(req.user?.userId);

    if (!productId) {
        res.status(400).json({ success: false, message: "ProductId required" })
        return;
    }
    const id = await cartServices.updateQuantity(userId, productId, req.body.quantity)
    res.status(200).json({ success: true, data: id })

})
const handleClear = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = Number(req.user?.userId);
    await cartServices.clearCart(userId);
    res.status(201).json({ success: true })

})


const handleMerge = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = Number(req.user?.userId);
    const { cartItems } = req.body
    if (!cartItems || cartItems.length === 0) {
        res.status(400).json({ success: false, message: "at least one item needed" })
        return
    }
    const merged = await cartServices.merge(userId, cartItems)
    res.status(200).json({ success: true, data: merged })

})


export { handleAdd, handleGet, handleUpdate, handleDelete, handleClear, handleMerge }

