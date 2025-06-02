import User from "../models/User.js";

export const protect = async (request, response, next) => {
    const {userId} = request.auth;
    if (!userId) {
        response.json({success: false, message: 'Unauthorized'})
    } else {
        request.user = await User.findById(userId);
        next();
    }
}