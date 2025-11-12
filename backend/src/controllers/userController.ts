import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import * as userServices from "../services/userServices";
import { changePasswordSchema, contactSchema, userUpdateSchema } from "../validators/auth.schema";


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
    const userId = Number(req.user?.userId);
    const parsedData = userUpdateSchema.parse(req.body)
    if (!parsedData) {
        return res.status(400).json({ success: false, message: "No data provided for update." });
    }
    const updatedUser = await userServices.updateUserProfile(userId, parsedData);

    res.status(200).json({
        success: true,
        data: updatedUser
    });
})

const changePassword = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
    const userId = Number(req.user?.userId)
    const parsed = changePasswordSchema.safeParse(req.body)

    if (!parsed.success) {
        return res.status(400).json({
            success: false,
            message: "Invalid request body. Please check your input."
        });
    }
    const { password, newPassword } = parsed.data
    await userServices.changePassword(userId, password, newPassword)

    res.status(200).json({
        success: true,
        message: "Password updated successfully"
    });

})

const deleteUser = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
    const userId = Number(req.user?.userId);
    await userServices.deleteUser(userId);
    res.status(200).json({
        success: true,
        message: "User deleted successfully"
    });
})
const sendContactMessage = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.userId ? Number(req.user.userId) : null;

    const result = contactSchema.safeParse(req.body)
    if (!result.success) {
        return res.status(400).json({
            success: false,
            message: "Invalid contact data"
        });

    }
    const contactMessage = await userServices.createContactMessage(userId, result.data);

    res.status(200).json({
        success: true,
        data: contactMessage
    });
})



export { getUser, updateUser, deleteUser, changePassword, sendContactMessage }