import express, { Application } from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/errorhandler";
import { cartRouter } from "./routes/cartRoute";
import { productRouter } from "./routes/productRoute";
import { userRouter } from "./routes/userRoute";
import { authRouter } from "./routes/authRoute";
import cors from 'cors'
import { orderRouter } from "./routes/orderRoute";
import { addressRouter } from "./routes/addressRoute";
import { AppError } from "./utils/AppError";

dotenv.config();
const app: Application = express()

const allowedOrigins = [
    process.env.FRONTEND_URL,
    process.env.DEPLOYED_FRONTEND_URL,
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new AppError("Not Allowed by CORS"))
        }
    },
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use('/api', authRouter)
app.use('/api', productRouter)

app.use('/api', userRouter)
app.use('/api', cartRouter)
app.use('/api', orderRouter)
app.use('/api', addressRouter)




app.use(errorHandler)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

