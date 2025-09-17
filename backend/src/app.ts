import express , { Application, Request, Response, NextFunction } from "express";
import  dotenv from "dotenv"
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/errorhandler";
import { cartRouter } from "./routes/cartRoute";
import { productRouter } from "./routes/productRoute";
import { userRouter } from "./routes/userRoute";
import cors from 'cors'



dotenv.config();
const app:Application =express() 

app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}))


// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// Routes
app.use('/api',userRouter)
app.use('/api' ,cartRouter)
app.use('/api' , productRouter)


// Error handling middleware
app.use(errorHandler)

// start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

