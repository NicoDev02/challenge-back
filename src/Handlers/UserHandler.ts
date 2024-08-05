import { Request, Response, NextFunction } from "express";
import * as userController from "../Controllers/UserController";
import { validate } from "uuid";
import { UserSchema, UUID } from "../Schemas";
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userController.getAllUsers();
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, lastName, email, profilePicture } = req.body;

    const result = UserSchema.safeParse({
      name,
      lastName,
      email,
      profilePicture,
    });
    if (!result.success) {
      throw result.error;
    }

    const user = await userController.createUser({
      name,
      lastName,
      email,
      profilePicture,
    });

    return res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new Error("some fields are missing");
    }
    const result = UUID.safeParse(id);
    if (!result.success) {
      throw new Error("Invalid id");
    }
    const user = await userController.getUserById(id);
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new Error("some fields are missing");
    }
    const result = UUID.safeParse(id);
    if (!result.success) {
      throw new Error("Invalid id");
    }
    const { name, lastName, email, profilePicture } = req.body;
    const user = await userController.updateUserById(id, {
      name,
      lastName,
      email,
      profilePicture,
    });
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  if (!id) {
    throw new Error("some fields are missing");
  }
  const result = UUID.safeParse(id);
  if (!result.success) {
    throw new Error("Invalid id");
  }
  try {
    const user = await userController.deleteUserById(id);
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
