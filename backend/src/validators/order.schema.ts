import { z } from "zod";

export const CreateReviewSchema = z.object({
    userId: z.number(),
    productId: z.string(),
    rating: z.number(),
    comment: z.string(),
})

export const Review = z.object({
    rating: z.number().min(1).max(5),
    comment: z.string().min(3)
})

export const OrderItemSchema = z.object({
    productId: z.number(),
    quantity: z.number(),
});

export const OrderBodySchema = z.object({
    items: z.array(OrderItemSchema),
    addressId: z.number(),
    paymentMethod: z.enum(["CASH", "TELEBIRR", "MPSA", "CBEBIRR"]),
});

export const AddressSchema = z.object({
    id: z.number().optional(),
    country: z.string().min(1),
    name: z.string().min(1),
    city: z.string().min(1),
    subcity: z.string().min(1),
    woreda: z.string().min(1),
    houseNumber: z.string().min(1),
    phoneNumber: z.string().regex(/^(09|07)\d{8}$/),
    isDefault: z.boolean().optional(),
});

export const CartSchema = z.object({
    quantity: z.number(),
    productId: z.number()
})




export type OrderItem = z.infer<typeof OrderItemSchema>
export type OrderBody = z.infer<typeof OrderBodySchema>
export type CreateReviewInput = z.infer<typeof CreateReviewSchema>
export type ExtendedOrderBody = OrderBody & { userId: number };
export type AddressData = z.infer<typeof AddressSchema>;
export type CartData = z.infer<typeof CartSchema>;