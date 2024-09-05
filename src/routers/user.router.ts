import express from "express";
import { signin, signup, verifyEmail } from "../controllers/user.controller";

const router = express.Router();

router.post("/signup", signup);
router.post("/verify-otp", verifyEmail);
router.post("/signin", signin);

export default router;
