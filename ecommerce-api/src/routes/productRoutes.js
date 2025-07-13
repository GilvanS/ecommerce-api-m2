const express_product = require("express");
const router_product = express_product.Router();
const productController = require("../controllers/productController");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middleware/authMiddleware");

router_product.get("/", productController.getProducts);
router_product.post(
  "/",
  authMiddleware,
  adminMiddleware,
  productController.createProduct
);
router_product.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  productController.updateProduct
);
router_product.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  productController.deleteProduct
);

module.exports = router_product;
