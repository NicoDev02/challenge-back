import { BuildOptions, Model, DataTypes } from "sequelize";
import { z } from "zod";
import { ProductSchema } from "../Schemas";
export type ProductAttributes = z.infer<typeof ProductSchema>;

export type ProductData = Omit<ProductAttributes, "id"> & {
  categoryId: string;
  sizes?: { size: string; price: number }[];
};

export type ProductUpdate = Partial<ProductAttributes> & {
  categoryId?: string;
  sizes?: { id: string; size: string; price: number }[];
};

export interface ProductInstance
  extends Model<ProductAttributes>,
    ProductAttributes {}

export type ProductModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ProductInstance;
};
