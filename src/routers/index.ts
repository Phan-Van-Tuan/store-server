import express from "express";
import authRouter from "./auth.router";
import orderRouter from "./order.router";
import paymentRouter from "./payment.router";
import productRouter from "./product.router";
import categoryRouter from "./category.router";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/order", orderRouter);
router.use("/payment", paymentRouter);
router.use("/product", productRouter);
router.use("/category", categoryRouter);

export default router;
