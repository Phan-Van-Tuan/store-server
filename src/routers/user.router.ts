import express from "express";
import { login, signUp, verifyEmail } from "../controllers/user.controller";

const router = express.Router();

router.post("/signup", signUp);
router.post("/verify-otp", verifyEmail);
router.post("/login", login);

export default router;
