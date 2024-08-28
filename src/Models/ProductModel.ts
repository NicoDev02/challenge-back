import { DataTypes } from "sequelize";
import { sequelize } from "../db";
import { ProductInstance, ProductModelStatic } from "../typing/ProductTypes";
import Category from "./CategoryModel";

const Product = <ProductModelStatic>sequelize.define<ProductInstance>(
  "product",
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
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    about: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.UUID,
      references: {
        model: Category,
        key: "id",
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    imageUrl: {
      type: DataTypes.STRING(1024),
    },
  },
  {
    timestamps: false,
    tableName: "product",
  }
);
export default Product;
