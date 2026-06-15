import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    items:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product"
            },
            name:{
                type:String,
                required:true
            },
            price:{
                type:Number,
                required:true
            },
            quantity:{
                type:Number,
                required:true,
                default:1
            }
        }
    ],
    total_price:{
        type:Number,
        required:true,
        default:0
    },
    status:{
        type:String,
        required:true,
        default:"pending"
    }
},{
    timestamps:true
});

const Order = mongoose.model("Order",orderSchema);
export default Order;