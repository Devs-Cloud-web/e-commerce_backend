import express from "express";
import {getproducts , addproduct} from "../controllers/productcontroller.js"
import { protect } from "../middlewares/authmiddleware.js";
import { admin } from "../middlewares/adminmiddleware.js";
import { asyncHandler } from "../utils/asynchandler.js";
import { validate } from "../middlewares/validate.js";
import { addproductSchema } from "../validator/productvalidator.js";

const router = express.Router();

router.get("/info",validate(addproductSchema),asyncHandler(getproducts));
router.post("/add",protect,admin,asyncHandler(addproduct));

export default router;