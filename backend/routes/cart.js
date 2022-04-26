import express from "express";

const router = express.Router();

//middlewares
import {validateToken} from "../middlewares/auth";

// controllers
import {addToCart, fetchCart , deleteFromCart} from "../controllers/cart";

router.post("/add-to-cart", validateToken, addToCart);
router.get("/fetch-cart", validateToken, fetchCart);
router.delete("/delete-from-cart", validateToken , deleteFromCart);

module.exports = router;
