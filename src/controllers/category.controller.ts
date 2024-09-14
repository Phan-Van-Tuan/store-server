import { NextFunction, Request, Response } from "express";
import CategoryService from "../services/category.service";

class CategoryController {
  async getAllCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await CategoryService.getAllCategories();
      res.status(200).json({
        status: "Success",
        message: "Categories retrieved successfully",
        data: categories,
      });
    } catch (error) {
      next(error);
    }
  }

  async getCategoryById(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await CategoryService.getCategoryById(req.params.id);
      res.status(200).json({
        status: "Success",
        message: "Category retrieved successfully",
        data: category,
      });
    } catch (error) {
      next(error);
    }
  }

  async createCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await CategoryService.createCategory(req.body);
      res.status(201).json({
        status: "Success",
        message: "Category created successfully",
        data: category,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedCategory = await CategoryService.updateCategory(
        req.params.id,
        req.body
      );
      res.status(200).json({
        status: "Success",
        message: "Category updated successfully",
        data: updatedCategory,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const deletedCategory = await CategoryService.deleteCategory(
        req.params.id
      );
      res.status(200).json({
        status: "Success",
        message: "Category deleted successfully",
        data: deletedCategory,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new CategoryController();
