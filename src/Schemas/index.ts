import { z } from "zod";
export const UUID = z.string().uuid({ message: "Invalid ID" });

export const UserSchema = z.object({
  id: z.string().uuid({ message: "Invalid ID" }).optional(),
  name: z
    .string({ message: "Invalid name" })
    .min(2, { message: "Name must be at least 2 characters long" }),
  lastName: z.string({ message: "Invalid last name" }).optional(),
  email: z
    .string({ message: "Invalid email" })
    .email({ message: "Invalid email" }),
  profilePicture: z.string({ message: "Invalid profile picture" }).optional(),
});

export const CreateUserSchema = UserSchema.omit({ id: true });

export const UpdateUserSchema = UserSchema.partial();

export const ProductSchema = z.object({
  id: z.string().uuid({ message: "Invalid ID" }).optional(),
  name: z.string({ message: "Invalid name" }),
  description: z.string({ message: "Invalid description" }),
  about: z.string({ message: "Invalid about" }),
  stock: z.number({ message: "Invalid stock" }),
  categoryId: z.string({ message: "Invalid category ID" }).uuid({
    message: "Invalid category ID",
  }),
  createdAt: z.date({ message: "Invalid date" }).optional(),
  imageUrl: z.string({ message: "Invalid image URL" }).optional(),
  sizes: z
    .array(
      z.object({
        id: z.string().uuid({ message: "Invalid ID" }).optional(),
        productId: z
          .string()
          .uuid({ message: "Invalid product ID" })
          .optional(),
        size: z.enum(["Small", "Medium", "Large"], {
          message: "Invalid size",
        }),
        price: z.number({ message: "Invalid price" }).positive({
          message: "Price must be a positive number",
        }),
      })
    )
    .optional(),
});

export const CreateProductSchema = ProductSchema.extend({
  sizes: z.array(
    z.object({
      size: z.enum(["Small", "Medium", "Large"], {
        message: "Invalid size",
      }),
      price: z.number({ message: "Invalid price" }).positive({
        message: "Price must be a positive number",
      }),
    })
  ),
}).omit({ createdAt: true, id: true });

export const UpdateProductSchema = ProductSchema.partial();

export const CategorySchema = z.object({
  id: z.string().uuid({ message: "Invalid ID" }),
  name: z.string({ message: "Invalid name" }),
});

export const SizeSchema = z.object({
  id: z.string().uuid({ message: "Invalid ID" }),
  productId: z
    .string({ message: "Invalid product ID" })
    .uuid({ message: "Invalid product ID" }),
  size: z.string({ message: "Invalid size" }),
  price: z.number({ message: "Invalid price" }).positive({
    message: "Price must be a positive number",
  }),
});

export const CreateSizeSchema = SizeSchema.omit({ id: true });

export const UpdateSizeSchema = SizeSchema.partial();
