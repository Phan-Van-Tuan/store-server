import mongoose, { ObjectId } from "mongoose";
import { NotFoundError } from "../utils/errors/NotFoundError";
import { BadRequestError } from "../utils/errors/BadRequestError";
import _Order, { IOrder } from "../models/order.model";

class OrderService {
  async getAllOrderByUserId(userId: string) {
    if (!mongoose.isObjectIdOrHexString(userId)) {
      throw new BadRequestError("User id is invalid");
    }
    const orders = await _Order
      .find({ userId: userId })
      .populate("products.productId freeship discount");
    if (!orders) {
      throw new NotFoundError();
    }
    // Kết hợp thông tin order với products
    const orderList = orders.map((order) => ({
      _id: order._id, // ID của đơn hàng
      userId: order.userId, // ID người dùng
      freeship: order.freeship, // Voucher freeship (nếu có)
      discount: order.discount, // Voucher giảm giá (nếu có)
      totalAmount: order.totalAmount, // Tổng số tiền
      note: order.note, // Ghi chú đơn hàng (nếu có)
      status: order.status, // Trạng thái đơn hàng
      paymentMethod: order.paymentMethod, // Phương thức thanh toán
      createdAt: order.createdAt, // Ngày tạo đơn hàng
      products: order.products.map((item) => ({
        product: item.productId, // Thông tin sản phẩm đã được populate
        quantity: item.quantity, // Số lượng của sản phẩm
      })),
    }));

    console.log(orderList); // In ra để kiểm tra danh sách đơn hàng cùng sản phẩm
    return orderList;
  }

  async getOrderById(orderId: string) {
    const order = await _Order.findById(orderId).populate("products.productId");
    if (!order) {
      throw new NotFoundError();
    }
    console.log(order);
    return order;
  }

  async createOrder(userId: String, iOrder: IOrder) {
    console.log(userId, iOrder);
    if (
      !userId ||
      !iOrder.products ||
      iOrder.totalAmount <= 0 ||
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
