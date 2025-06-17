import { v4 as uuidv4 } from "uuid";
import { IProduct, ICreateProduct, IUpdateProduct } from "@/types";
import { CustomError } from "@/middleware/error-handler";
import { mockProducts } from "@/data/mockProducts";

let products: IProduct[] = [...mockProducts];

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
