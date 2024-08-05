import { Product, Size } from "../Models";
import Category from "../Models/CategoryModel";

export const getAllCategories = async () => {
  try {
    const categories = await Category.findAll();
    if (!categories) {
      throw new Error("No categories found");
    }
    return categories;
  } catch (error) {
    throw error;
  }
};

export const getCategoryById = async (id: string) => {
  try {
    const category = await Category.findByPk(id);
    return category;
  } catch (error) {
    throw error;
  }
};

export const createCategory = async (name: string) => {
  try {
    const category = await Category.create({ name });
    return category;
  } catch (error) {
    throw error;
  }
};

export const updateCategoryById = async (id: string, name: string) => {
  try {
    const category = await Category.findByPk(id);
    if (!category) {
      throw new Error("Category not found");
    }
    await Category.update({ name }, { where: { id } });
    return {
      message: "Category updated successfully",
    };
  } catch (error) {
    throw error;
  }
};

export const deleteCategoryById = async (id: string) => {
  try {
    const category = await Category.findByPk(id);
    if (!category) {
      throw new Error("Category not found");
    }
    await Category.destroy({ where: { id } });
    return { message: "Category deleted successfully" };
  } catch (error) {
    throw error;
  }
};

export const getProductsByCategoryId = async (id: string) => {
  try {
    const products = await Product.findAll({
      where: { categoryId: id },
      include: [{ model: Size, as: "sizes" }],
    });
    if (!products) {
      throw new Error("No products found");
    }
    return products;
  } catch (error) {
    throw error;
  }
};
