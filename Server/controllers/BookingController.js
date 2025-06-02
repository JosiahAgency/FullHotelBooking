import Booking from "../models/Bookings.js";
import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";

export const checkAvailability = async (checkInDate, checkOutDate, room) => {
    try {
        const bookings = await Booking.find({
            room,
            checkInDate: {$lte: checkOutDate},
            checkOutDate: {$gte: checkInDate}
        })
        if (bookings.length === 0) {
            return true;
        }
    } catch (e) {
        console.log(e.message)
    }
}

export const checkAvailabilityApi = async (request, response) => {
    try {
        const {room, checkInDate, checkOutDate} = request.body;
        const isAvailable = await checkAvailability(checkInDate, checkOutDate, room)
        response.json({success: true, isAvailable})
    } catch (e) {
        response.json({success: false, message: e.message})
    }
}

export const createBooking = async (request, response) => {
    try {
        const {room, checkInDate, checkOutDate, guests} = request.body;
        const user = request.user._id;

        const isAvailable = await checkAvailability({
            checkInDate, checkOutDate, room
        });

        if (!isAvailable) return response.json({success: false, message: 'Room is not available'})

        const roomData = await Room.findById(room).populate('hotel')
        let totalPrice = roomData.pricePerNight;

        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const diff = checkOut.getTime() - checkIn.getTime();
        const nights = Math.ceil(diff / (1000 * 3600 * 24));

        totalPrice *= nights;

        const booking = await Booking.create({
            room, checkInDate, checkOutDate, guests: +guests, totalPrice, user, hotel: roomData.hotel._id
        })

        response.json({success: true, message: 'Booking created successfully'})
    } catch (e) {
        response.json({success: false, message: e.message})
    }
}

export const getUserBooking = async (request, response) => {
    try {
        const user = request.user._id;
        const bookings = await Booking.find({user}).populate('room hotel').sort({createdAt: -1})

        response.json({success: true, bookings})
    } catch (e) {
        response.json({success: false, message: e.message})
    }
}

export const getHotelBooking = async (request, response) => {
    try {
        const hotel = await Hotel.findOne({
            owner: request.auth.userId
        })

        if (!hotel) return response.json({success: false, message: 'No Hotel found'})

        const bookings = await Booking.find({hotel: hotel._id}).populate('room hotel user').sort({createdAt: -1})
        const totalBookings = bookings.length;
        const totalRevenue = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0)

        response.json({
            success: true,
            dashboardData: {
                bookings, totalBookings, totalRevenue
            }
        })

    } catch (e) {
        response.json({success: false, message: e.message})
    }
}
