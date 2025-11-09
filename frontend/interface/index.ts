import z from 'zod'
export interface Category {
  id: number;
  name: string;
  image: string;
  slug: string;
}

export interface NavItem {
  id: number;
  name: string;
  path: string;
}

export interface Product {
  id: number;
  slug: string;
  title: string;
  shortDesc: string;
  image: string;
  categoryId: number;
  price: number;
  stock: number;
  rating: number;
  numReviews: number;
  specs: string[];
  discount: number;
};

export interface Review {
  id: number;
  rating: number;
  comment: string;
  user: {
    username: string;
  };
};
export interface ProductDetail extends Product {
  longDesc: string;
  discount: number;
  reviews: Review[];
}

export interface Cart {
  image: string;
  title: string;
  desc: string;
  quantity: number;
  price: number;
  productId: number;
  discount: number;
  stock: number;
  slug: string
}

export interface UserDetails {
  id: number;
  username: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  avatarUrl?: string;
  role?: "USER" | "ADMIN";
  verified?: boolean;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export const ProfileSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  email: z
    .string().nonempty({ message: 'Email is required' })
    .email({ message: 'Please enter a valid email.' })
    .trim(),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits").regex(/^(09|07)\d{8}$/, "Invalid Ethiopian phone format"),

})



export const signUpSchema = z.object({
  name: z
    .string().nonempty({ message: 'Username is required' })
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .trim(),

  email: z
    .string().nonempty({ message: 'Email is required' })
    .email({ message: 'Please enter a valid email.' })
    .trim(),

  password: z
    .string({ message: 'Password is required' })
    .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Contain at least one special character.',
    })
    .trim(),

  confirmPassword: z
    .string({ message: 'Please confirm your password' })
}).refine(
  (data) => data.password === data.confirmPassword,
  {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  }
);


export const ChangePasswordSchema = z
  .object({
    password: z
      .string({ message: "Please enter your current password" })
      .min(1, { message: "Please enter your current password" }),

    newPassword: z
      .string({ message: "New password is required" })
      .min(8, { message: "Be at least 8 characters long" })
      .regex(/[a-zA-Z]/, { message: "Contain at least one letter" })
      .regex(/[0-9]/, { message: "Contain at least one number" })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Contain at least one special character",
      })
      .trim(),

    confirmNewPassword: z
      .string({ message: "Please confirm your new password" })
      .min(1, { message: "Please confirm your new password" }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  }).refine((data) => data.password !== data.newPassword,
    {
      message: "New password must be different from the current password",
      path: ["newPassword"],
    }
  )


export const verifyEmailSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be 6 digits")
    .regex(/^\d{6}$/, "OTP must contain only numbers"),
});

export const signInSchema = z.object({
  email: z
    .string().nonempty({ message: 'Email is required' })
    .email({ message: 'Please enter a valid email.' })
    .trim(),
  password: z
    .string().nonempty({ message: 'Password is required' })
    .trim(),
})

export const ForgetPasswordSchema = z.object({
  email: z
    .string().nonempty({ message: 'Email is required' })
    .email({ message: 'Please enter a valid email.' })
    .trim(),
})

export const ResetPasswordSchema = z.object({
  password: z
    .string({ message: 'Password is required' })
    .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Contain at least one special character.',
    })
    .trim(),
  confirmPassword: z
    .string({ message: 'Please confirm your password' })
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const ShippingSchema = z.object({
  id: z.number().optional(),
  country: z.string().min(1, "Country is required"),
  name: z.string().min(1, "First name is required"),
  city: z.string().min(1, "city is required"),
  subcity: z.string().min(1, "Sub city is required"),
  woreda: z.string().min(1, "Woreda is required"),
  houseNumber: z.string().min(1, "House number/postal code is required"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits").regex(/^(09|07)\d{8}$/, "Invalid Ethiopian phone format"),
  isDefault: z.boolean().optional(),
});

export const OrderItemSchema = z.object({
  productId: z.number(),
  quantity: z.number(),
});

export const OrderSchema = z.object({
  items: z.array(OrderItemSchema),
  addressId: z.number(),
  paymentMethod: z.enum(["TELEBIRR", "MPSA", "CBEBIRR"]),
})

export type OrderProduct = {
  title: string;
  image: string;
  price: number;
  shortDesc: string;
  quantity: number;
  id: number;
  stock: number;
  slug: string,
  discount: number,
}

export type OrderItem = {
  quantity: number;
  product: OrderProduct;
}

export type Order = {
  id: number;
  totalAmount: number;
  orderStatus: "PENDING_PAYMENT" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  paymentStatus: "PENDING" | "PAID" | "FAILED";
  orderDate: string;
  items: OrderItem[];
}

export type SignUpFormData = z.infer<typeof signUpSchema>;
export type VerifyEmailData = z.infer<typeof verifyEmailSchema>;
export type SignInFormData = z.infer<typeof signInSchema>;
export type ForgetPasswordData = z.infer<typeof ForgetPasswordSchema>;
export type ResetPasswordData = z.infer<typeof ResetPasswordSchema>;
export type ShippingData = z.infer<typeof ShippingSchema>;
export type OrderData = z.infer<typeof OrderSchema>;
export type ProfileData = z.infer<typeof ProfileSchema>;
export type ChangePasswordData = z.infer<typeof ChangePasswordSchema>;
