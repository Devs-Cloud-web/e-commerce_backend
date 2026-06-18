import express from "express";
import {getproducts , addproduct, updateprice, deleteproduct} from "../controllers/productcontroller.js"
import { protect } from "../middlewares/authmiddleware.js";
import { admin } from "../middlewares/adminmiddleware.js";
import { asyncHandler } from "../utils/asynchandler.js";
import { validate } from "../middlewares/validate.js";
import { addproductSchema, deleteItemSchema, updatePriceSchema } from "../validator/productvalidator.js";

const router = express.Router();

router.get("/info",asyncHandler(getproducts));
router.post("/add",protect,admin,validate(addproductSchema),asyncHandler(addproduct));
router.put("/update",protect,admin,validate(updatePriceSchema),asyncHandler(updateprice));
router.post("/delete",protect,admin,validate(deleteItemSchema),asyncHandler(deleteproduct));

export default router;