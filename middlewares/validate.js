export const validate = (schema) => (req,res,next) => {
    
    const { error } = schema(req.body);

    if(error){
        res.status(400).json({
            message:error
        })
    }

    next();
}