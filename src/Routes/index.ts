import { Router } from "express";
import UserRoutes from "./UserRoutes";
import ProductRoutes from "./ProductRoutes";
import CategoryRoutes from "./CategoryRoutes";
import CloudinaryRoutes from "./CloudinaryRoutes";

const router = Router();
router.use("/user", UserRoutes);
router.use("/products", ProductRoutes);
router.use("/categories", CategoryRoutes);
router.use("/cloudinary", CloudinaryRoutes);
export default router;
