import { createProduct } from "../Handlers/ProductHandler";
import * as ProductController from "../Controllers/ProductController";
import { CreateProductSchema } from "../Schemas";
import { Request, Response } from "express";

jest.mock("../Controllers/ProductController");
jest.mock("../Schemas");

describe("createProduct", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.Mock;
  beforeEach(() => {
    req = {
      body: {
        categoryId: "valid-category-id",
        description: "Test Product",
        imageUrl: "http://example.com/image.png",
        sizes: [{ size: "Small", price: 20 }],
        name: "Test Product",
        stock: 10,
        about: "About Test Product",
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    next = jest.fn();

    jest.resetAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return a product and status 201", async () => {
    const createdProduct = {
      id: "ad3eaaf1-e4b0-4292-806f-7dd196489722",
      ...req.body,
      sizes: [
        {
          id: "size-id",
          productId: "new-product-id",
          size: "Small",
          price: 20,
        },
      ],
    };

    (CreateProductSchema.safeParse as jest.Mock).mockReturnValue({
      success: true,
    });
    (ProductController.createProduct as jest.Mock).mockResolvedValue(
      createdProduct
    );
    await createProduct(req as Request, res as Response, next);
    expect(CreateProductSchema.safeParse).toHaveBeenCalledWith({
      categoryId: req.body.categoryId,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      name: req.body.name,
      stock: req.body.stock,
      about: req.body.about,
      sizes: req.body.sizes,
    });
    expect(ProductController.createProduct).toHaveBeenCalledWith({
      categoryId: req.body.categoryId,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      sizes: req.body.sizes,
      name: req.body.name,
      stock: req.body.stock,
      about: req.body.about,
    });
    expect(res.status).toHaveBeenCalledWith(201);
  });

  it("should call next when validation fails", async () => {
    const validationError = new Error("Validation failed");
    (CreateProductSchema.safeParse as jest.Mock).mockReturnValue({
      success: false,
      error: { message: "Validation failed" },
    });

    await createProduct(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(validationError);
    expect(ProductController.createProduct).not.toHaveBeenCalled();
  });

  it("should call next when product creation error occurs", async () => {
    const error = new Error("Product creation failed");
    (CreateProductSchema.safeParse as jest.Mock).mockReturnValue({
      success: true,
    });
    (ProductController.createProduct as jest.Mock).mockRejectedValue(error);
    await createProduct(req as Request, res as Response, next);
    expect(next).toHaveBeenCalledWith(error);
  });
});
