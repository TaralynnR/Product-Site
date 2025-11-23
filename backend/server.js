import express from "express";
import dotenv from "dotenv";
import { connectDB } from './config/db.js';
import Product from "./models/product.js";
import Mongoose from "mongoose";
import productRoute from "./routes/product.route.js";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


const __dirname = path.resolve();

app.use(express.json()); //allows us to accept JSON data in the request body

app.use("/api/products", productRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/dist")));
  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
    connectDB();
  console.log("Server is running on port 3000");
});

