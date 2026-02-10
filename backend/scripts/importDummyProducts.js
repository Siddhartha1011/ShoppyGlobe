import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/shoppyglobe";

const DUMMY_URL = "https://dummyjson.com/products?limit=200";

async function importProducts() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGO_URI);
    console.log("Connected.");

    console.log(`Fetching products from ${DUMMY_URL}...`);
    const res = await fetch(DUMMY_URL);
    if (!res.ok) {
      throw new Error(`Failed to fetch dummy products: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();
    const products = Array.isArray(json.products) ? json.products : [];

    if (!products.length) {
      console.log("No products returned from dummyjson.");
      return;
    }

    console.log(`Fetched ${products.length} products. Transforming...`);

    const docs = products.map((p) => ({
      name: p.title || "Untitled",
      price: typeof p.price === "number" ? p.price : 0,
      description: p.description || "",
      stockQuantity: typeof p.stock === "number" ? p.stock : 0,
      imageUrl: p.thumbnail || "",
    }));

    console.log("Clearing existing products collection...");
    await Product.deleteMany({});

    console.log("Inserting products into MongoDB...");
    const result = await Product.insertMany(docs);

    console.log(`Inserted ${result.length} products successfully.`);
  } catch (err) {
    console.error("Error importing products:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  }
}

importProducts();

