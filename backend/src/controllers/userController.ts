import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import * as userServices from "../services/userServices";


export interface AuthenticatedRequest extends Request {
    user?: any;
}

const getUser = catchAsync(async (req: AuthenticatedRequest, res: Response) => { 
    const userId = req.user?.userId;
   const user = await userServices.getUserProfile(userId);

    res.status(200).json({
        success: true,
        data: user
    });
})

const updateUser = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.userId;
    const { name, email } = req.body
    if(!name && !email){ 
        return res.status(400).json({ success: false, message: "No data provided for update." });
    }
    const updatedUser = await userServices.updateUserProfile(userId, name, email);

    res.status(200).json({
        success: true,
        data: updatedUser
    });
})

const deleteUser = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.userId;
    await userServices.deleteUser( userId);
    res.status(200).json({
        success: true,
        message: "User deleted successfully"
    });
})

export { getUser, updateUser, deleteUser }