import { Router } from "express";
import CategoryController from "../controllers/category.controller";

const router = Router();

router.get("/", CategoryController.getAllCategories);
router.get("/:id", CategoryController.getCategoryById);
router.post("/", CategoryController.createCategory);
router.put("/:id", CategoryController.updateCategory);
router.delete("/:id", CategoryController.deleteCategory);

export default router;
