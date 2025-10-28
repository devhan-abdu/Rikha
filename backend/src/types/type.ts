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

export type CreateReviewInput = {
  userId: number
  productId: number | string
  rating: number
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
  addressId: z.number(),
  paymentMethod: z.enum(["CASH", "TELEBIRR", "MPSA", "CBEBIRR"]), 
})

export const AddressSchema = z.object({
  id:z.number().optional(),
  country: z.string().min(1, "Country is required"),
  name: z.string().min(1, "First name is required"),
  city: z.string().min(1, "city is required"),
  subcity: z.string().min(1, "Sub city is required"),
  woreda: z.string().min(1, "Woreda is required"),
  houseNumber: z.string().min(1, "House number/postal code is required"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits").regex(/^(09|07)\d{8}$/, "Invalid Ethiopian phone format"),
  isDefault: z.boolean().optional(),
});

export type OrderItem = z.infer<typeof OrderItemSchema>
export type OrderBody = z.infer<typeof OrderBodySchema>
export type ExtendedOrderBody = OrderBody & { userId: number };
export type AddressData = z.infer<typeof AddressSchema>;

