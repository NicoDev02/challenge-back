import * as ProductController from "../Controllers/ProductController";
import { NextFunction, Request, Response } from "express";
import { CreateProductSchema, UpdateProductSchema, UUID } from "../Schemas";

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await ProductController.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (
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
    const product = await ProductController.getProductById(id);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { categoryId, description, imageUrl, name, stock, about, sizes } =
      req.body;
    if (
      !categoryId ||
      !description ||
      !imageUrl ||
      !name ||
      !stock ||
      !about ||
      !sizes
    ) {
      throw new Error("some fields are missing");
    }
    const result = CreateProductSchema.safeParse({
      categoryId,
      description,
      imageUrl,
      name,
      stock,
      about,
      sizes,
    });
    if (!result.success) {
      throw new Error(result.error.message);
    }
    const product = await ProductController.createProduct({
      categoryId,
      description,
      imageUrl,
      sizes,
      name,
      stock,
      about,
    });
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

export const updateProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { categoryId, description, imageUrl, name, stock, about, sizes } =
      req.body;

    const result = UpdateProductSchema.safeParse({
      id,
      categoryId,
      description,
      imageUrl,
      name,
      stock,
      about,
      sizes,
    });

    if (!result.success) {
      throw new Error(result.error.message);
    }
    const product = await ProductController.updateProductById({
      id,
      categoryId,
      description,
      imageUrl,
      name,
      stock,
      about,
      sizes,
    });
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const deleteProductById = async (
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
    const product = await ProductController.deleteProductById(id);
    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};
