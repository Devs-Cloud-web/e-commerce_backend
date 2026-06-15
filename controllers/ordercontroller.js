import mongoose from "mongoose";
import Cart from "../models/cart.js"
import Order from "../models/order.js";
import Product from "../models/product.js";
import User from "../models/user.js";
import razorpay from "../utils/razorpay.js";

export const placeorder = async(req,res) => {

    // sessions are used for replica datasets ..................

    // const session = await mongoose.startSession();
    // session.startTransaction(); // this is used to roll back failed transactions and maintain 
    //                             // the consistency in database

    try{
        const cart = await Cart.findOne({user:req.user._id}).populate("items.product")
                    //.session(session);

        if(!cart || cart.items.length==0){
            throw new Error("Cart is empty");
        }

        let total_price=0;
        let item = [];
        for(let it of cart.items){

            if(it.product.stock<it.quantity){
                throw new Error(`${it.product.name} Out of stock , Product ID->${it.product._id}`);
            }

            total_price+=it.product.price*it.quantity
            item.push({
                product:it.product,
                name:it.product.name,
                price:it.product.price,
                quantity:it.quantity
            });
            it.product.stock-=it.quantity;

            await it.product.save(); // when in session add {session} to save

        }

        const order = await Order.create({
            user:req.user._id,
            items:item,
            total_price
        });
        await order.save();

        cart.items=[]; 
        await cart.save();  // when in session add {session} to save
        
        // await session.commitTransaction()
        // session.endSession();
        return res.status(201).json({message:"Order placed Successfully",order});
    }
    catch(error){
        // await session.abortTransaction();
        // session.endSession();
        return res.status(201).json({message:error.message});
    }
}

export const orderHistory = async(req,res) => {

    const orders = await Order.find({user:req.user._id}).populate("items.product","name price")
                    .sort({createdAt:-1}); // to get newest orders first

    if(!orders){
        res.status(200).json({message:"No orders yet"});
    }

    res.status(200).json({message:"Order History",orders});

}

export const allOrders = async(req,res) => {

    const orders = await Order.find().populate("user","username email")
                    .sort({createdAt:-1}); // to get newest orders first

    if(!orders){
        res.status(200).json({message:"No orders yet"});
    }

    res.status(200).json({message:"All Orders",orders});

}

export const updateOrderStatus = async(req,res) => {

    const {status} = req.body;

    const order = await Order.findById(req.params.id);

    if(!order){
        res.status(404).json({message:"Order not found"});
    }

    order.status = status;
    await order.save();

    res.status(200).json({message:"Status updated successfully"});

}

export const createPaymentOrder = async(req,res) => {
    
    const {amount} = req.body;

    const options = {
        amount : 100*amount,
        currency:"INR"
    }

    const order = await razorpay.orders.create(options);

    res.status(200).json(order);
}


