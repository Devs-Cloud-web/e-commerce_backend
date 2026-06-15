import express from "express";
import {getcart,addtocart,deletefromcart, clearcart, updatecartitem} from "../controllers/cartcontroller.js"
import { protect } from "../middlewares/authmiddleware.js";
import { asyncHandler } from "../utils/asynchandler.js";
import { validate } from "../middlewares/validate.js";
import { addToCartSchema, deleteFromCartSchema, updateCartSchema } from "../validator/cartvalidator.js";

const router = express.Router();

router.get("/cartinfo",protect,asyncHandler(getcart));
router.post("/add",protect,validate(addToCartSchema),asyncHandler(addtocart));
router.post("/update",protect,validate(updateCartSchema),asyncHandler(updatecartitem))
router.post("/delete",protect,validate(deleteFromCartSchema),asyncHandler(deletefromcart));
router.post("/clear",protect,asyncHandler(clearcart));

export default router;