import express from "express";
import {registerUser,loginUser,logoutUser} from "../controllers/authcontroller.js";
import { protect } from "../middlewares/authmiddleware.js";
import { asyncHandler } from "../utils/asynchandler.js";
import { validate } from "../middlewares/validate.js";
import { loginSchema, registerSchema } from "../validator/authvalidator.js";

const router = express.Router();

router.post("/register",validate(registerSchema),asyncHandler(registerUser));
router.post("/login",validate(loginSchema),asyncHandler(loginUser));
router.post("/logout",asyncHandler(logoutUser));

export default router;