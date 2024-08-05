import { Router } from "express";
import * as CategoryHandler from "../Handlers/CategoryHandler";
const CategoryRoutes = Router();

CategoryRoutes.get("/", CategoryHandler.getAllCategories);

CategoryRoutes.post("/", CategoryHandler.createCategory);

CategoryRoutes.get("/:id", CategoryHandler.getCategoryById);

CategoryRoutes.delete("/:id", CategoryHandler.deleteCategory);

CategoryRoutes.put("/:id", CategoryHandler.updateCategoryById);

CategoryRoutes.get("/:id/products", CategoryHandler.getProductsByCategoryId);

export default CategoryRoutes;
