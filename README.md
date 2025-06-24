# Voltiva

## Full-Stack E-commerce Website Documentation (Voltiva)

# project name Voltiva 


 ## project overview

- **Objective**: Build a B2C e-commerce platform for selling electronics with core functionalities like inventory management, cart, reviews/ratings, checkout, and an admin panel.


  ## Learning Goals
  - Master backend development with authentication/authorization
  - Learn TypeScript for both frontend and backend
  - Implement Sanity for content management
  - Build a production-ready e-commerce application


  ## Tech Stack

- Frontend: Next.js, TypeScript, React  

-  Backend: Node.js, Express, TypeScript  

- Database: postgress 

- Content Management: Sanity.io  

- Authentication  Authorization: JWT (JSON Web Tokens)  

- Payment Processing:Dummy paying system 



 
- **Key Features**:
  - User authentication (signup, login, logout)
  - Admin authentication and authorization (manage products, orders, users)
  - Product catalog with Sanity CMS
  - Inventory management
  - Shopping cart
  - Reviews and ratings
  - Checkout process with payment integration (e.g., Stripe)
  - Admin dashboard for managing inventory, orders, and users



  <!--  this is based on Each functinality of the eccomerce   -->
## Requirements

### Functional Requirements

1. User Registration  Authentication

   • User can register and log in.

   • Admin can manage users.

   
2. Product Management

   • Admin can add, update, delete products.

   • Users can view products with details.

   
3. Inventory Management

   • Admin can manage inventory levels.

   
4. Shopping Cart

   • Users can add/remove products from the cart.

   • Users can view the cart.

   
5. Checkout Process

   • Users can enter shipping information.

   • Users can select payment method and complete purchase.

   
6. Reviews and Ratings

   • Users can leave reviews and ratings for products.

7. Admin Dashboard

   • Overview of sales, inventory, and user management

<!--  Based on the the user role  -->

## Requirements

### Functional Requirements

1. **User Features**:
   - Register and login with email/password (JWT-based)
   - Browse products by category, search, or filter
   - Add products to cart
   - View and update cart
   - Submit reviews and ratings for products
   - Complete checkout with payment (Stripe integration)
2. **Admin Features**:
   - Admin login with elevated permissions
   - Add, update, delete products in Sanity
   - Manage inventory (stock levels)
   - View and update order statuses
   - View user data (basic analytics)
3. **Content Management**:
   - Product data (name, description, price, images, stock) managed via Sanity
   - Categories and filters managed via Sanity
4. **Non-Functional Requirements**:
   - Secure authentication with JWT
   - Responsive UI with Tailwind CSS
   - Scalable backend with MongoDB
   - Type-safe code with TypeScript
   - Deployment-ready in one week


<!--  user flow based on each functinality of the website  -->
   ## User Flow

1. User Registration/Login:

   • User visits the site → clicks on "Register/Login" → enters credentials → receives confirmation.

2. Product Browsing:

   • User navigates to the product listing → filters/sorts products → views product details.

3. Cart Management:

   • User adds products to the cart → views cart → modifies quantities or removes items.

4. Checkout Process:

   • User clicks on "Checkout" → enters shipping info → selects payment method → confirms order.

5. Review Submission:

   • User views a product → submits a review/rating.

6. Admin Management:

   • Admin logs in → manages products, users, and reviews through the dashboard

<!-- based on role -->
## User Flow

1. **Customer Flow**:
   - Lands on homepage → Browses products → Filters/searches → Views product details
   - Adds to cart → Views cart → Updates quantities → Proceeds to checkout
   - Logs in/registers → Enters shipping details → Makes payment → Receives order confirmation
   - Optionally leaves a review/rating for purchased products
2. **Admin Flow**:
   - Logs in with admin credentials → Accesses admin dashboard
   - Manages products (add/edit/delete) via Sanity
   - Updates inventory stock levels
   - Views and updates order statuses
   - Monitors user activity (e.g., registered users, orders)

## Project Timeline (1 Week)

- **Total Duration**: 7 days (June 20, 2025 - June 26, 2025)
- **Daily Breakdown**:
  - **Day 1**: Backend setup (Express, MongoDB, TypeScript)
  - **Day 2**: Authentication/authorization (JWT, user/admin roles)
  - **Day 3**: Sanity setup and product management
  - **Day 4**: Frontend setup (Next.js, TypeScript, Tailwind CSS)
  - **Day 5**: Cart, checkout, and payment integration
  - **Day 6**: Reviews/ratings and admin dashboard
  - **Day 7**: Testing, bug fixes, and deployment

