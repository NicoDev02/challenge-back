import { sequelize } from "../db";
import { DataTypes } from "sequelize";
import { CategoryInstance, CategoryModelStatic } from "../typing/CategoryTypes";

const Category = <CategoryModelStatic>sequelize.define<CategoryInstance>(
  "category",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

export default Category;
