const router = require("express").Router();
const productController = require("../controllers/product.controller");
const validateObjectId = require("../middlewares/validateObjectId");

router.post("/", productController.createProduct);

router.get("/", productController.getProducts);

router.get("/low-stock", productController.getLowStockProducts);

// router.get("/statistics", productController.getProductsStatistics);

router.get("/:id", validateObjectId, productController.getOneProduct);

router.put("/:id", validateObjectId, productController.updateProduct);

router.delete("/:id", validateObjectId, productController.deleteProduct);

module.exports = router;