---
<!-- From chat gpt it is to implement align frontend and bakend so use it and check if it fill the flow and requirment from grock  -->

✅ Day-by-Day Breakdown (with Backend-First Focus)
🟩 Day 1: Project Setup + User Auth (JWT)
🎯 Goals:

    Backend: Initialize project with Express + TypeScript

    Frontend: Init Next.js + Tailwind CSS

    Setup MongoDB (Atlas)

    Implement user registration & login

    Generate JWT token on login

    Protect routes with authMiddleware

🛠 Backend Tasks:

    POST /auth/register

    POST /auth/login

    GET /auth/me

    Create User model with role: user | admin

🔁 User Flow Covered:

    ✅ Registration/Login

🟦 Day 2: Admin Auth + User Management
🎯 Goals:

    Create Admin role logic

    Admin can view all users

    Middleware to restrict access to admin routes

🛠 Backend Tasks:

    GET /users – Admin only

    PATCH /users/:id/role

    authMiddleware, adminMiddleware

🧠 User Roles:

    Store role in JWT payload

    Use in both backend middleware and frontend route guards

🔁 User Flow Covered:

    ✅ Admin login & user role logic

    ✅ User data management (admin)

🟨 Day 3: Product Management with Sanity CMS
🎯 Goals:

    Setup Sanity Studio

    Create schemas: Product, Category

    Seed dummy product data

    Fetch data from Sanity via frontend

    Admin manages product meta (stock, price) via backend

🛠 Backend Tasks:

    ProductMeta model in MongoDB (stock, price, reviews)

    GET /products (merged Sanity + Mongo)

    POST /products (admin: sanityId + stock + price)

🛠 Frontend Tasks:

    Product listing page

    Product detail page

🔁 User Flow Covered:

    ✅ Product browsing

    ✅ Admin adds/edits products

🟧 Day 4: Shopping Cart + Inventory
🎯 Goals:

    Users can add/remove products from cart

    Sync cart with stock levels

    Auto-update cart on frontend

🛠 Backend Tasks:

    GET /cart

    POST /cart (add item)

    PATCH /cart/:id (update qty)

    DELETE /cart/:id (remove item)

    Check stock before add/update

🛠 Frontend Tasks:

    Cart page

    Cart icon/badge

🔁 User Flow Covered:

    ✅ Cart management

    ✅ Real-time inventory sync

🟪 Day 5: Checkout Process + Orders
🎯 Goals:

    Create Order model

    Checkout form (shipping info + payment)

    Simulate payment method (e.g. Cash on Delivery or dummy Stripe)

    Store orders in DB

    Users can view their orders

🛠 Backend Tasks:

    POST /orders

    GET /orders (user)

    GET /orders/all (admin)

    PATCH /orders/:id/status (admin)

🛠 Frontend Tasks:

    Checkout form

    Order confirmation page

    User orders page

🔁 User Flow Covered:

    ✅ Checkout

    ✅ Order placement & confirmation

    ✅ Admin order management

🟥 Day 6: Reviews + Admin Dashboard
🎯 Goals:

    Users can leave reviews

    Reviews stored in MongoDB

    Admin sees sales, orders, low stock alerts

🛠 Backend Tasks:

    POST /reviews (user)

    GET /reviews/:productId

    GET /admin/metrics:

    {
      "totalUsers": 35,
      "totalOrders": 12,
      "totalRevenue": 18599,
      "lowStock": [...]
    }

🛠 Frontend Tasks:

    Review form under product page

    Admin dashboard components

🔁 User Flow Covered:

    ✅ Review submission

    ✅ Admin overview dashboard

🟫 Day 7: Final Touches + Deployment
🎯 Goals:

    Responsive styling (Tailwind)

    Error handling, loading states

    Protect frontend routes based on role

    Deploy:

        Backend → Render or Railway

        Frontend → Vercel

        Sanity → Hosted Studio

🛠 Final Tasks:

    Test all flows (register, cart, checkout)

    Add meta tags + favicon

    Push to GitHub

    Post Day 7 recap 🎉



<!-- Implementaion from grock -->
## Backend Development Guide (TypeScript, Express, MongoDB)

