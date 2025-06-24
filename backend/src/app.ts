import express , { Application, Request, Response, NextFunction } from "express";
import userRoute from "./routes/userRoute"
import  dotenv from "dotenv"
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/errorhandler";



dotenv.config();
const app:Application =express() 
console.log()

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// Routes
app.use('/api/user',userRoute)


// Error handling middleware
app.use(errorHandler)

// start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

