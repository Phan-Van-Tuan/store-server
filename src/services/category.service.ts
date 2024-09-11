// src/services/categoryService.ts
import _Category from "../models/category.model";

class CategoryService {
  async getAllCategories() {
    return _Category.find();
  }

  async getCategoryById(categoryId: string) {
    return _Category.findById(categoryId);
  }

  async createCategory(data: any) {
    const category = new _Category(data);
    return category.save();
  }

  async updateCategory(categoryId: string, data: any) {
    return _Category.findByIdAndUpdate(categoryId, data, { new: true });
  }

  async deleteCategory(categoryId: string) {
    return _Category.findByIdAndDelete(categoryId);
  }
}

export default new CategoryService();
