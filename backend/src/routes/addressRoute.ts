import express from "express";
import { isAuth } from "../middleware/isAuth";
import { getAll, getDefault, create, update, setDefault, deleteAddress } from "../controllers/addressController"


const router = express.Router();

router.post('/address', isAuth, create);
router.get('/address', isAuth, getAll)
router.get('/address/default', isAuth, getDefault)
router.patch('/address/:id/default', isAuth, setDefault)
router.put('/address/:id', isAuth, update)
router.delete('/address/:id', isAuth, deleteAddress)


export { router as orderRouter }