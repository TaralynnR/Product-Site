import Product from "../models/product.js";
import Mongoose from "mongoose";

export const getAllProducts = async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success:true, data: products });
    }catch(error) {
        res.status(500).json({ success:false, message:"Server Error" });
    }
};

export const createProduct = async(req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({ success:false, message:"Please provide all the required fields" });
  }
  const newProduct = new Product(product);
  try {
    await newProduct.save();
    res.status(201).json({ success:true, data:newProduct });
  }catch(error) {
    console.error("Error saving product to database: ", error.message);
    res.status(500).json({ success:false, message:"Server Error" });
  }
}

export const removeProduct = async(req, res) =>{
    const {id} = req.params;
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success:true, message:"Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ success:false, message:"Server Error" });
    }
}

export const updateProduct =  async(req, res) => {
    const {id} = req.params;
    const product = req.body;
    if (!Mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ success:false, message:"Invalid Product ID" });
    }
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product,{ new:true });
        res.status(200).json({ success:true, data:updatedProduct });
    } catch (error) {
        res.status(500).json({ success:false, message:"Server Error" });
    }
}