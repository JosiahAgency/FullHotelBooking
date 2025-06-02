import express from "express";
import {protect} from "../middleware/authMiddleware.js";
import {getUserData, storeUserSearchedCities} from "../controllers/UserController.js";

const userRouter = express.Router();

userRouter.get('/', protect, getUserData);
userRouter.post('/store-recent-search', protect, storeUserSearchedCities);

export default userRouter;