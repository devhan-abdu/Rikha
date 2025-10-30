import express from "express";
import { isAuth } from "../middleware/isAuth";
import { getAll, getDefault, create, update, setDefault, deleteAddress } from "../controllers/addressController"
import { validate } from "../middleware/Validation";
import { AddressSchema } from "../validators/order.schema";


const router = express.Router();

router.post('/address', isAuth, validate(AddressSchema), create);
router.get('/addresses', isAuth, getAll)
router.get('/address/default', isAuth, getDefault)
router.patch('/address/:id/default', isAuth, setDefault)
router.put('/address/:id', isAuth, validate(AddressSchema), update)
router.delete('/address/:id', isAuth, deleteAddress)


export { router as addressRouter }