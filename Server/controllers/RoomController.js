import hotel from "../models/Hotel.js";
import Hotel from "../models/Hotel.js";
import {v2 as cloudinary} from 'cloudinary';
import Room from "../models/Room.js";

export const createRoom = async (request, response) => {
    try {
        const {roomType, pricePerNight, amenities} = request.body;
        const hotel = await Hotel.findOne({owner: request.auth.userId})

        if (!hotel) {
            return response.json({success: false, message: 'Hotel not found'})
        }

        const uploadImages = request.files.map(async (file) => {
            const res = await cloudinary.uploader.upload(file.path)
            return res.secure_url;
        })
        const images = await Promise.all(uploadImages)

        await Room.create({
            roomType, pricePerNight: +pricePerNight, amenities: JSON.parse(amenities), images, hotel: hotel._id,
        })

        response.json({success: true, message: 'Room created successfully'})

    } catch (e) {
        response.json({success: false, message: e.message})
    }
}

export const getAllRooms = async (request, response) => {
    try {
        const rooms = await Room.find({isAvailable: true}).populate({
            path: 'hotel',
            populate: {
                path: 'owner',
                select: 'image'
            }
        }).sort({createdAt: -1})
        response.json({success: true, rooms})

    } catch (e) {
        response.json({success: false, message: e.message})
    }
}


export const getOwnerRooms = async (request, response) => {
    try {
        const hotelData = await Hotel.findOne({
            owner: request.auth.userId,
        })
        const rooms = await Room.find({
            hotel: hotelData._id.toString(),
        }).populate("hotel")

        response.json({success: true, rooms})

    } catch (e) {
        response.json({success: false, message: e.message})
    }
}

export const toggleRoomAvailability = async (request, response) => {
    try {
        const {roomId} = request.body;
        const roomData = await Room.findById(roomId)
        roomData.isAvailable = !roomData.isAvailable
        await roomData.save()
        response.json({success: true, message: 'Room availability updated successfully'})

    } catch (e) {
        response.json({success: false, message: e.message})
    }
}