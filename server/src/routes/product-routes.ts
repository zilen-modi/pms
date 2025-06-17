import { Router } from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/controllers/product-controller";
import {
  validateBody,
  validateParams,
  validateQuery,
} from "@/middleware/validation";
import {
  CreateProductSchema,
  UpdateProductSchema,
  ProductIdSchema,
  ProductFiltersSchema,
} from "@/schemas/product-schemas";

const router = Router();

router.get("/", validateQuery(ProductFiltersSchema), getProducts);
router.get("/:id", validateParams(ProductIdSchema), getProductById);
router.post("/", validateBody(CreateProductSchema), createProduct);
router.put(
  "/:id",
  validateParams(ProductIdSchema),
  validateBody(UpdateProductSchema),
  updateProduct
);
router.delete("/:id", validateParams(ProductIdSchema), deleteProduct);

export default router;
