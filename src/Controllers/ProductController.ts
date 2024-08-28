import { Product, Size } from "../Models";
import Category from "../Models/CategoryModel";
import { ProductData, ProductUpdate } from "../typing/ProductTypes";

export const getAllProducts = async () => {
  try {
    const products = await Product.findAll({
      include: [{ model: Size, as: "sizes" }],
    });
    return products;
  } catch (error) {
    throw error;
  }
};

export const getProductById = async (id: string) => {
  try {
    const product = await Product.findByPk(id, {
      include: [{ model: Size, as: "sizes" }],
    });
    return product;
  } catch (error) {
    throw error;
  }
};

export const createProduct = async ({
  categoryId,
  description,
  imageUrl,
  sizes,
  name,
  stock,
  about,
}: ProductData) => {
  try {
    const category = await Category.findByPk(categoryId);
    if (!category) {
      throw new Error("category not found");
    }
    if (!sizes) {
      throw new Error("sizes not found");
    }
    const product = {
      categoryId,
      description,
      imageUrl,
      name,
      stock: Number(stock),
      about,
    };
    const newProduct = await Product.create(product);
    if (!newProduct) {
      throw new Error("Product not created");
    }
    for (const size of sizes) {
      await Size.create({
        productId: newProduct.id,
        size: size.size,
        price: Number(size.price),
      });
    }
    const productToSend = await Product.findByPk(newProduct.id, {
      include: [{ model: Size, as: "sizes" }],
    });
    return productToSend;
  } catch (error) {
    throw error;
  }
};

export const updateProductById = async ({
  id,
  categoryId,
  sizes,
  description,
  imageUrl,
  name,
  stock,
  about,
}: ProductUpdate) => {
  try {
    const category = categoryId && (await Category.findByPk(categoryId));
    if (!category && categoryId) {
      throw new Error("category not found");
    }
    if (sizes) {
      await Promise.all(
        sizes.map(async (size) => {
          console.log(size);
          if (!size.id) {
            Size.create({
              productId: id,
              size: size.size,
              price: Number(size.price),
            });
          } else {
            console.log(size);
            await Size.update(
              { size: size.size, price: Number(size.price) },
              { where: { id: size.id } }
            );
          }
        })
      );
    }
    const updateData: Partial<ProductUpdate> = {};
    if (description !== undefined) updateData.description = description;
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl;
    if (name !== undefined) updateData.name = name;
    if (stock !== undefined) updateData.stock = stock;
    if (about !== undefined) updateData.about = about;
    if (categoryId !== undefined) updateData.categoryId = categoryId;
    console.log(updateData);
    const [updated] = await Product.update(updateData, { where: { id } });
    if (!updated) {
      throw new Error("Product not found");
    }
    console.log(updated);
    const updatedProduct = await Product.findByPk(id, {
      include: [{ model: Size, as: "sizes" }],
    });
    console.log(updatedProduct);
    return updatedProduct;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteProductById = async (id: string) => {
  try {
    const product = await Product.findByPk(id, {
      include: [{ model: Size, as: "sizes" }],
    });

    if (!product) {
      throw new Error("Product not found");
    }

    await Size.destroy({ where: { productId: id } });

    await product.destroy();
    return { message: "Product deleted successfully" };
  } catch (error) {
    throw error;
  }
};
