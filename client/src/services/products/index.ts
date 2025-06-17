import axiosClient from "@/config/axios";
import type {
  IAddProductFn,
  IDeleteProductFn,
  IEditProductFn,
  IGetProductsFn,
} from "./index.types";

export const getProducts: IGetProductsFn = () => axiosClient.get("/products");

export const addProduct: IAddProductFn = ({ productDetails }) =>
  axiosClient.post("/products", productDetails);

export const editProduct: IEditProductFn = ({ productDetails }) =>
  axiosClient.put(`/products/${productDetails.id}`, productDetails);

export const deleteProduct: IDeleteProductFn = ({ productId }) =>
  axiosClient.delete(`/products/${productId}`);
