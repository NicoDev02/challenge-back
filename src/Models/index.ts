import Product from "./ProductModel";
import Size from "./SizeModel";

// Product Size Associations

Product.hasMany(Size, { foreignKey: "productId", as: "sizes" });
Size.belongsTo(Product, { foreignKey: "productId", as: "product" });

export { Product, Size };
