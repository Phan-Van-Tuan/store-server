import { Router } from "express";
import CartController from "../controllers/cart.controller";
import auth from "../middlewares/auth.middleware";

const router = Router();

router.get("/", auth(), CartController.getAllCart);
// router.post('/add', auth(), CartController.addProductToCart);
router.post("/", auth(), CartController.updateCart);
router.delete("/:id", CartController.deleteCart);

export default router;
