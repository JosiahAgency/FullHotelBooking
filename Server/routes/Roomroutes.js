import express from "express";
import {protect} from "../middleware/authMiddleware.js";
import {createRoom, getAllRooms, getOwnerRooms, toggleRoomAvailability} from "../controllers/RoomController.js";
import upload from "../middleware/uploaodMiddleware.js";

const roomRouter = express.Router();

roomRouter.post('/', upload.array("images", 4), protect, createRoom)
roomRouter.get('/owner', protect, getOwnerRooms)
roomRouter.get('/', getAllRooms)
roomRouter.post('/toggle-availability', protect, toggleRoomAvailability)

export default roomRouter

