// src/services/productService.ts
import mongoose from "mongoose";
import _Product, { IProduct } from "../models/product.model";
import { BadRequestError } from "../utils/errors/BadRequestError";
import { NotFoundError } from "../utils/errors/NotFoundError";

class ProductService {
  async getAllProducts() {
    const products = await _Product.find();
    if (!products) {
      throw new NotFoundError();
    }
    return products;
  }

  async getProductsByStoreId(storeId: string) {
    if (!mongoose.isObjectIdOrHexString(storeId)) {
      throw new BadRequestError("Store id is invalid");
    }
    const products = await _Product.find({ storeId: storeId });
    if (!products || products.length === 0) {
      throw new NotFoundError();
    }
    return products;
  }

  async getProductsByCategory(categoryId: string) {
    if (!mongoose.isObjectIdOrHexString(categoryId)) {
      throw new BadRequestError("Category id is invalid");
    }

    // Tìm kiếm sản phẩm theo categoryId
    const products = await _Product.find({
      "categories.categoryId": categoryId,
    });

    if (!products || products.length === 0) {
      throw new NotFoundError();
    }

    return products;
  }

  async getProductById(productId: string) {
    if (!mongoose.isObjectIdOrHexString(productId)) {
      throw new BadRequestError("Product id is invalid");
    }
    const product = await _Product.findById(productId);
    if (!product) {
      throw new NotFoundError();
    }
    return product;
  }

  async createProduct(iProduct: IProduct) {
    if (
      !iProduct.storeId ||
      !iProduct.name ||
      !iProduct.description ||
      !iProduct.price ||
      !iProduct.quantity ||
      !iProduct.categories
    ) {
      throw new BadRequestError("All field are required");
    }
    const product = new _Product(iProduct);
    return await product.save();
  }

  async updateProduct(productId: string, iProduct: IProduct) {
    if (!mongoose.isObjectIdOrHexString(productId)) {
      throw new BadRequestError("Product id is invalid");
    }
    const product = await _Product.findByIdAndUpdate(productId, iProduct, {
      new: true,
    });
    if (!product) {
      throw new NotFoundError();
    }
    return product;
  }

  async deleteProduct(productId: string) {
    if (!mongoose.isObjectIdOrHexString(productId)) {
      throw new BadRequestError("Product id is invalid");
    }
    const product = await _Product.findByIdAndDelete(productId);
    if (!product) {
      throw new NotFoundError();
    }
    return product;
  }
}

export default new ProductService();
