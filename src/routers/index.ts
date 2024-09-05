import express from "express";
import orderRouter from "./order.router";
import paymentRouter from "./payment.router";
import userRouter from "./auth.router";

const router = express.Router();

router.use("/user", userRouter);
router.use("/order", orderRouter);
router.use("/payment", paymentRouter);

export default router;
