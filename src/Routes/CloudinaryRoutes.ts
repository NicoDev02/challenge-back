import { Router } from "express";
import {
  cloudinaryDeleteHandler,
  cloudinaryUploadHandler,
} from "../Handlers/CloudinaryHandler";
import checkJwt from "../Middlewares/authMiddleware";

const CloudinaryRoutes = Router();

CloudinaryRoutes.use(checkJwt);

CloudinaryRoutes.post("/upload", cloudinaryUploadHandler);

CloudinaryRoutes.delete("/delete/:public_id", cloudinaryDeleteHandler);

export default CloudinaryRoutes;
