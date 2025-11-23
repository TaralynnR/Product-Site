import express from "express";
import Product from "../models/product.js";
import Mongoose from "mongoose";
import { createProduct, getAllProducts, removeProduct, updateProduct } from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getAllProducts);
router.post("/", createProduct);
router.delete("/:id", removeProduct);
router.put("/:id", updateProduct);

export default router;