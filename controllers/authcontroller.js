import User from "../models/user.js";
import generatetoken from "../utils/generatetoken.js";
import bcrypt from "bcrypt";

export const registerUser = async(req,res)=>{

    const {username,email,password,role} = req.body;

    const existinguser = await User.findOne({email});
    if(existinguser){
        return res.status(404).json({message:"User already exists"});
    }

    const hashedpassword = await bcrypt.hash(password,10);
    const user = await new User({
        username : username,
        email : email,
        password : hashedpassword,
        role:role
    });

    await user.save();

    res.status(200).json({
        message:"User Added Successfully",
        user
    })
}

export const loginUser = async(req,res)=>{

    const {email,password} = req.body;

    const user = await User.findOne({email});

    if(user && await bcrypt.compare(password,user.password)){
        generatetoken(res,user._id);
        res.status(200).json({message:"Login Successful"});
    }
    else{
        res.status(404).json({message:"Invalid Credantials"});
    }

}

export const logoutUser = async(req,res)=>{

    res.cookie("jwt","",{
        httpOnly:true
    })
    res.status(200).json({message:"Logout succeccsully"});

}
