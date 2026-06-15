import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const protect = async (req,res,next)=>{
    let token = req.cookies.jwt;
    if(!token){
        return res.status(404).json({message:"Not authorised, No Token"});
    }
    try{
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        req.user = await User.findById(decode.id).select("-password");
        if(req.user){
            next();
        }
        else{
            res.status(404).json({message:"User not found"});
        }
    }
    catch(error){
        res.status(500).json({message:"Server error ! Try again"});
    }
}