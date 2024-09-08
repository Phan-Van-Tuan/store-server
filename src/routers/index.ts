import express from "express";
import authRouter from "./auth.router";
import productRouter from "./product.router"
import orderRouter from "./order.router";
import paymentRouter from "./payment.router";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/product", productRouter)
router.use("/order", orderRouter);
router.use("/payment", paymentRouter);

export default router;
