import { Router } from "express";
import {
  //   generateQR,
  createPayment,
  vnpayReturn,
  getAll,
} from "../controllers/payment.controler";

const router = Router();

// router.post("/generate_qrcode", generateQR);
router.post("/create_payment", createPayment);
router.get("/vnpay_return", vnpayReturn);
router.get("/", getAll);

export default router;
