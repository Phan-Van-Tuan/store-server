import { Request, Response, NextFunction } from "express";
import { register, verifyOTP } from "../services/user.sevice";

export const signUp = async (
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

export async function login(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const { userNameOrEmail, password } = req.body;
  //     const dataLogin = {
  //       userName: userNameOrEmail,
  //       email: userNameOrEmail,
  //       password: password,
  //     };
  //     if (!userNameOrEmail || !password) {
  //       return res.status(400).json({
  //         error: "All fields are required",
  //       });
  //     }
  //     let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  //     const data = regexEmail.test(userNameOrEmail)
  //       ? { email: userNameOrEmail, userName: null }
  //       : { userName: userNameOrEmail, email: null };
  //     const user = await User.getUser(data);
  //     const existPassword = await User.getPassword(data);
  //     password.toString();
  //     console.log(existPassword[0].password);
  //     existPassword[0].password.toString();
  //     const comparePassword = await User.comparePassword(
  //       password,
  //       existPassword[0].password
  //     );
  //     console.log(comparePassword);
  //     if (!user) {
  //       return res.status(400).json({
  //         error: "User not found",
  //       });
  //     }
  //     if (user && comparePassword === true) {
  //       const email = user.email;
  //       const token = jwt.sign({ user: email }, process.env.TOKEN_SECRET_KEY, {
  //         expiresIn: "2h",
  //       });
  //       user.token = token;
  //       console.log(user.token);
  //       return res.status(200).json({
  //         message: "User logged in successfully",
  //         user,
  //       });
  //     } else if (user && comparePassword === false) {
  //       return res.status(400).json({
  //         error: "Password is incorrect",
  //       });
  //     }
  //     res.status(200).json({
  //       message: "User logged in successfully",
  //       user,
  //     });
  //   } catch (err) {
  //     next(err);
  //   }
}

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
