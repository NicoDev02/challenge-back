import express from "express";
import router from "./Routes";
const app = express();
import errorHandler from "./Middlewares/errorHandler";
import checkJwt from "./Middlewares/authMiddleware";

app.use(express.json());
app.use("/api", checkJwt);
app.use("/api", router);
app.use(errorHandler);
export default app;
