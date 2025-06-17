import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IError, IProduct } from "@/types";

import {
  addProduct,
  deleteProduct,
  editProduct,
  getProducts,
} from "@/services/products";
import type {
  IAddProductFn,
  IDeleteProductFn,
  IEditProductFn,
  IGetProductsFn,
} from "@/services/products/index.types";

import { queryKeys } from "@/constants/query-keys";

export const useGetProducts = () =>
  useQuery<Awaited<ReturnType<IGetProductsFn>>, IError>({
    queryKey: queryKeys.products.all,
    queryFn: getProducts,
    staleTime: 60 * 60 * 1000,
  });

export const useAddProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Awaited<ReturnType<IAddProductFn>>,
    IError,
    Parameters<IAddProductFn>[0]
  >({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.products.all,
      });
    },
  });
};

export const useEditProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Awaited<ReturnType<IEditProductFn>>,
    IError,
    Parameters<IEditProductFn>[0]
  >({
    mutationFn: editProduct,
    onSuccess: (data) => {
      queryClient.setQueryData(
        queryKeys.products.all,
        (oldData: IProduct[] | undefined) => {
          if (!oldData) return oldData;
          return oldData.map((product: IProduct) =>
            product.id === data.id ? data : product
          );
        }
      );

      queryClient.invalidateQueries({
        queryKey: queryKeys.products.all,
      });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Awaited<ReturnType<IDeleteProductFn>>,
    IError,
    Parameters<IDeleteProductFn>[0]
  >({
    mutationFn: deleteProduct,
    onSuccess: (data, variables) => {
      queryClient.setQueryData(
        queryKeys.products.all,
        (oldData: IProduct[] | undefined) => {
          if (!oldData) return oldData;
          return oldData.filter(
            (product: IProduct) => product.id !== variables.productId
          );
        }
      );

      queryClient.invalidateQueries({
        queryKey: queryKeys.products.all,
      });
    },
  });
};
