import { z } from "zod";

export const ProductStatusEnum = z.enum(["active", "archived"]);

export const ProductSchema = z.object({
  id: z.string().min(1, "Product ID is required"),
  name: z
    .string()
    .min(1, "Product name is required")
    .max(100, "Product name must be less than 100 characters"),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .optional(),
  price: z.number().min(0, "Price must be a positive number"),
  status: ProductStatusEnum,
  tags: z.array(z.string()),
  imageUrl: z.string().url("Please enter a valid URL").optional(),
});

export const CreateProductSchema = z.object({
  name: z
    .string()
    .min(1, "Product name is required")
    .max(100, "Product name must be less than 100 characters"),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .optional(),
  price: z.number().min(0, "Price must be a positive number"),
  status: ProductStatusEnum,
  tags: z.array(z.string()),
  imageUrl: z.string().url("Please enter a valid URL").optional(),
});

export const UpdateProductSchema = ProductSchema.partial().extend({
  id: z.string().min(1, "Product ID is required"),
});

export const ProductFiltersSchema = z.object({
  search: z.string().optional(),
  status: ProductStatusEnum.optional(),
  tags: z.array(z.string()).optional(),
  minPrice: z.number().min(0).optional(),
  maxPrice: z.number().min(0).optional(),
  sortBy: z.enum(["name", "price", "status", "createdAt"]).optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
});

export type Product = z.infer<typeof ProductSchema>;
export type CreateProduct = z.infer<typeof CreateProductSchema>;
export type UpdateProduct = z.infer<typeof UpdateProductSchema>;
