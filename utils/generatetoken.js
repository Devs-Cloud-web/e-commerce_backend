import jwt from "jsonwebtoken";

const generatetoken = (res,id)=>{
    const token = jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"7d"});
    res.cookie("jwt",token,{
        httpOnly:true
    });
}

export default generatetoken;