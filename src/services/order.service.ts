import mongoose from "mongoose";
import { NotFoundError } from "../utils/errors/NotFoundError";
import { BadRequestError } from "../utils/errors/BadRequestError";
import _Order, { IOrder } from "../models/order.model";

class OrderService {
  async getAllOrderByUserId(userId: string) {
    if (!mongoose.isObjectIdOrHexString(userId)) {
      throw new BadRequestError("User id is invalid");
    }
    const orders = await _Order.find({ userId: userId });
    if (!orders) {
      throw new NotFoundError();
    }
    return orders;
  }

  async createOrder(iOrder: IOrder) {
    if (
      !iOrder.userId ||
      !iOrder.products ||
      !iOrder.totalAmount ||
      !iOrder.note ||
      !iOrder.status
    ) {
      throw new BadRequestError("All field are required");
    }
    const order = new _Order(iOrder);
    return order.save();
  }

  async updateOrder(orderId: string, iOrder: IOrder) {
    if (!mongoose.isObjectIdOrHexString(orderId)) {
      throw new BadRequestError("Order id is invalid");
    }
    const order = await _Order.findByIdAndUpdate(orderId, iOrder, {
      new: true,
    });
    if (!order) {
      throw new NotFoundError();
    }
    return order;
  }

  async deleteOrder(orderId: string) {
    if (!mongoose.isObjectIdOrHexString(orderId)) {
      throw new BadRequestError("Order id is invalid");
    }
    const order = await _Order.findByIdAndDelete(orderId);
    if (!order) {
      throw new NotFoundError();
    }
    return order;
  }
}

export default new OrderService();
