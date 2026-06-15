import User from "../models/user.js"


export const admin = async(req,res,next)=>{
    const user = await User.findById(req.user._id);
    try{
        if(user.role==="admin"){
            next();
        }
        else{
            return res.status(404).json({message:"Access Denied ! Not an admin"});
        }
    }
    catch(error){
        res.status(500).json({message:`${error}`});
    }
}