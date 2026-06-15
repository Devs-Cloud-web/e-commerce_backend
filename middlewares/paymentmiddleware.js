import crypto from "crypto";

export const verifyPayment = async(req,res,next) => {

    const {razorpay_order_id , razorpay_payment_id , razorpay_signature} = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expected_signature = crypto.createHmac("sha256",process.env.RAZORPAY)
                                .update(body).digest("hex");

    if(expected_signature == razorpay_signature){
        res.status(200).json({message:"Payment successful"});
        next();
    }
    else{
        res.status(400).json({message:"Payment failed"});
    }
}