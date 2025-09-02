import express from "express";
import {
    handleAdd,handleGet  , handleDelete, handleClear , handleMerge
} from '../controllers/cartController'
import { isAuth } from "../middleware/isAuth";

const router = express.Router();

router.post('/cart' ,isAuth , handleAdd);
router.get('/cart' ,isAuth , handleGet)
router.delete('/cart/:productId' ,isAuth, handleDelete);
router.delete('/cart' ,isAuth ,handleClear);
router.post('/cart/merge' ,isAuth ,handleMerge)

export {router as cartRouter}