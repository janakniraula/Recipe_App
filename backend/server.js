import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { authRoutes } from "./routes/authRoutes.js";
import { recipesRouter } from "./routes/recipes.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());


app.use("/auth", authRoutes);
app.use("/recipes", recipesRouter);

// Connect to Database
connectDB();

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
