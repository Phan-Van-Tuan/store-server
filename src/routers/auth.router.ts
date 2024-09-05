import express from "express";
import AuthController from "../controllers/auth.controller";

const router = express.Router();

router.post("/signup", AuthController.signup);
router.post("/request-verify-email", AuthController.requestVerifyEmail);
router.post("/request-reset-password", AuthController.requestResetPassword);
router.post("/request-forgot-password", AuthController.requestForgotPassword);
router.post("/verify-email", AuthController.verifyEmail);
router.post("/verify-reset-password", AuthController.verifyResetPassword);
router.post("/verify-forgot-password", AuthController.verifyForgotPassword);
router.post("/change-password", AuthController.changePassword);
router.post("/signin", AuthController.signin);
router.post("/refresh-token", AuthController.refreshToken);
router.post("/signout", AuthController.signout);

export default router;
