import { catchAsync } from "../utils/catchAsync";
import { Response, Request } from "express"
import * as userAddress from '../services/addressService'
import { AddressSchema } from "../types/type";

export interface AuthenticatedRequest extends Request {
    user?: any;
}

const getAll = catchAsync(async (req: AuthenticatedRequest, res: Response,) => {
    const userId = req.user?.userId;
    const addresses = await userAddress.getAll(userId);

    return res.status(200).json(
        {
            success: true,
            addresses
        }
    )
})
const getDefault = catchAsync(async (req: AuthenticatedRequest, res: Response,) => {
    const userId = req.user?.userId;
    const address = await userAddress.getDefault(userId);

    return res.status(200).json(
        {
            success: true,
            address
        }
    )
})
const create = catchAsync(async (req: AuthenticatedRequest, res: Response,) => {
    const userId = req.user?.userId;
    const validationResult = AddressSchema.safeParse(req.body);
    if (!validationResult.success) {
        res.status(400).json({
            success: false,
            message: "bad request "
        })
        return
    }
    const address = await userAddress.create(userId, validationResult.data);

    return res.status(200).json(
        {
            success: true,
            address
        }
    )
})
const update = catchAsync(async (req: AuthenticatedRequest, res: Response,) => {
    const userId = req.user?.userId;
    const id = req.params.id;

    const validationResult = AddressSchema.safeParse(req.body);
    if (!validationResult.success) {
        res.status(400).json({
            success: false,
            message: "bad request "
        })
        return
    }
    const address = await userAddress.update(userId, Number(id), validationResult.data);

    return res.status(200).json(
        {
            success: true,
            address
        }
    )
})
const setDefault = catchAsync(async (req: AuthenticatedRequest, res: Response,) => {
    const userId = req.user?.userId;
    const id = req.params.id;

    if (!id) {
        res.status(404).json({
            success: false,
            message: "Id required"
        })
        return
    }
    const address = await userAddress.setDefault(userId, Number(id));

    return res.status(200).json(
        {
            success: true,
            address
        }
    )
})
const deleteAddress = catchAsync(async (req: AuthenticatedRequest, res: Response,) => {
    const userId = req.user?.userId;
    const id = req.params.id;

    if (!id) {
        res.status(404).json({
            success: false,
            message: "Id required"
        })
        return
    }
    const address = await userAddress.deleteAddress(userId, Number(id));

    return res.status(200).json(
        {
            success: true,
            address
        }
    )
})

export { getAll, getDefault, create, update, setDefault, deleteAddress }



