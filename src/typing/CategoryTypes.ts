import { BuildOptions, Model } from "sequelize";

export interface CategoryAttributes {
  id?: string;
  name: string;
}

export type CategoryData = Omit<CategoryAttributes, "id">;

export interface CategoryInstance
  extends Model<CategoryAttributes>,
    CategoryAttributes {}

export type CategoryModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): CategoryInstance;
};
