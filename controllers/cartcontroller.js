import Cart from "../models/cart.js";
import User from "../models/user.js"
import Product from "../models/product.js";

export const addtocart = async(req,res)=>{

    const {productId, quantity} = req.body;

    const existingcart = await Cart.findOne({user:req.user._id});
    const product = await Product.findById(productId);

    let cart = existingcart;
    if(!existingcart){
        cart = await Cart.create({
            user:req.user._id,
            items:[]
        });
    }

    if(product.stock<quantity){
            return res.status(404).json({message:`${product.name} Out of stock , Product ID->${productId}`});
    }
    // console.log("ClearP1");
    const index = cart.items.findIndex(item => item.product==productId);
    // console.log("ClearP2");
    if(index>-1){
        cart.items[index].quantity+=quantity;
    }
    else{
        cart.items.push({product:productId,quantity});
    }
    // console.log("ClearP3");
    await cart.save();

    res.status(201).json({message:"Added to cart",cart});
}

export const getcart = async(req,res)=>{

    const cart = await Cart.findOne({user:req.user._id}).populate("items.product","name price");
    
    if(!cart){
        return res.json({message:"Cart is empty"});
    }

    return res.json(cart);
}

export const deletefromcart = async(req,res)=>{

    const {productId} = req.body;

    const cart = await Cart.findOne({user:req.user._id});

    if(!cart){
        return res.json({message:"Cart is empty"});
    }

    let found = false;
    let newitems = [];
    for(let it of cart.items){
        if(it.product._id==productId){
            found=true;
            continue;
        }
        newitems.push(it);
    }
    if(!found){
         res.status(200).json({message:"Item not found"});
    }

    cart.items = newitems;

    await cart.save();

    res.status(200).json({message:"Cart updated",cart});
}

export const clearcart = async(req,res)=>{

    const cart = await Cart.findOne({user:req.user._id});

     if(!cart){
        return res.json({message:"Cart is empty"});
    }

    cart.items = [];
    await cart.save();

    res.status(200).json({message:"Cart is empty",cart});
}

export const updatecartitem = async(req,res)=>{

    const {productid,quantity} = req.body;

    const cart = await Cart.findOne({user:req.user._id});
    
    if(!cart || cart.length===0){
        return res.status(404).json({message:"Cart is empty"});
    }

    for(let it of cart.items){
        
        if(it.product===productid){

            if(quantity<it.product.stock){
                return res.status(404).json({message:`${it.product.name} Out of stock , 
                                             Product ID->${productid}`});
            }

            it.quantity = quantity;

            await cart.save();
            return res.status(200).json({message:"Cart item updated successfully"});
        }
    }

    return res.status(400).json({message:"Item not found in cart"});

}