import Product from "../models/product.js";

// const products = []; -------------> temp storage


// api/product/get

export const getproducts = async(req,res)=>{
    const products = await Product.find();
    res.json(products);
};

export const addproduct = async (req,res)=>{
    
    const {name,price,stock} = req.body;
    // const product = {
    //     id : products.length + 1,
    //     name,
    //     price
    // }
    const existingproduct = await Product.findOne({
        name:name
    });

    if(existingproduct){
        existingproduct.stock += stock;
        await existingproduct.save();
        res.json({message:"Product added to DB succesfully",existingproduct})
    }
    else{
        const product = new Product({
        name,price,stock
        })
        await product.save();  // adds to database
        res.json({message:"Product added to DB succesfully",product})
    }
} 

export const updateprice = async(req,res)=>{

    const {productId,price} = req.body;

    const product = await Product.findById(productId);

    if(!product){
        return res.status(404).json({message:"Item not found!"});
    }

    product.price = price;
    await product.save();
    
    return res.status(200).json({message:`${product.name} price updated`});
}

export const deleteproduct = async(req,res) =>{

    const {productId} = req.body;

    const product = await Product.findById(productId);

    
}
