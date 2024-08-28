import { Router } from "express";
import * as CategoryHandler from "../Handlers/CategoryHandler";
import checkJwt from "../Middlewares/authMiddleware";
const CategoryRoutes = Router();

CategoryRoutes.get("/", CategoryHandler.getAllCategories);
CategoryRoutes.get("/:id/products", CategoryHandler.getProductsByCategoryId);

CategoryRoutes.use(checkJwt);

CategoryRoutes.post("/", CategoryHandler.createCategory);

CategoryRoutes.get("/:id", CategoryHandler.getCategoryById);

CategoryRoutes.delete("/:id", CategoryHandler.deleteCategory);

CategoryRoutes.put("/:id", CategoryHandler.updateCategoryById);

export default CategoryRoutes;
