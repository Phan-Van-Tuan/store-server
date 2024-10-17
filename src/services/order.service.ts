import mongoose, { ObjectId } from "mongoose";
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

  async getOrderById(orderId: string) {
    const order = await _Order
      .findById(orderId)
      .populate("products.productId freeship discount");
    if (!order) {
      throw new NotFoundError();
    }
    return order;
  }

  async createOrder(userId: String, iOrder: IOrder) {
    if (
      !iOrder.userId ||
      !iOrder.products ||
      iOrder.totalAmount > 0 ||
      !iOrder.status ||
      !iOrder.paymentMethod
    ) {
      throw new BadRequestError("All field are required");
    }
    iOrder.userId = userId as unknown as ObjectId;
    const order = new _Order(iOrder);
    await order.save();
    return order;
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
