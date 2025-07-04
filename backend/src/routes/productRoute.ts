import express from 'express';
import {
  handleAllProducts,
  handleProductDetail,
  handleRelated,
  handleFeaturedProducts,
  handleNewArrivalsProducts,
  handleCategory,
  handleCategoryProducts,
  handleAddReview,
  handleGetReviews
} from '../controllers/productsController';

import { isAuth } from '../middleware/isAuth';
import { validateReview } from '../middleware/validateReview';

const router = express.Router();

//  Collection Pages
router.get('/categories', handleCategory);
router.get('/categories/:slug/products', handleCategoryProducts);

//  Product Info
router.get('/products', handleAllProducts);
router.get('/products/:slug', handleProductDetail);  
router.get('/products/:slug/related', handleRelated);

//  Homepage Highlights
router.get('/products/featured', handleFeaturedProducts);
router.get('/products/new-arrivals', handleNewArrivalsProducts);

//  Reviews
router.get('/products/:productId/reviews', handleGetReviews);
router.post('/products/:productId/reviews', isAuth, validateReview, handleAddReview);


export { router as productRouter };