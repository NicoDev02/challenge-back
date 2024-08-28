import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);
  if (err instanceof ZodError) {
    return res
      .status(400)
      .json({ message: err.issues.map((issue) => issue.message) });
  }
  res.status(500).json({ message: err.message || "Internal Server Error" });
};

export default errorHandler;
