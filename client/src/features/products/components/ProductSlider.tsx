"use client";

import { useState } from "react";
import { Slider, Button } from "@/components";
import { ProductForm } from "./ProductForm";
import type { CreateProduct } from "@/schemas/product.schema";
import { IProduct } from "@/types";

interface ProductSliderProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateProduct) => void;
  isLoading?: boolean;
  product?: IProduct;
}

export function ProductSlider({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  product,
}: ProductSliderProps) {
  const [formState, setFormState] = useState({
    isValid: false,
    isDirty: false,
  });
  const formId = "product-form";

  const duplicateProduct: IProduct | undefined = product
    ? {
        id: "",
        name: `${product.name} (Copy)`,
        description: product.description,
        price: product.price,
        status: product.status,
        tags: [...product.tags],
        imageUrl: product.imageUrl,
      }
    : undefined;

  return (
    <Slider
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      title={product ? "Duplicate Product" : "Add New Product"}
      footer={
        <div className="flex items-center gap-2">
          <Button
            type="submit"
            form={formId}
            variant="primary"
            isLoading={isLoading}
            disabled={!formState.isValid || !formState.isDirty || isLoading}
          >
            Create Product
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      }
    >
      {isOpen && (
        <ProductForm
          product={duplicateProduct}
          onSubmit={onSubmit}
          isOpen={isOpen}
          formId={formId}
          onFormStateChange={setFormState}
        />
      )}
    </Slider>
  );
}
