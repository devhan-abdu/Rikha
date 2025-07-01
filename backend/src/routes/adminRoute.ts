import express from 'express';
import { isAdmin, isAuth } from '../middleware/isAuth';
import {handleGetAllProduct ,handleGetProduct ,handleDeleteProduct ,handleUpdateProduct,handleAddProduct } from '../controllers/adminController'
const router = express.Router();

// admin product management routes
router.post('/products' , isAuth , isAdmin ,handleAddProduct);
router.patch('/products/:sanityId' , isAuth , isAdmin ,handleUpdateProduct);
router.get('/products/:sanityId' , isAuth , isAdmin ,handleGetProduct);
router.delete('/product/:sanityId' , isAuth ,isAdmin ,handleDeleteProduct)

router.get('/allproduct' ,isAuth , isAdmin ,handleGetAllProduct)

