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
import { validate } from '../middleware/Validation';
import { Review } from '../validators/order.schema';

const router = express.Router();

router.get('/categories', handleCategory);
router.get('/categories/:slug', handleCategoryProducts);

router.get('/products/featured', handleFeaturedProducts);
router.get('/products/new-arrivals', handleNewArrivalsProducts);

router.get('/products', handleAllProducts);
router.get('/products/search' , handleSearch)
router.get('/products/:slug', handleProductDetail);  
router.get('/products/:slug/related', handleRelated);

router.get('/products/:productId/reviews', handleGetReviews);
router.post('/products/:productId/reviews', isAuth, validate(Review), handleAddReview);


export { router as productRouter };