### Day 1: Backend Setup

**Deadline**: June 20, 2025 **Tasks**:

1. Initialize a Node.js project with TypeScript
2. Set up Express server
3. Connect to postgress(which also include learning )
4. Create basic folder structure
5, because i am good in this from authorization based on voltsore for typscript min 30% of auth

**Steps**:

- Initialize project:

  ```bash
  mkdir ecommerce-backend
  cd ecommerce-backend
  npm init -y
  npm install typescript ts-node @types/node @types/express express mongoose dotenv
  npx tsc --init
  ```
- Update `tsconfig.json`:

  ```json
  {
    "compilerOptions": {
      "target": "ES6",
      "module": "commonjs",
      "outDir": "./dist",
      "rootDir": "./src",
      "strict": true,
      "esModuleInterop": true
    }
  }
  ```
- Create folder structure:

  ```
  ecommerce-backend/
  ├── src/
  │   ├── controllers/
  │   ├── models/
  │   ├── routes/
  │   ├── middleware/
  │   └── index.ts
  ├── .env
  ├── package.json
  └── tsconfig.json
  ```
- Set up Express server (`src/index.ts`):

  ```typescript
  import express from 'express';
  import mongoose from 'mongoose';
  import dotenv from 'dotenv';
  
  dotenv.config();
  
  const app = express();
  app.use(express.json());
  
  mongoose.connect(process.env.MONGO_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));
  
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  ```
- Create `.env`:

  ```env
  MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/ecommerce?retryWrites=true&w=majority
  PORT=5000
  JWT_SECRET=your_jwt_secret
  ```
- Test the server:

  ```bash
  npm run dev
  ```

### Day 2: Authentication/Authorization

**Deadline**: June 21, 2025 **Tasks**:

1. Create user and admin models
2. Implement signup/login with JWT
3. Add role-based authorization (user/admin)
4, also protected route
5, build api for product  CRUD 30% 
6, and also implemt api for managing user by admin

**Steps**:

- Install dependencies:

  ```bash
  npm install bcryptjs jsonwebtoken @types/bcryptjs @types/jsonwebtoken
  ```
- Create user model (`src/models/User.ts`):

  ```typescript
  import mongoose, { Schema, Document } from 'mongoose';
  
  interface IUser extends Document {
    email: string;
    password: string;
    role: 'user' | 'admin';
  }
  
  const UserSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
  });
  
  export default mongoose.model<IUser>('User', UserSchema);
  ```
- Create auth controller (`src/controllers/authController.ts`):

  ```typescript
  import { Request, Response } from 'express';
  import bcrypt from 'bcryptjs';
  import jwt from 'jsonwebtoken';
  import User from '../models/User';
  
  export const signup = async (req: Request, res: Response) => {
    const { email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, role });
    await user.save();
    res.status(201).json({ message: 'User created' });
  };
  
  export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    res.json({ token });
  };
  ```
- Create auth middleware (`src/middleware/auth.ts`):

  ```typescript
  import { Request, Response, NextFunction } from 'express';
  import jwt from 'jsonwebtoken';
  
  interface AuthRequest extends Request {
    user?: { id: string; role: string };
  }
  
  export const auth = (roles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
      const token = req.header('Authorization')?.replace('Bearer ', '');
      if (!token) return res.status(401).json({ message: 'No token provided' });
  
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string; role: string };
        if (!roles.includes(decoded.role)) {
          return res.status(403).json({ message: 'Access denied' });
        }
        req.user = decoded;
        next();
      } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
      }
    };
  };
  ```
- Create auth routes (`src/routes/auth.ts`):

  ```typescript
  import { Router } from 'express';
  import { signup, login } from '../controllers/authController';
  
  const router = Router();
  
  router.post('/signup', signup);
  router.post('/login', login);
  
  export default router;
  ```
- Update `src/index.ts` to include routes:

  ```typescript
  import authRoutes from './routes/auth';
  
  app.use('/api/auth', authRoutes);
  ```

### Day 3: Sanity Setup and Product Management

**Deadline**: June 22, 2025 **Tasks**:

1. Set up Sanity for content management
2. Create product and category schemas
3. Build APIs for product CRUD operations

**Steps**:

- Install Sanity CLI:

  ```bash
  npm install -g @sanity/cli
  sanity init
  ```
