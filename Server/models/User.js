import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    _id: {type: String, required: true},
    name: {type: String, required: true},
    email: {type: String, required: true},
    image: {type: String, required: true},
    role: {type: String, enum: ['admin', 'hotelOwner', 'customer'], default: "customer"},
    recentSearchedCities: [{type: String, required: true}],

}, {timestamps: true});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;