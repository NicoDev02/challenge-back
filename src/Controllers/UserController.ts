import User from "../Models/UserModel";
import { CreateUserType } from "../typing/UserTypes";

export const getAllUsers = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    throw error;
  }
};

export const createUser = async ({
  name,
  lastName,
  email,
  profilePicture,
}: CreateUserType) => {
  const user = await User.findOne({ where: { email } });
  if (user) {
    throw new Error("User already exists");
  }
  const newUser = await User.create({
    name,
    lastName,
    email,
    profilePicture,
  });
  return newUser;
};

export const getUserById = async (id: string) => {
  try {
    const user = await User.findOne({ where: { id } });
    return user;
  } catch (error) {
    throw error;
  }
};

export const deleteUserById = async (id: string) => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }
    await user.destroy();
    return { message: "User deleted successfully" };
  } catch (error) {
    throw error;
  }
};

export const updateUserById = async (
  id: string,
  { name, lastName, email, profilePicture }: CreateUserType
) => {
  try {
    const user = await User.update(
      { name, lastName, email, profilePicture },
      { where: { id } }
    );
    if (!user[0]) {
      throw new Error("User not found");
    }
    return {
      message: "User updated successfully",
    };
  } catch (error) {
    throw error;
  }
};
