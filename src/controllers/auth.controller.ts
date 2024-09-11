import AuthService from "../services/auth.sevice";
import { Request, Response, NextFunction } from "express";
import { decodePayload } from "../utils/interfaces/payload.interface";

class AuthController {
  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const newUser = await AuthService.signup(req.body);
      return res.status(201).json({
        status: "Success",
        message: "Sign up successfully",
        data: { newUser },
      });
    } catch (error) {
      next(error);
    }
  }

  async signin(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const result = await AuthService.signin(email.toLowerCase(), password);
      return res.status(200).json({
        status: "Success",
        message: "Sign in successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;
      const result = await AuthService.refreshToken(refreshToken);
      return res.status(200).json({
        status: "Success",
        message: "Refresh token successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async signout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;
      const authHeader = req.headers["authorization"] || "";
      const result = await AuthService.signout(authHeader, refreshToken);
      return res.status(200).json({
        status: "Success",
        message: "Sign out successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async requestVerifyEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      const result = AuthService.requestVerify("Verify Account", email);
      return res.status(200).json({
        status: "Success",
        message: "Request sent successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async verifyEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { token, otp } = req.body;
      const result = await AuthService.verifyEmail(token, otp);
      return res.status(200).json({
        status: "Success",
        message: "Verify account successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async requestResetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      const result = AuthService.requestVerify("Reset Password", email);
      return res.status(200).json({
        status: "Success",
        message: "Request sent successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async verifyResetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { token, otp, password } = req.body;
      const result = await AuthService.resetPassword(token, otp, password);
      return res.status(200).json({
        status: "Success",
        message: "Reset password successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async requestForgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      const result = AuthService.requestVerify("Login by OTP", email);
      return res.status(200).json({
        status: "Success",
        message: "Request sent successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async verifyForgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { token, otp } = req.body;
      const result = await AuthService.forgotPassword(token, otp);
      return res.status(200).json({
        status: "Success",
        message: "Sign up by otp successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.currentUser as decodePayload;
      const { currentPassword, newPassword } = req.body;
      const result = AuthService.changePassword(
        user.userId,
        currentPassword,
        newPassword
      );
      return res.status(200).json({
        status: "Success",
        message: "Change password successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
