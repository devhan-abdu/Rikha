import express from "express";
import * as cartRoute from '../controllers/cartController'
import { isAuth } from "../middleware/isAuth";

const router = express.Router();

router.post('/cart' ,isAuth , cartRoute.handleAdd);
router.get('/cart' ,isAuth , cartRoute.handleGet)
router.post('/cart-merge' ,isAuth ,cartRoute.handleMerge)

export {router as cartRouter}