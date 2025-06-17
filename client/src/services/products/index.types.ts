import { IProduct } from "@/types";
import { CreateProduct } from "@/schemas/product.schema";

export type IGetProductsFn = () => Promise<IProduct[]>;

export type IAddProductFn = (obj: {
  productDetails: CreateProduct;
}) => Promise<IProduct>;

export type IEditProductFn = (obj: {
  productDetails: Partial<IProduct>;
}) => Promise<IProduct>;

export type IDeleteProductFn = (obj: {
  productId: IProduct["id"];
}) => Promise<IProduct>;
