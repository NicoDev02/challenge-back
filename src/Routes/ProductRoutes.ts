import { Router } from "express";
import * as ProductHandler from "../Handlers/ProductHandler";
import checkJwt from "../Middlewares/authMiddleware";

const ProductRoutes = Router();

ProductRoutes.get("/", ProductHandler.getAllProducts);
ProductRoutes.get("/:id", ProductHandler.getProductById);

ProductRoutes.use(checkJwt);

ProductRoutes.post("/", ProductHandler.createProduct);

ProductRoutes.delete("/:id", ProductHandler.deleteProductById);

ProductRoutes.put("/:id", ProductHandler.updateProductById);

export default ProductRoutes;
