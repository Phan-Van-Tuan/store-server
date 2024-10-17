// src/services/productService.ts
import mongoose, { ObjectId } from "mongoose";
import _Product, { IProduct } from "../models/product.model";
import _User, { IUser } from "../models/account.model";
import _Review from "../models/review.model";
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
    const store = await _User.findById(product.storeId);
    const feedbacks = await _Review.find({ productId: productId });
    const feedbacksWithUserDetails = await Promise.all(
      feedbacks.map(async (feedback) => {
        const user = await _User.findById(feedback.userId);
        const feedbackObj = feedback.toObject(); // Chuyển feedback từ Document sang Object
        if (user) {
          feedbackObj.userName = user.username;
          feedbackObj.userAvatar = user.image; // Thêm thông tin user vào feedback
        }
        return feedbackObj;
      })
    );

    return { product, store, feedbacks: feedbacksWithUserDetails };
  }

  async createProduct(userId: string, iProduct: IProduct) {
    if (
      !userId ||
      !iProduct.name ||
      !iProduct.description ||
      iProduct.price <= 0 ||
      iProduct.quantity <= 0 ||
      !iProduct.categories
    ) {
      throw new BadRequestError("All field are required");
    }
    iProduct.storeId = userId as unknown as ObjectId;
    const product = new _Product(iProduct);
    await product.save();
    const products = await _Product.find({ storeId: userId });
    return products;
  }

  async updateProduct(userId: string, productId: string, iProduct: IProduct) {
    if (userId != `${iProduct.storeId}`) {
      throw new BadRequestError("forbidden");
    }
    const product = await _Product.findByIdAndUpdate(productId, iProduct, {
      new: true,
    });
    if (!product) {
      throw new NotFoundError();
    }
    const products = await _Product.find({ storeId: userId });
    return products;
  }

  async deleteProduct(userId: string, storeId: string, productId: string) {
    console.log(userId, storeId, productId);
    if (userId != storeId) {
      throw new BadRequestError("forbidden");
    }
    const product = await _Product.findByIdAndDelete(productId);
    if (!product) {
      throw new NotFoundError();
    }
    const products = await _Product.find({ storeId: userId });
    return products;
  }
}

export default new ProductService();
