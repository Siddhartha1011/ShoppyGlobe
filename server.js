import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

import productsRouter from "./backend/routes/products.js";
import cartRouter from "./backend/routes/cart.js";
import authRouter from "./backend/routes/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/shoppyglobe";

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);
app.use("/api/auth", authRouter);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Global error handler
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error("Error:", err);
  const status = err.status || 500;
  res.status(status).json({
    message: err.message || "Internal server error",
  });
});

// Connect to MongoDB and start server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  });

