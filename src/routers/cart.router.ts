import { Router } from "express";
import CartController from "../controllers/cart.controller";

const router = Router();

router.get("/", CartController.getAllCarts);
router.post("/", CartController.createCart);
router.put("/:id", CartController.updateCart);
router.delete("/:id", CartController.deleteCart);

export default router;
