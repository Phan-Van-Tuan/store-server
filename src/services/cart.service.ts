import mongoose from "mongoose";
import { NotFoundError } from "../utils/errors/NotFoundError";
import { BadRequestError } from "../utils/errors/BadRequestError";
import _Cart, { ICart } from "../models/cart.model";

class CartService {
  async getAllCarts() {
    const carts = await _Cart.find();
    if (!carts) {
      throw new NotFoundError();
    }
    return carts;
  }

  async createCart(iCart: ICart) {
    if (!iCart.userId || !iCart.products) {
      throw new BadRequestError("All field are required");
    }
    const cart = new _Cart(iCart);
    return cart.save();
  }

  async updateCart(cartId: string, iCart: ICart) {
    if (!mongoose.isObjectIdOrHexString(cartId)) {
      throw new BadRequestError("Cart id is invalid");
    }
    const cart = await _Cart.findByIdAndUpdate(cartId, iCart, {
      new: true,
    });
    if (!cart) {
      throw new NotFoundError();
    }
    return cart;
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
