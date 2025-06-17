import { v4 as uuidv4 } from "uuid";
import { IProduct, ICreateProduct, IUpdateProduct } from "@/types";
import { CustomError } from "@/middleware/error-handler";

let products: IProduct[] = [
  {
    id: "1",
    name: "iPhone 15 Pro",
    description:
      "The most advanced iPhone ever with titanium design, powerful A17 Pro chip, and professional camera system.",
    price: 999.99,
    status: "active",
    tags: ["electronics", "smartphone", "apple"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "MacBook Air M2",
    description:
      "Supercharged by the M2 chip, featuring a 13.6-inch Liquid Retina display and all-day battery life.",
    price: 1199.99,
    status: "active",
    tags: ["electronics", "laptop", "apple", "productivity"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "AirPods Pro",
    description:
      "Active Noise Cancellation, Adaptive Transparency, and spatial audio for an immersive listening experience.",
    price: 249.99,
    status: "active",
    tags: ["electronics", "audio", "apple", "wireless"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Samsung Galaxy S24",
    description:
      "Premium Android smartphone with AI-powered features, exceptional camera system, and sleek design.",
    price: 899.99,
    status: "archived",
    tags: ["electronics", "smartphone", "samsung"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Dell XPS 13",
    description:
      "Ultra-thin laptop with InfinityEdge display, premium build quality, and exceptional performance.",
    price: 1299.99,
    status: "active",
    tags: ["electronics", "laptop", "dell", "productivity"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const getProducts = async (): Promise<IProduct[]> => {
  return products;
};

export const getProductById = async (id: string): Promise<IProduct> => {
  const product = products.find((p) => p.id === id);
  if (!product) {
    throw new CustomError("Product not found", 404, "PRODUCT_NOT_FOUND");
  }
  return product;
};

export const createProduct = async (
  productData: ICreateProduct
): Promise<IProduct> => {
  const newProduct: IProduct = {
    ...productData,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  products.push(newProduct);
  return newProduct;
};

export const updateProduct = async (
  id: string,
  updateData: Partial<IUpdateProduct>
): Promise<IProduct> => {
  const productIndex = products.findIndex((p) => p.id === id);
  if (productIndex === -1) {
    throw new CustomError("Product not found", 404, "PRODUCT_NOT_FOUND");
  }

  const existingProduct = products[productIndex]!;
  const updatedProduct: IProduct = {
    ...existingProduct,
    ...updateData,
    id: existingProduct.id,
    updatedAt: new Date().toISOString(),
  };

  products[productIndex] = updatedProduct;
  return updatedProduct;
};

export const deleteProduct = async (id: string): Promise<IProduct> => {
  const productIndex = products.findIndex((p) => p.id === id);
  if (productIndex === -1) {
    throw new CustomError("Product not found", 404, "PRODUCT_NOT_FOUND");
  }

  const deletedProduct = products[productIndex]!;
  products.splice(productIndex, 1);
  return deletedProduct;
};
