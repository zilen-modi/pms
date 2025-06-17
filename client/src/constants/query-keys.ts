import { IProduct } from "@/types";

export const queryKeys = {
  products: {
    all: ["products"] as const,
    detail: (id: IProduct["id"]) => [...queryKeys.products.all, id] as const,
  },
};