- Create Sanity project and follow prompts to set up.
- Define product schema (`sanity/schemas/product.ts`):

  ```javascript
  export default {
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
      { name: 'name', title: 'Name', type: 'string' },
      { name: 'description', title: 'Description', type: 'text' },
      { name: 'price', title: 'Price', type: 'number' },
      { name: 'stock', title: 'Stock', type: 'number' },
      { name: 'image', title: 'Image', type: 'image' },
      { name: 'category', title: 'Category', type: 'reference', to: [{ type: 'category' }] },
    ],
  };
  ```
- Define category schema (`sanity/schemas/category.ts`):

  ```javascript
  export default {
    name: 'category',
    title: 'Category',
    type: 'document',
    fields: [
      { name: 'name', title: 'Name', type: 'string' },
    ],
  };
  ```
- Install Sanity client in backend:

  ```bash
  npm install @sanity/client
  ```
- Create product controller (`src/controllers/productController.ts`):

  ```typescript
  import { Request, Response } from 'express';
  import sanityClient from '@sanity/client';
  
  const client = sanityClient({
    projectId: 'your-project-id',
    dataset: 'production',
    token: process.env.SANITY_TOKEN,
    useCdn: false,
  });
  
  export const getProducts = async (req: Request, res: Response) => {
    const products = await client.fetch('*[_type == "product"]');
    res.json(products);
  };
  
  export const createProduct = async (req: Request, res: Response) => {
    const { name, description, price, stock, image, category } = req.body;
    const product = await client.create({
      _type: 'product',
      name,
      description,
      price,
      stock,
      image,
      category: { _type: 'reference', _ref: category },
    });
    res.status(201).json(product);
  };
  ```
- Create product routes (`src/routes/product.ts`):

  ```typescript
  import { Router } from 'express';
  import { getProducts, createProduct } from '../controllers/productController';
  import { auth } from '../middleware/auth';
  
  const router = Router();

  <!-- this include for both admin and also user  -->
  
  router.get('/', getProducts);
  router.post('/', auth(['admin']), createProduct);
  
  export default router;
  ```
- Update `src/index.ts`:

  ```typescript
  import productRoutes from './routes/product';
  app.use('/api/products', productRoutes);
  ```

---

## Frontend Development Guide (Next.js, TypeScript, Tailwind CSS)

### Day 4: Frontend Setup

**Deadline**: June 23, 2025 **Tasks**:

1. Set up Next.js with TypeScript
2. Install Tailwind CSS
3. Create basic UI components (header, footer, product card)
4, home page and also and product detail page 

**Steps**:

- Create Next.js project:

  ```bash
  npx create-next-app@latest ecommerce-frontend --typescript
  cd ecommerce-frontend
  ```
- Install Tailwind CSS:

  ```bash
  npm install -D tailwindcss postcss autoprefixer
  npx tailwindcss init -p
  ```
- Update `tailwind.config.js`:

  ```javascript
  module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: { extend: {} },
    plugins: [],
  };
  ```
