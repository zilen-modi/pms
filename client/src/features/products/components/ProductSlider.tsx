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
  isEditing?: boolean;
}

export function ProductSlider({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  product,
  isEditing = false,
}: ProductSliderProps) {
  const [formState, setFormState] = useState({
    isValid: false,
    isDirty: false,
  });
  const formId = "product-form";

  let sliderTitle = "Add New Product";
  let buttonText = "Create Product";
  let productToUse = product;
  
  if (isEditing && product) {
    sliderTitle = "Edit Product";
    buttonText = "Update Product";
  } else if (product) {
    sliderTitle = "Duplicate Product";
    productToUse = {
      id: "",
      name: `${product.name} (Copy)`,
      description: product.description,
      price: product.price,
      status: product.status,
      tags: [...product.tags],
      imageUrl: product.imageUrl,
    };
  }

  return (
    <Slider
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      title={sliderTitle}
      footer={
        <div className="flex items-center gap-2">
          <Button
            type="submit"
            form={formId}
            variant="primary"
            isLoading={isLoading}
            disabled={!formState.isValid || !formState.isDirty || isLoading}
          >
            {buttonText}
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      }
    >
      {isOpen && (
        <ProductForm
          product={productToUse}
          onSubmit={onSubmit}
          isOpen={isOpen}
          formId={formId}
          onFormStateChange={setFormState}
          isEditing={isEditing}
        />
      )}
    </Slider>
  );
}
