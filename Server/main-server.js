import express from 'express';
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/database.js";
import {clerkMiddleware} from '@clerk/express'
import clerkWebhooks from "./controllers/clerkWebhooks.js";
import userRouter from "./routes/Userroutes.js";
import hotelRouter from "./routes/Hotelroutes.js";
import connectCloudinary from "./configs/cloudinary.js";
import roomRouter from "./routes/Roomroutes.js";
import bookingRouter from "./routes/Bookingroutes.js";

connectDB()
connectCloudinary()

const app = express()
app.use(cors());

app.use(express.json());
app.use(clerkMiddleware())

const PORT = process.env.PORT || 3000;

app.use('/api/clerk', clerkWebhooks);
app.get('/', (request, response) => response.send('Hello World: By George Josiah'))
app.use('/api/user', userRouter)
app.use('/api/hotels', hotelRouter)
app.use('/api/rooms', roomRouter)
app.use('/api/bookings', bookingRouter)

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
