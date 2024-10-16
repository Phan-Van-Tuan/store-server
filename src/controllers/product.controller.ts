import { NextFunction, Request, Response } from "express";
import ProductService from "../services/product.service";
import { decodePayload } from "../utils/interfaces/payload.interface";
import { IProduct } from "../models/product.model";

class ProductController {
  async getAllProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await ProductService.getAllProducts();
      res.status(200).json({
        status: "Success",
        message: "Products retrieved successfully",
        data: products,
      });
    } catch (error) {
      next(error);
    }
  }

  async getProductByStoreId(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await ProductService.getProductsByStoreId(req.params.id);
      res.status(200).json({
        status: "Success",
        message: "Products retrieved successfully",
        data: products,
      });
    } catch (error) {
      next(error);
    }
  }

  async getProductsByCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await ProductService.getProductsByCategory(
        req.params.id
      );
      res.status(200).json({
        status: "Success",
        message: "Products retrieved successfully",
        data: products,
      });
    } catch (error) {
      next(error);
    }
  }

  async getProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await ProductService.getProductById(req.params.id);
      res.status(200).json({
        status: "Success",
        message: "Product retrieved successfully",
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.currentUser as decodePayload;
      const product = await ProductService.createProduct(user.userId, req.body);
      res.status(201).json({
        status: "Success",
        message: "Product created",
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.currentUser as decodePayload;
      const updatedProduct = await ProductService.updateProduct(
        user.userId,
        req.params.id,
        req.body
      );
      res.status(200).json({
        status: "Success",
        message: "Product updated",
        data: updatedProduct,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.currentUser as decodePayload;
      const deletedProduct = await ProductService.deleteProduct(
        user.userId,
        req.body,
        req.params.id
      );
      res.status(200).json({
        status: "Success",
        message: "Product deleted",
        data: deletedProduct,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new ProductController();
