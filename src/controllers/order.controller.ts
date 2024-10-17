import { Request, Response, NextFunction } from "express";
import OrderService from "../services/order.service";
import { decodePayload } from "../utils/interfaces/payload.interface";

class OrderController {
  // Lấy tất cả các đơn hàng
  async getAllOrderByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.currentUser as decodePayload;
      const orders = await OrderService.getAllOrderByUserId(user.userId);
      res.status(200).json({
        status: "Success",
        message: "Orders retrieved successfully",
        data: orders,
      });
    } catch (error) {
      next(error);
    }
  }

  // Lấy thông tin một đơn hàng theo ID
  async getOrderById(req: Request, res: Response, next: NextFunction) {
    try {
      const orderId = req.params.id;
      const order = await OrderService.getOrderById(orderId);
      if (!order) {
        return res.status(404).json({
          status: "Error",
          message: "Order not found",
        });
      }
      res.status(200).json({
        status: "Success",
        message: "Order retrieved successfully",
        data: order,
      });
    } catch (error) {
      next(error);
    }
  }

  // Tạo một đơn hàng mới
  async createOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const orderData = req.body;
      const user = req.currentUser as decodePayload;
      const newOrder = await OrderService.createOrder(user.userId, orderData);
      res.status(201).json({
        status: "Success",
        message: "Order created successfully",
        data: newOrder,
      });
    } catch (error) {
      next(error);
    }
  }

  // Cập nhật một đơn hàng
  async updateOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const orderId = req.params.id;
      const updateData = req.body;
      const updatedOrder = await OrderService.updateOrder(orderId, updateData);
      if (!updatedOrder) {
        return res.status(404).json({
          status: "Error",
          message: "Order not found",
        });
      }
      res.status(200).json({
        status: "Success",
        message: "Order updated successfully",
        data: updatedOrder,
      });
    } catch (error) {
      next(error);
    }
  }

  // Xóa một đơn hàng
  async deleteOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const orderId = req.params.id;
      const deletedOrder = await OrderService.deleteOrder(orderId);
      if (!deletedOrder) {
        return res.status(404).json({
          status: "Error",
          message: "Order not found",
        });
      }
      res.status(200).json({
        status: "Success",
        message: "Order deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new OrderController();
