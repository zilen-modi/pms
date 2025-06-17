"use client";

import { useState, useMemo } from "react";
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

  const { sliderTitle, buttonText, productToUse } = useMemo(() => {
    let title = "Add New Product";
    let text = "Create Product";
    let productData = product;
    
    if (isEditing && product) {
      title = "Edit Product";
      text = "Update Product";
    } else if (product) {
      title = "Duplicate Product";
      productData = {
        id: "",
        name: `${product.name} (Copy)`,
        description: product.description,
        price: product.price,
        status: product.status,
        tags: [...product.tags],
        imageUrl: product.imageUrl,
      };
    }
    
    return {
      sliderTitle: title,
      buttonText: text,
      productToUse: productData,
    };
  }, [product, isEditing]);

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
