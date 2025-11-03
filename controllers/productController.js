import product from "../models/product.js";
import { isAdmin } from "./userController.js";

export async function createProduct(req,res){
    
    if(!isAdmin(req)){
        res.status(403).json(
            {
                message: "You are not authorized to create a product"
            }
        )
        return;
    }
    
    try{
        
        const productData = req.body;
        const newProduct = new product(productData)
        
        await newProduct.save()
        
        res.json(
            {
                message: "Product create Succesfully",
                product: product
            }
        )

    }catch(err){
        console.log(err);
        res.status(500).json({
            message: "Failed to create Product",
        });
    }
    
    
}

export async function getProduct(req,res){
    try{
        const products = await product.find();
        res.json(products);
    }catch(err){
        console.error(err);
        res.status(500).json({
            message: "Failed to retreive products",
        });
    }
}

// export async function deleteProduct(req,res){
//     try{
//         const productId     

//     }catch(err){

//     }
// }
