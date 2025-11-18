<h1 style="color:red; font-size: 50px; font-family:sans-serif ;">Rikha</h1>


## Live
[here](https://rikha.store.app/)



## Screenshots



<table>
  <tr>
    <td style="vertical-align: top; padding: 10px;">
      <img src="https://github.com/user-attachments/assets/d63f578b-2a65-46ef-8bd1-d09bd1fe0514" width="100%">
    </td>
    <td style="vertical-align: top; padding: 10px;">
      <img src="https://github.com/user-attachments/assets/2b4bcdbc-0d7d-4648-b929-aaba9c06d3e2" width="100%">
    </td>
  </tr>
  <tr>
    <td style="vertical-align: top; padding: 10px;">
      <img src="https://github.com/user-attachments/assets/b52bdfb8-32e5-42c2-8a7d-1709f006ee1f" width="100%">
    </td>
    <td style="vertical-align: top; padding: 10px;">
      <img src="https://github.com/user-attachments/assets/d0cfdccb-7998-406c-9870-848cd29b146d" width="100%">
    </td>
  </tr>
  <tr>
    <td style="vertical-align: top; padding: 10px;">
      <img src="https://github.com/user-attachments/assets/bf5c5382-6609-4b9b-9bf4-3938201a8319" width="100%">
    </td>
    <td style="vertical-align: top; padding: 10px;">
      <img src="https://github.com/user-attachments/assets/28a09d45-d55d-48fd-a88e-0647e4a37fc0" width="100%">
    </td>
  </tr>
</table>




## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Setup and Installation](#setup-and-installation)
6. [Main Database Schema](#main-database-schema)
7. [Author](#author)
8. [License](#license)






## Introduction

Welcome to Rikha E-Commerce, your one-stop online store for a seamless shopping experience! Our platform is designed to make browsing, selecting, and purchasing products effortless, whether you’re at home or on the go.
With secure payment integration, real-time cart management, and a user-friendly interface, Rikha ensures that every transaction is smooth and reliable. Explore a wide range of products, add them to your cart, and checkout with confidence.
Whether you’re looking for the latest products or managing your order history, Rikha provides a fast, intuitive, and secure shopping experience tailored for modern users.





## Features


- **User Authentication:** Register, login, and logout securely.
- **Product Browsing:** Explore products with details and images.
- **Shopping Cart:** Add, remove, and update quantities.
- **Checkout & Payments:** Complete orders with integrated payment methods.
- **Order Management:** Track past orders and details.
- **Responsive Design:** Works on mobile, tablet, and desktop.
- **Stock Management:** Real-time stock availability shown.
- **User Profile:** Manage personal info and addresses.
 ## Technology Stack
- **Backend:** Express.js with TypeScript
- **Database:** PostgreSQL using Prisma ORM
- **Frontend:** Next.js + TypeScript + TailwindCSS + Shadcn UI
- **Validation:** Zod schemas
- **Authentication:** JWT / Cookie-based auth
- **API Integration:** Custom REST APIs for cart, user, and products
- **State Management:** Redux Toolkit with middleware for async operations
- **Deployment:** Vercel for frontend & backend
- **Others:** Nodemailer for emails, bcrypt for password hashing, Cloudinary for images





## Project Structure
   ```plaintext
.
├── README.md
├── backend
│ ├── dist
│ │ ├── app.js
│ │ ├── config
│ │ │ ├── cloudinary.js
│ │ │ └── prisma.js
│ │ ├── controllers
│ │ │ ├── addressController.js
│ │ │ ├── authControllers.js
│ │ │ ├── cartController.js
│ │ │ ├── orderController.js
│ │ │ ├── productsController.js
│ │ │ └── userController.js
│ │ ├── middleware
│ │ │ ├── Validation.js
│ │ │ ├── errorhandler.js
│ │ │ ├── isAuth.js
│ │ │ └── loginLimiter.js
│ │ ├── nodemailer
│ │ │ ├── email.js
│ │ │ ├── nodemailer.config.js
│ │ │ └── nodemailerTemplate.js
│ │ ├── routes
│ │ │ ├── addressRoute.js
│ │ │ ├── authRoute.js
│ │ │ ├── cartRoute.js
│ │ │ ├── orderRoute.js
│ │ │ ├── productRoute.js
│ │ │ └── userRoute.js
│ │ ├── services
│ │ │ ├── addressService.js
│ │ │ ├── authServices.js
│ │ │ ├── cartServices.js
│ │ │ ├── orderService.js
│ │ │ ├── productsServices.js
│ │ │ └── userServices.js
│ │ ├── utils
│ │ │ ├── AppError.js
│ │ │ ├── catchAsync.js
│ │ │ ├── checkAccount.js
│ │ │ ├── createTransaction.js
│ │ │ ├── generateToken.js
│ │ │ └── getCookieOptions.js
│ │ └── validators
│ │ ├── auth.schema.js
│ │ └── order.schema.js
│ ├── package-lock.json
│ ├── package.json
│ ├── prisma
│ │ ├── dev_backup.db
│ │ ├── migrations
│ │ │ ├── 20251108043704_initital
│ │ │ │ └── migration.sql
│ │ │ ├── 20251108175447_try
│ │ │ │ └── migration.sql
│ │ │ ├── 20251112062826_add_contact_message_model
│ │ │ │ └── migration.sql
│ │ │ ├── 20251112065629_add_phonen_number_field_in_contact_messgae
│ │ │ │ └── migration.sql
│ │ │ └── migration_lock.toml
│ │ └── schema.prisma
│ ├── project-tree.txt
│ ├── src
│ │ ├── app.ts
│ │ ├── config
│ │ │ ├── cloudinary.ts
│ │ │ └── prisma.ts
│ │ ├── controllers
│ │ │ ├── addressController.ts
│ │ │ ├── authControllers.ts
│ │ │ ├── cartController.ts
│ │ │ ├── orderController.ts
│ │ │ ├── productsController.ts
│ │ │ └── userController.ts
│ │ ├── middleware
│ │ │ ├── Validation.ts
│ │ │ ├── errorhandler.ts
│ │ │ ├── isAuth.ts
│ │ │ └── loginLimiter.ts
│ │ ├── nodemailer
│ │ │ ├── email.ts
│ │ │ ├── nodemailer.config.ts
│ │ │ └── nodemailerTemplate.ts
│ │ ├── routes
│ │ │ ├── addressRoute.ts
│ │ │ ├── authRoute.ts
│ │ │ ├── cartRoute.ts
│ │ │ ├── orderRoute.ts
│ │ │ ├── productRoute.ts
│ │ │ └── userRoute.ts
│ │ ├── services
│ │ │ ├── addressService.ts
│ │ │ ├── authServices.ts
│ │ │ ├── cartServices.ts
│ │ │ ├── orderService.ts
│ │ │ ├── productsServices.ts
│ │ │ └── userServices.ts
│ │ ├── type
│ │ │ └── express.d.ts
│ │ ├── utils
│ │ │ ├── AppError.ts
│ │ │ ├── catchAsync.ts
│ │ │ ├── checkAccount.ts
│ │ │ ├── createTransaction.ts
│ │ │ ├── generateToken.ts
│ │ │ └── getCookieOptions.ts
│ │ └── validators
│ │ ├── auth.schema.ts
│ │ └── order.schema.ts
│ └── tsconfig.json
├── frontend
│ ├── README.md
│ ├── app
│ │ ├── (main)
│ │ │ ├── (auth)
│ │ │ │ ├── forget-password
│ │ │ │ │ └── page.tsx
│ │ │ │ ├── login
│ │ │ │ │ ├── LoginContent.tsx
│ │ │ │ │ └── page.tsx
│ │ │ │ ├── register
│ │ │ │ │ └── page.tsx
│ │ │ │ ├── reset-password
│ │ │ │ │ ├── ResetPasswordForm .tsx
│ │ │ │ │ └── page.tsx
│ │ │ │ └── verify-email
│ │ │ │ └── page.tsx
│ │ │ ├── about
│ │ │ │ └── page.tsx
│ │ │ ├── account
│ │ │ │ ├── address
│ │ │ │ │ └── page.tsx
│ │ │ │ ├── layout.tsx
│ │ │ │ ├── orders
│ │ │ │ │ └── page.tsx
│ │ │ │ ├── password
│ │ │ │ │ └── page.tsx
│ │ │ │ └── profile
│ │ │ │ └── page.tsx
│ │ │ ├── cart
│ │ │ │ └── page.tsx
│ │ │ ├── category
│ │ │ │ ├── CategoryContent.tsx
│ │ │ │ ├── [slug]
│ │ │ │ │ ├── Review.tsx
│ │ │ │ │ └── page.tsx
│ │ │ │ ├── loading.tsx
│ │ │ │ └── page.tsx
│ │ │ ├── contact
│ │ │ │ └── page.tsx
│ │ │ ├── layout.tsx
│ │ │ ├── page.tsx
│ │ │ └── search
│ │ │ └── page.tsx
│ │ ├── (order)
│ │ │ ├── checkout
│ │ │ │ └── page.tsx
│ │ │ ├── layout.tsx
│ │ │ ├── order-failed
│ │ │ │ └── page.tsx
│ │ │ ├── order-status
│ │ │ │ ├── OrderStatusContent .tsx
│ │ │ │ ├── OrderStatusFallback .tsx
│ │ │ │ └── page.tsx
│ │ │ └── order-success
│ │ │ └── page.tsx
│ │ ├── api
│ │ ├── favicon.ico
│ │ ├── globals.css
│ │ └── layout.tsx
│ ├── components
│ │ ├── AccountDropdown.tsx
│ │ ├── AddToCartButton.tsx
│ │ ├── AddressCard.tsx
│ │ ├── AddressForm.tsx
│ │ ├── AddressList.tsx
│ │ ├── CartCard.tsx
│ │ ├── CategorySection.tsx
│ │ ├── Common.tsx
│ │ ├── Contact.tsx
│ │ ├── Empty.tsx
│ │ ├── ErrorMessage.tsx
│ │ ├── Footer.tsx
│ │ ├── Header.tsx
│ │ ├── MobileNav.tsx
│ │ ├── OrderCard.tsx
│ │ ├── OrderStatusCard.tsx
│ │ ├── OrderSummery.tsx
│ │ ├── ProductCard.tsx
│ │ ├── ProductWrapper.tsx
│ │ ├── Search.tsx
│ │ ├── SearchProductCard.tsx
│ │ ├── provider
│ │ │ ├── CartProvider.tsx
│ │ │ └── UserProvider.tsx
│ │ ├── sidenav.tsx
│ │ ├── skeletons.tsx
│ │ └── ui
│ │ ├── InputField.tsx
│ │ ├── OAuthButtons.tsx
│ │ ├── alert-dialog.tsx
│ │ ├── avatar.tsx
│ │ ├── button.tsx
│ │ ├── checkbox.tsx
│ │ ├── dialog.tsx
│ │ ├── dropdown-menu.tsx
│ │ ├── radio-group.tsx
│ │ ├── select.tsx
│ │ └── sheet.tsx
│ ├── components.json
│ ├── constants
│ │ └── index.ts
│ ├── eslint.config.mjs
│ ├── interface
│ │ └── index.ts
│ ├── lib
│ │ ├── api.ts
│ │ ├── auth
│ │ │ └── fetchme.ts
│ │ ├── fetchers.ts
│ │ ├── query
│ │ │ ├── ReactQueryProvider.tsx
│ │ │ ├── hook
│ │ │ │ └── useAddresses.ts
│ │ │ └── mutations
│ │ │ ├── useAddressMutations.ts
│ │ │ └── useOrderMutation.ts
│ │ ├── startOrderPolling.ts
│ │ └── utils.ts
│ ├── next-env.d.ts
│ ├── next.config.ts
│ ├── package-lock.json
│ ├── package.json
│ ├── postcss.config.mjs
│ ├── public
│ │ ├── file.svg
│ │ ├── globe.svg
│ │ ├── images
│ │ │ ├── Mpsa.png
│ │ │ ├── Telebirr.png
│ │ │ ├── about.avif
│ │ │ ├── about2.avif
│ │ │ ├── airpadCat.png
│ │ │ ├── cart.png
│ │ │ ├── category.jpg
│ │ │ ├── category.png
│ │ │ ├── cbebirr.jpg
│ │ │ ├── cbebirr.png
│ │ │ ├── empty.jpg
│ │ │ ├── headsetCat.png
│ │ │ ├── hero1.png
│ │ │ ├── hero2.png
│ │ │ ├── iPhoneCate.png
│ │ │ ├── ipadCate.png
│ │ │ ├── ipadCate2.png
│ │ │ ├── iphone2.png
│ │ │ ├── macCata.png
│ │ │ └── watchCata.png
│ │ ├── next.svg
│ │ ├── vercel.svg
│ │ └── window.svg
│ ├── redux
│ │ ├── hooks.ts
│ │ ├── middleware
│ │ │ └── cartMiddleware.ts
│ │ ├── selectors.ts
│ │ ├── slices
│ │ │ ├── authSlice.ts
│ │ │ ├── cartSlice.ts
│ │ │ └── selectedItemsSlice.ts
│ │ ├── store.ts
│ │ └── storeProvider.tsx
│ └── tsconfig.json
└── project-tree.txt
```





## Setup and installation


 1. Clone Repo
 ```bash
git clone https://github.com/devhan-abdu/Rikha
cd Rikha
```
 2. Backend
 ```bash
cd backend
npm install
# create .env with DATABASE_URL and other secrets
npx prisma generate
npx prisma migrate dev
npm run dev
```
Runs on: http://localhost:5000
 3. Frontend
 ```bash
cd frontend
npm install
# create .env if needed
npm run dev
```
Runs on: http://localhost:3000
 4. Access the application:
 ```bash
# Frontend (Next.js) - http://localhost:3000
# Backend (express) - http://localhost:5000
```





## API Endpoints


### Auth
- `POST /api/auth/register` – Register a new user
- `POST /api/auth/login` – Login
- `POST /api/auth/logout` – Logout
- `POST /api/auth/refresh` – Refresh token
- `POST /api/auth/forgot-password` – Request password reset
- `PUT /api/auth/reset-password/:token` – Reset password
- `POST /api/auth/verify-email` – Verify email
- `GET /api/auth/google` – Google OAuth redirect
- `GET /api/auth/github` – GitHub OAuth redirect
- `GET /api/auth/google/callback` – Google OAuth callback
- `GET /api/auth/github/callback` – GitHub OAuth callback
### User
- `GET /api/user/me` – Get current user profile
- `PATCH /api/user/me` – Update user profile
- `DELETE /api/user/me` – Delete user
- `PATCH /api/user/change-password` – Change password
- `POST /api/contact` – Send contact message
### Products & Categories
- `GET /api/products` – All products
- `GET /api/products/search` – Search products
- `GET /api/products/:slug` – Product detail
- `GET /api/products/:slug/related` – Related products
- `GET /api/products/featured` – Featured products
- `GET /api/products/new-arrivals` – New arrivals
- `GET /api/categories` – All categories
- `GET /api/categories/:slug` – Category products
- `GET /api/products/:productId/reviews` – Get product reviews
- `POST /api/products/:productId/reviews` – Add a review (auth required)
### Cart
- `POST /api/cart` – Add item to cart
- `GET /api/cart` – Get cart items
- `PATCH /api/cart/:productId` – Update quantity
- `DELETE /api/cart/:productId` – Remove item
- `DELETE /api/cart` – Clear cart
- `POST /api/cart/merge` – Merge local cart (auth required)
### Orders
- `POST /api/order` – Create order
- `GET /api/verify-payment/:id` – Verify transaction
- `GET /api/order-status` – Get order status
- `GET /api/my-orders` – Get user orders
- `PATCH /api/cancel/:id` – Cancel order
- `DELETE /api/remove/:id` – Remove order
### Address
- `POST /api/address` – Create address
- `GET /api/addresses` – Get all addresses
- `GET /api/address/default` – Get default address
- `PATCH /api/address/:id/default` – Set default address
- `PUT /api/address/:id` – Update address
- `DELETE /api/address/:id` – Delete address






## Main Database Schema


## User
- id: Int (primary key)
- username, firstName, lastName, phoneNumber: String
- email: String (unique)
- password: String (hashed)
- role: USER | ADMIN
- verified: Boolean
- createdAt, updatedAt: DateTime
## Product
- id: Int (primary key)
- title: String
- image: String
- price: Float
- discount: Float
- stock: Int
- slug: String (unique)
- categoryId: Int
- createdAt, updatedAt: DateTime
## Order
- id: Int (primary key)
- userId: Int
- tx_ref: String (unique)
- paymentMethod: CASH | TELEBIRR | MPSA | CBEBIRR
- paymentStatus: PENDING | COMPLETED | FAILED | REFUNDED
- orderStatus: PENDING_PAYMENT | PROCESSING | SHIPPED | DELIVERED | CANCELLED
- totalAmount: Float
- orderDate: DateTime
## CartItem
- id: Int (primary key)
- userId: Int
- productId: Int
- quantity: Int
## ContactMessage
- id: Int (primary key)
- name, email, phoneNumber, subject, message: String
- userId: Int? (optional)
- createdAt: DateTime




## Author

**Hanan Abdulshikur**
- [GitHub](https://github.com/devhan-hub)
- [LinkedIn](https://linkedin.com/in/hanan-abdulshikur)
---



## License
This project is licensed under the **MIT License**.
Copyright &copy; 2025 Hanan Abdulshikur.
