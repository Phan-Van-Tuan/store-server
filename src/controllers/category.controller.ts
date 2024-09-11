// src/controllers/categoryController.ts
import { Request, Response } from "express";
import CategoryService from "../services/category.service";

class CategoryController {
  async getAllCategories(req: Request, res: Response) {
    try {
      const categories = await CategoryService.getAllCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }

  async getCategoryById(req: Request, res: Response) {
    try {
      const category = await CategoryService.getCategoryById(req.params.id);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }

  async createCategory(req: Request, res: Response) {
    try {
      const category = await CategoryService.createCategory(req.body);
      res.status(201).json(category);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }

  async updateCategory(req: Request, res: Response) {
    try {
      const updatedCategory = await CategoryService.updateCategory(
        req.params.id,
        req.body
      );
      if (!updatedCategory) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json(updatedCategory);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }

  async deleteCategory(req: Request, res: Response) {
    try {
      const deletedCategory = await CategoryService.deleteCategory(
        req.params.id
      );
      if (!deletedCategory) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json({ message: "Category deleted" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
}

export default new CategoryController();
