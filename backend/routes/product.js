import express from "express";

const router = express.Router();

//middlewares
import {validateToken} from "../middlewares/auth";

// controllers
import {
    addProduct, deleteProduct, fetchAllProducts, fetchProductDetails, fetchSellerProducts , updateProduct
} from "../controllers/product";

router.post("/add-product", validateToken, addProduct);
router.get("/list-products", fetchAllProducts);
router.get("/fetch-product", fetchProductDetails);
router.get("/list-seller-products",validateToken, fetchSellerProducts);
router.delete("/delete-product",validateToken, deleteProduct);
router.put("/update-product",validateToken, updateProduct);

module.exports = router;
