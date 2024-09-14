import { NextFunction, Request, Response } from "express";
import CartService from "../services/cart.service";

class CartController {
  async getAllCarts(req: Request, res: Response, next: NextFunction) {
    try {
      const carts = await CartService.getAllCarts();
      res.status(200).json({
        status: "Success",
        message: "Carts retrieved successfully",
        data: carts,
      });
    } catch (error) {
      next(error);
    }
  }

  async createCart(req: Request, res: Response, next: NextFunction) {
    try {
      const cart = await CartService.createCart(req.body);
      res.status(201).json({
        status: "Success",
        message: "Cart created successfully",
        data: cart,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateCart(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedCart = await CartService.updateCart(req.params.id, req.body);
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
