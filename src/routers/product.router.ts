// src/routes/productRouter.ts
import { Router } from "express";
import ProductController from "../controllers/product.controller";

const router = Router();

router.get("/", ProductController.getAllProducts);
router.get("/get-by-store-id/:id", ProductController.getProductByStoreId);
router.get("/get-by-category/:id", ProductController.getProductsByCategory);
router.get("/:id", ProductController.getProductById);
router.post("/", ProductController.createProduct);
router.put("/:id", ProductController.updateProduct);
router.delete("/:id", ProductController.deleteProduct);

export default router;
