import { NextFunction ,Request , Response } from "express";
import { addReviews, getAllProducts, getCategory, getFeaturedProducts, getNewArrivalsProducts, getProductDetail, getProductsByCategory, getRelatedProducts, getReviews } from "../services/productsServices";


export interface AuthenticatedRequest extends Request {
    user?: any;
}


export const handleCategory = async(req:Request, res:Response , next:NextFunction) => { 
    try {
        const categories = await getCategory()
        res.status(200).json({success:true , message:"categories fetched successfully", categories});
    } catch (error) {
        next(error);
    } 
}

export const handleCategoryProducts = async (req:Request, res:Response , next:NextFunction) => { 
    try{
       const {slug} = req.params;
       const products = await getProductsByCategory(slug);
        res.status(200).json({success:true , message:"category products fetched successfully", products});
    } catch (error){
        next(error);
    }
}

export const handleAllProducts = async (req:Request, res:Response , next:NextFunction) => {
    try {
        const  products = await getAllProducts();
        res.status(200).json({success:true , message:"all products fetched successfully", products});
    } catch (error) {
        next(error)
    }
}
export const handleProductDetail = async (req:Request, res:Response , next:NextFunction) => {
    try {
        const product = await getProductDetail(req.params.slug);
        res.status(200).json({success:true , message:"product detail fetched successfully", product});
    } catch (error) {
        next(error);
    }
}
export const handleRelated = async (req:Request, res:Response , next:NextFunction) => {
    try {
        const {slug} = req.params;
        const relatedProducts = await getRelatedProducts(slug);
        res.status(200).json({success:true , message:"related products fetched successfully", relatedProducts});
    } catch (error) {
        next(error);
    }
}
export const handleFeaturedProducts = async (req:Request, res:Response , next:NextFunction) => {
    try {
        const featuredProducts = await getFeaturedProducts();
        res.status(200).json({success:true , message:"featured products fetched successfully", featuredProducts});
    } catch (error) {
        next(error);
    }
}
export const handleNewArrivalsProducts = async (req:Request, res:Response , next:NextFunction) => {
    try {
        const newArrivalsProducts = await getNewArrivalsProducts();
        res.status(200).json({success:true , message:"new arrivals products fetched successfully", newArrivalsProducts});
    } catch (error) {
        next(error);
    }
}

export const handleGetReviews = async (req:Request, res:Response , next:NextFunction) => {
    try {
        const {productId} = req.params;
        const reviews = await getReviews(productId);
        res.status(200).json({success:true , message:"reviews fetched successfully", reviews});
    } catch (error) {
        next(error);
    }
}
export const handleAddReview = async (req:AuthenticatedRequest, res:Response , next:NextFunction) => {
    try {
        const {productId} = req.params;
        const userId = req.user.userId;
        const {rating , comment } = req.body; 
        const reviewData = { userId, productId, rating, comment };
        
        const newReview = await addReviews(reviewData);
        res.status(201).json({success:true , message:"review added successfully", newReview});
    } catch (error) {
        next(error);
    }
}
