import Booking from "../models/Bookings.js";
import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import transporter from "../configs/nodemailer.js";

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

        const isAvailable = checkAvailability({
            checkInDate, checkOutDate, room
        });

        if (!isAvailable) return response.json({success: false, message: `${isAvailable} Room is not available`})

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

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: request.user.email,
            subject: "Hotel Booking Details",
            // text: "Hello world?",
            html: `<h2>Your Booking Details</h2>
                    <p>Dear ${request.user.name},</p>
                    <p>Thank you for your booking! Here are your booking details:</p>
                    <ul>
                    <li><strong>Booking ID:</strong> ${booking._id}</li>
                    <li><strong>Hotel Name:</strong> ${roomData.hotel.name}</li>
                    <li><strong>Location:</strong> ${booking.hotel.address}</li>
                    <li><strong>Date:</strong> ${booking.checkInDate.toDateString()}</li>
                    <li><strong>Booking Amount:</strong>${process.env.CURRENCY} ${booking.totalPrice} /Night</li>
                    </ul>
                    <p>We look forward to your staying with us</p>
                    <p>If you need to make any changes, feel free to contact us.</p>`,
        }
        await transporter.sendMail(mailOptions)

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
