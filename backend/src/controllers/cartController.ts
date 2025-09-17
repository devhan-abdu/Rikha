
import { NextFunction , Response , Request } from "express";
import {addCart ,getCart ,deleteCart ,clearCart , merge} from '../services/cartServices'

export interface AuthenticatedRequest extends Request {
    user?: any;
}

export const handleAdd = async (req:AuthenticatedRequest ,res:Response , next:NextFunction) => {
    try {
       const {productId , quantity} = req.body;
       const userId = req.user;

       if(!productId || !quantity) {
            res.status(400).json({success:false , message: "sanityId and quantity are required"});
            return;
       }
      await  addCart(productId, quantity , userId)
      res.status(201).json({success:true ,message: "Product added to cart successfully" });

    } catch (error){
        next(error)
    }
}
export const handleGet = async (req:AuthenticatedRequest ,res:Response , next:NextFunction) => {
    try {
       const userId = req.user.userId;
      
     const cartItems = await getCart(userId)
      res.status(201).json({success:true ,message: "Product added to cart successfully" ,cartItems});

    } catch (error){
        next(error)
    }
}

export const handleDelete = async (req:AuthenticatedRequest ,res:Response , next:NextFunction) => {
    try {
        const productId = Number(req.params.productId);
        const userId = req.user.userId;

        if(!productId) {
            res.status(400).json({success:false , message:"sanityId required"})
            return;
        }
        await deleteCart(productId, userId)
        res.status(201).json({success:true , message:"cart item delted successfully"})
    } catch (error) {
        next(error)
    }
}
export const handleClear = async (req:AuthenticatedRequest ,res:Response , next:NextFunction) => {
    try {
         const userId =req.user.userId;
         await clearCart(userId);
         res.status(201).json({success:true , message:"cart cleared successfully"})
    } catch(error){
        next(error)
    }
}

export const handleMerge = async (req:AuthenticatedRequest ,res:Response , next:NextFunction) => {
   try {
     const userId = req.user.userId;
     const {cartItems} = req.body
     if(!cartItems) {
        res.status(400).json({success:false , message:"at least one item needed"})
     }
    const merged = await merge(userId , cartItems)
    res.status(200).json({success:true , message:"cart merged successfully" , cart:merged})
   } catch(error) {
    next(error)
   }
}

