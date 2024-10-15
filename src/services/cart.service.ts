import mongoose, { ObjectId } from "mongoose";
import { NotFoundError } from "../utils/errors/NotFoundError";
import { BadRequestError } from "../utils/errors/BadRequestError";
import _Cart, { ICart } from "../models/cart.model";
import _Product, { IProduct } from "../models/product.model";

class CartService {
  async getCart(userId: string) {
    let cart = await _Cart
      .findOne({ userId: userId })
      .populate("products.productId");

    if (!cart) {
      cart = new _Cart({
        userId: userId,
        products: [], // Giỏ hàng mới sẽ bắt đầu rỗng
      });
      await cart.save(); // Lưu giỏ hàng mới vào database
      return []; // Trả về danh sách sản phẩm trống
    }

    const productList = cart.products.map((item) => ({
      product: item.productId, // Thông tin sản phẩm đã được populate
      quantity: item.quantity, // Số lượng của sản phẩm
    }));

    return productList;
  }

  // async addProductToCart(userId: string, productId: string, quantity: number) {
  //   // Tìm giỏ hàng dựa trên userId
  //   if (!mongoose.isObjectIdOrHexString(productId)) {
  //     throw new BadRequestError("Product id is invalid");
  //   }
  //   let cart = await _Cart.findOne({ userId: userId });
  //   // Nếu giỏ hàng không tồn tại, tạo mới
  //   if (!cart) {
  //     cart = new _Cart({
  //       userId: userId,
  //       products: [{ productId: productId, quantity: quantity }],
  //     });
  //   } else {
  //     // Tìm sản phẩm trong giỏ hàng
  //     const productIndex = cart.products.findIndex(
  //       (item) => item.productId.toString() === productId
  //     );

  //     if (productIndex > -1) {
  //       // Sản phẩm đã có trong giỏ hàng, tăng số lượng
  //       cart.products[productIndex].quantity += quantity;
  //     } else {
  //       // Sản phẩm chưa có trong giỏ hàng, thêm sản phẩm mới
  //       cart.products.push({
  //         productId: productId as unknown as ObjectId,
  //         quantity: quantity,
  //       });
  //     }
  //   }

  //   // Lưu lại giỏ hàng sau khi cập nhật
  //   await cart.save();

  //   // Trả về giỏ hàng đã cập nhật (nếu cần)
  //   return cart;
  // }

  async updateCart(userId: string, productId: string, quantity: number) {
    // Kiểm tra tính hợp lệ của Cart ID và Product ID
    if (!mongoose.isObjectIdOrHexString(userId)) {
      throw new BadRequestError("Invalid Cart ID");
    }
    if (!mongoose.isObjectIdOrHexString(productId)) {
      throw new BadRequestError("Invalid Product ID");
    }

    // Tìm giỏ hàng
    let cart = await _Cart.findOne({ userId: userId });
    // Nếu giỏ hàng không tồn tại, tạo mới
    if (!cart) {
      cart = new _Cart({
        userId: userId,
        products: [{ productId: productId, quantity: quantity }],
      });
    }

    // Kiểm tra sản phẩm có tồn tại trong giỏ hàng không
    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId
    );

    if (productIndex > -1) {
      // Sản phẩm đã tồn tại trong giỏ hàng, cập nhật số lượng
      if (quantity > 0) {
        cart.products[productIndex].quantity = quantity;
      } else {
        // Nếu số lượng bằng 0, xóa sản phẩm khỏi giỏ hàng
        cart.products.splice(productIndex, 1);
      }
    } else {
      // Nếu sản phẩm không tồn tại và số lượng > 0, thêm sản phẩm vào giỏ hàng
      if (quantity > 0) {
        cart.products.push({
          productId: productId as unknown as ObjectId,
          quantity,
        });
      }
    }
    // Lưu giỏ hàng cập nhật
    await cart.save();

    const cartpopu = await cart.populate("products.productId");

    const productList = cartpopu.products.map((item) => ({
      product: item.productId, // Thông tin sản phẩm đã được populate
      quantity: item.quantity, // Số lượng của sản phẩm
    }));

    return productList;
  }

  async deleteCart(cartId: string) {
    if (!mongoose.isObjectIdOrHexString(cartId)) {
      throw new BadRequestError("Cart id is invalid");
    }
    const cart = await _Cart.findByIdAndDelete(cartId);
    if (!cart) {
      throw new NotFoundError();
    }
    return cart;
  }
}

export default new CartService();
