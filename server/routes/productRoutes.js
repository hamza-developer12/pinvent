const express = require("express")
const router = express.Router();
const { createProduct, getAllProducts, getSingleProduct, deleteProduct, updateProduct } = require("../controllers/productController");
const { upload } = require("../utils/fileUpload");
const protectedRoute = require("../middlewares/authMiddleware");


router.post("/createproduct", protectedRoute, upload.single("image"), createProduct)
router.get("/", protectedRoute, getAllProducts);
router.get("/:id", protectedRoute, getSingleProduct);
router.delete("/:id", protectedRoute, deleteProduct);
router.put("/updateproduct/:id", protectedRoute, upload.single("image"), updateProduct);

module.exports = router;