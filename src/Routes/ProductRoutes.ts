import { Router } from "express";
import * as ProductHandler from "../Handlers/ProductHandler";

const ProductRoutes = Router();

ProductRoutes.get("/", ProductHandler.getAllProducts);

ProductRoutes.post("/", ProductHandler.createProduct);

ProductRoutes.get("/:id", ProductHandler.getProductById);

ProductRoutes.delete("/:id", ProductHandler.deleteProductById);

ProductRoutes.put("/:id", ProductHandler.updateProductById);

export default ProductRoutes;
