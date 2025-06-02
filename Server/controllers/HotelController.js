import Hotel from "../models/Hotel.js";
import User from "../models/User.js";

export const registerHotel = async (request, response) => {
    try {
        const {name, address, contact, city} = request.body;
        const owner = request.user.id;
        const hotel = await Hotel.findOne({owner})

        if (hotel) {
            return response.json({success: false, message: 'Hotel already exists'})
        }

        await Hotel.create({
            name, address, contact, city, owner
        });

        await User.findByIdAndUpdate(owner, {role: "hotelOwner"})
        response.json({success: true, message: 'Hotel registered successfully'})
    } catch (e) {
        response.json({success: false, message: e.message})
    }
}