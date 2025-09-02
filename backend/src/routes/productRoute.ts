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
  handleGetReviews,
  handleSearch
} from '../controllers/productsController';

import { isAuth } from '../middleware/isAuth';
import { validateReview } from '../middleware/validateReview';

const router = express.Router();

//  Collection Pages
router.get('/categories', handleCategory);
router.get('/categories/:slug', handleCategoryProducts);



//  Homepage Highlights
router.get('/products/featured', handleFeaturedProducts);
router.get('/products/new-arrivals', handleNewArrivalsProducts);

//  Product Info
router.get('/products', handleAllProducts);
router.get('/products/search' , handleSearch)
router.get('/products/:slug', handleProductDetail);  
router.get('/products/:slug/related', handleRelated);

//  Reviews
router.get('/products/:productId/reviews', handleGetReviews);
router.post('/products/:productId/reviews', isAuth, validateReview, handleAddReview);


export { router as productRouter };