import { Request, Response, NextFunction } from "express";
import {
  login,
  logout,
  refresh,
  register,
  verifyOTP,
} from "../services/auth.sevice";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userName, email, password } = req.body;
    const token = await register(userName, email.toLowerCase(), password);
    res.status(200).json(token);
  } catch (error) {
    next(error);
  }
};

export const verifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token, otp } = req.body;
    const result = await verifyOTP(token, otp);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const result = await login(email.lowercase(), password);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = req.body;
    const result = await refresh(refreshToken);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const signout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = req.body;
    const authHeader = req.headers["authorization"] || "";
    const result = await logout(authHeader, refreshToken);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const reset = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = req.body;
    const authHeader = req.headers["authorization"] || "";
    const result = await logout(authHeader, refreshToken);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// export const signout = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { refreshToken } = req.body;
//     const authHeader = req.headers["authorization"] || "";
//     const result = await logout(authHeader, refreshToken);
//     res.status(200).json(result);
//   } catch (error) {
//     next(error);
//   }
// };

// Lấy danh sách đơn hàng
export const getOrders = (req: Request, res: Response, next: NextFunction) => {
  // Logic lấy danh sách đơn hàng từ cơ sở dữ liệu
  res.send("Danh sách đơn hàng");
};

// Tạo một đơn hàng mới
export const createOrder = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Logic tạo đơn hàng mới
  res.send("Tạo đơn hàng thành công");
};

// Cập nhật thông tin đơn hàng
export const updateOrder = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Logic cập nhật đơn hàng
  res.send(`Cập nhật đơn hàng ${req.params.id}`);
};

// Xóa đơn hàng
export const deleteOrder = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Logic xóa đơn hàng
  res.send(`Xóa đơn hàng ${req.params.id}`);
};
