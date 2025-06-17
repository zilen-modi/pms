// Using mock data instead of axios for development
import { mockProductService } from "@/data/mockProducts";

import type {
  IAddProductFn,
  IDeleteProductFn,
  IEditProductFn,
  IGetProductsFn,
} from "./index.types";

export const getProducts: IGetProductsFn = () =>
  mockProductService.getProducts();

export const addProduct: IAddProductFn = ({ productDetails }) =>
  mockProductService.addProduct(productDetails);

export const editProduct: IEditProductFn = ({ productDetails }) =>
  mockProductService.updateProduct(productDetails.id!, productDetails);

export const deleteProduct: IDeleteProductFn = ({ productId }) =>
  mockProductService.deleteProduct(productId);
