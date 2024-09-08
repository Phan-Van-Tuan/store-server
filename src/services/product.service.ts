// src/services/productService.ts
import Product from "../models/product.model";

class ProductService {
  async getAllProducts() {
    return Product.find();
  }

  async getProductById(productId: string) {
    return Product.findById(productId);
  }

  async createProduct(data: any) {
    const product = new Product(data);
    return product.save();
  }

  async updateProduct(productId: string, data: any) {
    return Product.findByIdAndUpdate(productId, data, { new: true });
  }

  async deleteProduct(productId: string) {
    return Product.findByIdAndDelete(productId);
  }
}

export default new ProductService();
