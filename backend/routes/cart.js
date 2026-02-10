import express from "express";
import CartItem from "../models/CartItem.js";
import Product from "../models/Product.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Protect all cart routes
router.use(authMiddleware);

// GET /cart - get current user's cart items
router.get("/", async (req, res, next) => {
  try {
    const items = await CartItem.find({ user: req.user.id }).populate(
      "product"
    );

    const formatted = items.map((item) => ({
      id: item._id,
      productId: item.product._id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      stockQuantity: item.product.stockQuantity,
      imageUrl: item.product.imageUrl,
    }));

    res.json(formatted);
  } catch (err) {
    next(err);
  }
});

// POST /cart - add a product to the cart
router.post("/", async (req, res, next) => {
  try {
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "productId is required" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cartItem = await CartItem.findOne({
      user: req.user.id,
      product: productId,
    });

    if (cartItem) {
      cartItem.quantity += quantity;
      if (cartItem.quantity > product.stockQuantity) {
        return res
          .status(400)
          .json({ message: "Quantity exceeds available stock" });
      }
      await cartItem.save();
    } else {
      if (quantity > product.stockQuantity) {
        return res
          .status(400)
          .json({ message: "Quantity exceeds available stock" });
      }
      cartItem = await CartItem.create({
        user: req.user.id,
        product: productId,
        quantity,
      });
    }

    res.status(201).json(cartItem);
  } catch (err) {
    next(err);
  }
});

// PUT /cart/:id - update quantity of a product in the cart
router.put("/:id", async (req, res, next) => {
  try {
    const { quantity } = req.body;

    if (typeof quantity !== "number" || quantity < 1) {
      return res
        .status(400)
        .json({ message: "Quantity must be a positive number" });
    }

    const cartItem = await CartItem.findOne({
      _id: req.params.id,
      user: req.user.id,
    }).populate("product");

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    if (quantity > cartItem.product.stockQuantity) {
      return res
        .status(400)
        .json({ message: "Quantity exceeds available stock" });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    res.json(cartItem);
  } catch (err) {
    next(err);
  }
});

// DELETE /cart/:id - remove product from cart
router.delete("/:id", async (req, res, next) => {
  try {
    const cartItem = await CartItem.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.json({ message: "Cart item removed" });
  } catch (err) {
    next(err);
  }
});

export default router;

