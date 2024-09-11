// src/services/productService.ts
import _Product from "../models/product.model";

class ProductService {
  async getAllProducts() {
    return _Product.find();
  }

  async getProductById(productId: string) {
    return _Product.findById(productId);
  }

  async createProduct(data: any) {
    const product = new _Product(data);
    return product.save();
  }

  async updateProduct(productId: string, data: any) {
    return _Product.findByIdAndUpdate(productId, data, { new: true });
  }

  async deleteProduct(productId: string) {
    return _Product.findByIdAndDelete(productId);
  }
}

export default new ProductService();
