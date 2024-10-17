// src/routes/productRouter.ts
import { Router } from "express";
import ProductController from "../controllers/product.controller";
import auth from "../middlewares/auth.middleware";

const router = Router();

router.get("/", ProductController.getAllProducts);
router.get("/get-by-store-id/:id", ProductController.getProductByStoreId);
router.get("/get-by-category/:id", ProductController.getProductsByCategory);
router.get("/:id", ProductController.getProductById);
router.post("/", auth("store"), ProductController.createProduct);
router.put("/:id", auth("store"), ProductController.updateProduct);
router.delete(
  "/:storeId/:productId",
  auth("store"),
  ProductController.deleteProduct
);

export default router;
