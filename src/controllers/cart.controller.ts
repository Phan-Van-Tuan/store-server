import { NextFunction, Request, Response } from "express";
import CartService from "../services/cart.service";
import { decodePayload } from "../utils/interfaces/payload.interface";

class CartController {
  async getAllCart(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.currentUser as decodePayload;
      const cart = await CartService.getCart(user.userId);
      res.status(200).json({
        status: "Success",
        message: "Carts retrieved successfully",
        data: cart,
      });
    } catch (error) {
      next(error);
    }
  }

  // async addProductToCart(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const user = req.currentUser as decodePayload;
  //     const { productId, quantity } = req.body;

  //     const updatedCart = await CartService.addProductToCart(
  //       user.userId,
  //       productId,
  //       quantity
  //     );

  //     res.status(200).json({
  //       status: "Success",
  //       message: "Product added to cart successfully",
  //       data: updatedCart,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  async updateCart(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.currentUser as decodePayload;
      const { productId, quantity } = req.body;
      const updatedCart = await CartService.updateCart(
        user.userId,
        productId,
        quantity
      );
      res.status(200).json({
        status: "Success",
        message: "Cart updated successfully",
        data: updatedCart,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteCart(req: Request, res: Response, next: NextFunction) {
    try {
      const deletedCart = await CartService.deleteCart(req.params.id);
      res.status(200).json({
        status: "Success",
        message: "Cart deleted successfully",
        data: deletedCart,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new CartController();
