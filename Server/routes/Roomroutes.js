import express from "express";
import uploaodMiddleware from "../middleware/uploaodMiddleware.js";
import {protect} from "../middleware/authMiddleware.js";
import {createRoom, getAllRooms, getOwnerRooms, toggleRoomAvailability} from "../controllers/RoomController.js";

const roomRouter = express.Router();

roomRouter.post('/', uploaodMiddleware.array("images", 4), protect, createRoom)
roomRouter.get('/owner', protect, getOwnerRooms)
roomRouter.get('/', getAllRooms)
roomRouter.post('/toggle-availability', protect, toggleRoomAvailability)

export default roomRouter

