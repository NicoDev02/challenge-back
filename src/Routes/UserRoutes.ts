import { Router } from "express";
import * as UserHandler from "../Handlers/UserHandler";
import checkJwt from "../Middlewares/authMiddleware";

const UserRoutes = Router();

UserRoutes.use(checkJwt);

UserRoutes.get("/", UserHandler.getAllUsers);

UserRoutes.post("/", UserHandler.createUser);

UserRoutes.get("/:id", UserHandler.getUserById);

UserRoutes.delete("/:id", UserHandler.deleteUser);

UserRoutes.put("/:id", UserHandler.updateUser);

export default UserRoutes;
