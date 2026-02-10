import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// GET /products - list all products
router.get("/", async (_req, res, next) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// GET /products/:id - get single product by ID
router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    next(err);
  }
});

// Optional: seed some sample products (for quick testing)
router.post("/seed", async (_req, res, next) => {
  try {
    const count = await Product.countDocuments();
    if (count > 0) {
      return res
        .status(400)
        .json({ message: "Products already exist, not seeding again." });
    }

    const sampleProducts = [
      {
        name: "Sample Phone",
        price: 499,
        description: "A powerful smartphone with great camera.",
        stockQuantity: 20,
        imageUrl:
          "https://via.placeholder.com/300x200.png?text=Sample+Phone",
      },
      {
        name: "Sample Laptop",
        price: 999,
        description: "Lightweight laptop for work and play.",
        stockQuantity: 10,
        imageUrl:
          "https://via.placeholder.com/300x200.png?text=Sample+Laptop",
      },
    ];

    const created = await Product.insertMany(sampleProducts);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
});

export default router;

