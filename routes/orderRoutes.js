import express from "express";
import {placeorder,orderHistory, allOrders, updateOrderStatus, createPaymentOrder} from "../controllers/ordercontroller.js"
import { protect } from "../middlewares/authmiddleware.js";
import { admin } from "../middlewares/adminmiddleware.js";
import { verifyPayment } from "../middlewares/paymentmiddleware.js";
import { asyncHandler } from "../utils/asynchandler.js";
import { validate } from "../middlewares/validate.js";
import { placeOrderSchema } from "../validator/ordervalidator.js";

const router = express.Router();

router.post("/placeorder",protect,asyncHandler(placeorder)); //add verifyPayment before placeorder;
router.get("/history",protect,asyncHandler(orderHistory));
router.get("/allorders",protect,admin,asyncHandler(allOrders));
router.post("/statusupdate",protect,admin,asyncHandler(updateOrderStatus));
router.post("/payment",protect,validate(placeOrderSchema),asyncHandler(createPaymentOrder));

export default router;

