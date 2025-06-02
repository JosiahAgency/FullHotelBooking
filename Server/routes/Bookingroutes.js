import express from "express";
import {protect} from "../middleware/authMiddleware.js";
import {
    checkAvailabilityApi,
    createBooking,
    getHotelBooking,
    getUserBooking
} from "../controllers/BookingController.js";

const bookingRouter = express.Router();

bookingRouter.post('/book', protect, createBooking);
bookingRouter.post('/check-availability', checkAvailabilityApi);
bookingRouter.get('/user', protect, getUserBooking);
bookingRouter.get('/hotel', protect, getHotelBooking);

export default bookingRouter;