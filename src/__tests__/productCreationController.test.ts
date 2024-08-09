import * as ProductController from "../Controllers/ProductController";
import Category from "../Models/CategoryModel";
import { Product, Size } from "../Models";
jest.mock("../Models/CategoryModel");
jest.mock("../Models");

describe("createProductController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("Should create a product and return it", async () => {
    const createdProduct = {
      id: "ad3eaaf1-e4b0-4292-806f-7dd196489722",
      categoryId: "category-id",
      description: "Product description",
      imageUrl: "https://example.com/image",
      name: "Product name",
      stock: 10,
      about: "Product about",
      sizes: [
        {
          size: "Small",
          price: 20,
        },
      ],
    };

    (Category.findByPk as jest.Mock).mockResolvedValue({ id: "category-id" });
    (Product.create as jest.Mock).mockResolvedValue(createdProduct);

    (Size.create as jest.Mock).mockResolvedValue({
      id: "size-id",
      productId: "new-product-id",
      size: "Small",
      price: 20,
    });

    (Product.findByPk as jest.Mock).mockResolvedValue({
      ...createdProduct,
      sizes: {
        id: "size-id",
        productId: "new-product-id",
        size: "Small",
        price: 20,
      },
    });

    const result = await ProductController.createProduct({
      categoryId: "category-id",
      description: "Product description",
      imageUrl: "https://example.com/image",
      name: "Product name",
      stock: 10,
      about: "Product about",
      sizes: [
        {
          size: "Small",
          price: 20,
        },
      ],
    });

    expect(result).toEqual({
      ...createdProduct,
      sizes: {
        id: "size-id",
        productId: "new-product-id",
        size: "Small",
        price: 20,
      },
    });
  });

  it("Should throw an error if category in the request is not found", async () => {
    (Category.findByPk as jest.Mock).mockResolvedValue(null);
    const result = ProductController.createProduct({
      categoryId: "category-id",
      description: "Product description",
      imageUrl: "https://example.com/image",
      name: "Product name",
      stock: 10,
      about: "Product about",
      sizes: [
        {
          size: "Small",
          price: 20,
        },
      ],
    });
    await expect(result).rejects.toThrow("category not found");
  });

  it("Should throw an error if the product is not created", async () => {
    (Category.findByPk as jest.Mock).mockResolvedValue({ id: "category-id" });
    (Product.create as jest.Mock).mockResolvedValue(null);
    const result = ProductController.createProduct({
      categoryId: "category-id",
      description: "Product description",
      imageUrl: "https://example.com/image",
      name: "Product name",
      stock: 10,
      about: "Product about",
      sizes: [
        {
          size: "Small",
          price: 20,
        },
      ],
    });
    await expect(result).rejects.toThrow("Product not created");
  });
});
