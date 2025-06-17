import { Request, Response, NextFunction } from "express";
import { 
  getProducts as getProductsService,
  getProductById as getProductByIdService,
  createProduct as createProductService,
  updateProduct as updateProductService,
  deleteProduct as deleteProductService,
} from "@/services/product-service";
import { IApiResponse, IProduct } from "@/types";

export const getProducts = async (
  _req: Request,
  res: Response<IApiResponse<IProduct[]>>,
  next: NextFunction
) => {
  try {
    const products = await getProductsService();

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (
  req: Request<{ id: string }>,
  res: Response<IApiResponse<IProduct>>,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const product = await getProductByIdService(id);

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (
  req: Request,
  res: Response<IApiResponse<IProduct>>,
  next: NextFunction
) => {
  try {
    const productData = req.body;
    const newProduct = await createProductService(productData);

    res.status(201).json({
      success: true,
      data: newProduct,
      message: "Product created successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (
  req: Request<{ id: string }>,
  res: Response<IApiResponse<IProduct>>,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedProduct = await updateProductService(id, updateData);

    res.status(200).json({
      success: true,
      data: updatedProduct,
      message: "Product updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (
  req: Request<{ id: string }>,
  res: Response<IApiResponse<IProduct>>,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const deletedProduct = await deleteProductService(id);

    res.status(200).json({
      success: true,
      data: deletedProduct,
      message: "Product deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};