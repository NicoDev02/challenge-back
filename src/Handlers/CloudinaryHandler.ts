import { NextFunction, Request, Response } from "express";
import {
  cloudinaryDeleteController,
  cloudinaryUploadController,
} from "../Controllers/CloudinaryController";

export const cloudinaryUploadHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { image } = req.body;
    const result = await cloudinaryUploadController(image);
    console.log("result from handler", result);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const cloudinaryDeleteHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { public_id } = req.params;
    const result = await cloudinaryDeleteController(public_id);
    console.log("result from handler", result);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
