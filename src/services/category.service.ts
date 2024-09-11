// src/services/categoryService.ts
import mongoose from "mongoose";
import _Category, { ICategory } from "../models/category.model";
import { NotFoundError } from "../utils/errors/NotFoundError";
import { BadRequestError } from "../utils/errors/BadRequestError";

class CategoryService {
  async getAllCategories() {
    const categories = await _Category.find();
    if (!categories) {
      throw new NotFoundError();
    }
    return categories;
  }

  async getCategoryById(categoryId: string) {
    if (!mongoose.isObjectIdOrHexString(categoryId)) {
      throw new BadRequestError("Category id is invalid");
    }
    const category = await _Category.findById(categoryId);
    if (!category) {
      throw new NotFoundError();
    }
    return category;
  }

  async createCategory(iCategory: ICategory) {
    if (!iCategory.name || !iCategory.description) {
      throw new BadRequestError("All field are required");
    }
    const category = new _Category(iCategory);
    return category.save();
  }

  async updateCategory(categoryId: string, iCategory: ICategory) {
    if (!mongoose.isObjectIdOrHexString(categoryId)) {
      throw new BadRequestError("Category id is invalid");
    }
    const product = await _Category.findByIdAndUpdate(categoryId, iCategory, {
      new: true,
    });
    if (!product) {
      throw new NotFoundError();
    }
    return product;
  }

  async deleteCategory(categoryId: string) {
    if (!mongoose.isObjectIdOrHexString(categoryId)) {
      throw new BadRequestError("Category id is invalid");
    }
    const category = await _Category.findByIdAndDelete(categoryId);
    if (!category) {
      throw new NotFoundError();
    }
    return category;
  }
}

export default new CategoryService();
