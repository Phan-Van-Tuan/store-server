import { Request, Response, NextFunction } from "express";
import AuthService from "../services/auth.sevice";

class AuthController {
  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const { userName, email, password } = req.body;
      const token = await AuthService.signup(
        userName,
        email.toLowerCase(),
        password
      );
      return res.status(200).json(token);
    } catch (error) {
      next(error);
    }
  }

  async signin(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const result = await AuthService.signin(email.toLowerCase(), password);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;
      const result = await AuthService.refreshToken(refreshToken);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async signout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;
      const authHeader = req.headers["authorization"] || "";
      const result = await AuthService.signout(authHeader, refreshToken);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async requestVerifyEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      const result = AuthService.requestVerify("Verify Account", email);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async verifyEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { token, otp } = req.body;
      const result = await AuthService.verifyEmail(token, otp);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async requestResetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      const result = AuthService.requestVerify("Reset Password", email);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async verifyResetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { token, otp, password } = req.body;
      const result = await AuthService.resetPassword(token, otp, password);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async requestForgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      const result = AuthService.requestVerify("Login by OTP", email);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async verifyForgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { token, otp } = req.body;
      const result = await AuthService.forgotPassword(token, otp);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
