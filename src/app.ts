import express from "express";
import router from "./Routes";
const app = express();
import errorHandler from "./Middlewares/errorHandler";

// convert req.body to json
app.use(express.json({ limit: "50mb" }));

// routes
app.use("/api", router);

// error handler middleware
app.use(errorHandler);

export default app;