- Update `styles/globals.css`:

  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```
- Create product card component (`components/ProductCard.tsx`):

  ```tsx
  import React from 'react';
  
  interface Product {
    _id: string;
    name: string;
    price: number;
    image: string;
  }
  
  const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    return (
      <div className="border p-4 rounded-lg">
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
        <h2 className="text-lg font-bold">{product.name}</h2>
        <p>${product.price}</p>
        <button className="bg-blue-500 text-white px-4 py-2 mt-2">Add to Cart</button>
      </div>
    );
  };
  
  export default ProductCard;
  ```
- Create homepage (`pages/index.tsx`):

  ```tsx
  import { useEffect, useState } from 'react';
  import ProductCard from '../components/ProductCard';
  
  interface Product {
    _id: string;
    name: string;
    price: number;
    image: string;
  }
  
  export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);
  
    useEffect(() => {
      fetch('http://localhost:5000/api/products')
        .then(res => res.json())
        .then(data => setProducts(data));
    }, []);
  
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Electronics Store</h1>
        <div className="grid grid-cols-3 gap-4">
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    );
  }
  ```

### Day 5: Cart, Checkout, and Payment

**Deadline**: June 24, 2025 **Tasks**:

1. Implement cart functionality
2. Create checkout page
3. Integrate Stripe for payments

**Steps**:

- Install Stripe:

  ```bash
  npm install @stripe/stripe-js @stripe/react-stripe-js
  ```
- Create cart context (`context/CartContext.tsx`):

  ```tsx
  import { createContext, useContext, useState } from 'react';
  
  interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }
  
  interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
  }
  
  const CartContext = createContext<CartContextType | undefined>(undefined);
  
  export const CartProvider: React.FC = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
  
    const addToCart = (item: CartItem) => {
      setCart(prev => [...prev, item]);
    };
  
    const removeFromCart = (id: string) => {
      setCart(prev => prev.filter(item => item.id !== id));
    };
  
    return (
      <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
        {children}
      </CartContext.Provider>
    );
  };
  
  export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within a CartProvider');
    return context;
  };
  ```
- Update `ProductCard.tsx` to use cart:

  ```tsx
  import { useCart } from '../context/CartContext';
  
  const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const { addToCart } = useCart();
  
    return (
      <div className="border p-4 rounded-lg">
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
        <h2 className="text-lg font-bold">{product.name}</h2>
        <p>${product.price}</p>
        <button
          className="bg-blue-500 text-white px-4 py-2 mt-2"
          onClick={() => addToCart({ id: product._id, name: product.name, price: product.price, quantity: 1 })}
        >
          Add to Cart
        </button>
      </div>
    );
  };
  ```
- Create checkout page (`pages/checkout.tsx`):

  ```tsx
  import { useCart } from '../context/CartContext';
  import { Elements } from '@stripe/react-stripe-js';
  import { loadStripe } from '@stripe/stripe-js';
  
  const stripePromise = loadStripe('your_stripe_publishable_key');
  
  export default function Checkout() {
    const { cart } = useCart();
  
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Checkout</h1>
        <Elements stripe={stripePromise}>
          {/* Add Stripe checkout form here */}
        </Elements>
      </div>
    );
  }
  ```

### Day 6: Reviews/Ratings and Admin Dashboard

**Deadline**: June 25, 2025 **Tasks**:

1. Implement reviews/ratings system
2. Create admin dashboard for product/inventory/order management

**Steps**:

- Create review model (`src/models/Review.ts`):

  ```typescript
  import mongoose, { Schema, Document } from 'mongoose';
  
  interface IReview extends Document {
    productId: string;
    userId: string;
    rating: number;
    comment: string;
  }
  
  const ReviewSchema: Schema = new Schema({
    productId: { type: String, required: true },
    userId: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
  });
  
  export default mongoose.model<IReview>('Review', ReviewSchema);
  ```
- Create review controller (`src/controllers/reviewController.ts`):

  ```typescript
  import { Request, Response } from 'express';
  import Review from '../models/Review';
  
  export const addReview = async (req: Request, res: Response) => {
    const { productId, rating, comment } = req.body;
    const userId = req.user?.id;
    const review = new Review({ productId, userId, rating, comment });
    await review.save();
    res.status(201).json(review);
  };
  ```
- Create admin dashboard (`pages/admin/index.tsx`):

  ```tsx
  import { useEffect, useState } from 'react';
  
  export default function AdminDashboard() {
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      fetch('http://localhost:5000/api/products', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
        .then(res => res.json())
        .then(data => setProducts(data));
    }, []);
  
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        {/* Add product management UI */}
      </div>
    );
  }
  ```

### Day 7: Testing and Deployment

**Deadline**: June 26, 2025 **Tasks**:

1. Test all functionalities (auth, cart, checkout, admin)
2. Deploy backend to Heroku/AWS
3. Deploy frontend to Vercel

**Steps**:

- Test locally:

  ```bash
  # Backend
  npm run dev
  # Frontend
  npm run dev
  ```
- Deploy backend to Heroku:

  ```bash
  heroku create
  heroku config:set MONGO_URI=<your_mongo_uri> JWT_SECRET=<your_jwt_secret>
  git push heroku main
  ```
- Deploy frontend to Vercel:

  ```bash
  vercu
  ```

## Additional Notes

- **Learning Focus**:
  - Authentication/authorization: Practice securing routes with JWT and role-based access.
  - TypeScript: Use interfaces and types consistently across frontend and backend.
  - Sanity: Leverage Sanity’s real-time capabilities for product management.
- **Scalability**:
  - Use MongoDB indexes for faster queries.
  - Optimize Sanity queries for performance.
- **Security**:
  - Validate all inputs to prevent injection attacks.
  - Store sensitive data (e.g., JWT_SECRET) in `.env`.
