import { Request, Response, NextFunction } from "express";
import * as CategoryController from "../Controllers/CategoryController";
import { UUID } from "../Schemas";

export const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await CategoryController.getAllCategories();
    return res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

export const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new Error("some fields are missing");
    }
    const result = UUID.safeParse(id);
    if (!result.success) {
      throw new Error("Invalid id");
    }
    const category = await CategoryController.getCategoryById(id);
    return res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;
    if (!name) {
      throw new Error("some fields are missing");
    }
    const category = await CategoryController.createCategory(name);
    return res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

export const updateCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new Error("some fields are missing");
    }
    const result = UUID.safeParse(id);
    if (!result.success) {
      throw new Error("Invalid id");
    }
    const { name } = req.body;
    if (!name) {
      throw new Error("some fields are missing");
    }
    const category = await CategoryController.updateCategoryById(id, name);
    return res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  if (!id) {
    throw new Error("some fields are missing");
  }
  const result = UUID.safeParse(id);
  if (!result.success) {
    throw new Error("Invalid id");
  }
  try {
    const category = await CategoryController.deleteCategoryById(id);
    return res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

export const getProductsByCategoryId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new Error("some fields are missing");
    }
    const result = UUID.safeParse(id);
    if (!result.success) {
      throw new Error("Invalid id");
    }
    const products = await CategoryController.getProductsByCategoryId(id);
    return res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};
