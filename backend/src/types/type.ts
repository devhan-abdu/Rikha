import z from "zod";
export type SanityProduct = {
  _id: string;
  title: string;
  description: string;
  image: string;
  category: string;
};
export type sanityCategory = {
  _id: string,
  name: string,
  slug: { _type: 'slug', current: string },
  description?: string,
  image?: any;
}

export type review = {
  userId: number,
  productId: string,
  rating: number,
  comment: string
}
export type ShippingSchema = {
  country: string,
  firstName: string,
  lastName: string,
  subcity: string,
}

export const OrderItemSchema = z.object({
  productId: z.number(),
  quantity: z.number(),
});

export const OrderBodySchema = z.object({
  items: z.array(OrderItemSchema),
  shippingAddressData: z.object({
    country: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    subcity: z.string(),
    woreda: z.string(),
    houseNumber: z.string(),
    phoneNumber: z.string().regex(/^(09|07)\d{8}$/, "Invalid Ethiopian phone format"),
    isDefault: z.boolean().optional(),
  }),
  paymentMethod: z.enum(["CASH", "TELEBIRR", "MPSA", "CBEBIRR"]),
  
})



export type OrderItem = z.infer<typeof OrderItemSchema>
export type OrderBody = z.infer<typeof OrderBodySchema>
export type ExtendedOrderBody = OrderBody & { userId: number };

