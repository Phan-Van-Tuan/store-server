import express from "express";
import auth from "../middlewares/auth.middleware";
import OrderController from "../controllers/order.controller";

const router = express.Router();

router.get("/", auth(), OrderController.getAllOrderByUserId);
router.post("/", auth(), OrderController.createOrder);
// router.put("/:id", updateOrder);
// router.delete("/:id", deleteOrder);

export default router;
