import { NextFunction, Request, Response } from "express";
import { addReviews, getAllProducts, getCategory, getFeaturedProducts, getNewArrivalsProducts, getProductDetail, getProductsByCategory, getRelatedProducts, getReviews, getSearch } from "../services/productsServices";
import { catchAsync } from "../utils/catchAsync";


export interface AuthenticatedRequest extends Request {
    user?: any;
}


export const handleCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const categories = await getCategory()
    res.status(200).json({ success: true, data: categories });
})

export const handleCategoryProducts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { slug } = req.params;
    const products = await getProductsByCategory(slug);

    res.status(200).json({ success: true, data: products });

})

export const handleAllProducts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const products = await getAllProducts();

    res.status(200).json({ success: true, data: products });

})
export const handleProductDetail = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const product = await getProductDetail(req.params.slug);

    res.status(200).json({ success: true, data: product });

})
export const handleRelated = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { slug } = req.params;
    const relatedProducts = await getRelatedProducts(slug);
    res.status(200).json({ success: true, data: relatedProducts });

})
export const handleFeaturedProducts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const featuredProducts = await getFeaturedProducts();

    res.status(200).json({ success: true, data: featuredProducts });

})
export const handleNewArrivalsProducts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const newArrivalsProducts = await getNewArrivalsProducts();
    res.status(200).json({ success: true, data: newArrivalsProducts });

})

export const handleGetReviews = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.params;
    const reviews = await getReviews(productId);
    res.status(200).json({ success: true, data: reviews });

})
export const handleAddReview = catchAsync(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { productId } = req.params;
    const userId = req.user.userId;
    const { rating, comment } = req.body;
    const reviewData = { userId, productId, rating, comment };

    const newReview = await addReviews(reviewData);
    res.status(200).json({ success: true, data: newReview });

})

export const handleSearch = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const raw = req.query.query;
    const query = typeof raw === "string" ? raw.trim() : "";
    if (!query) {
        res.status(400).json({ success: false, message: 'empty query' })
        return;
    }
    const products = await getSearch(query)
    if (!products || products.length === 0) {
        return res.status(200).json({
            success: true,
            products: []
        });
    }

    res.status(200).json({ success: true, data: products })
})
