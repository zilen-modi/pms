"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { CreateProductSchema } from "@/schemas/product.schema";
import type { CreateProduct } from "@/schemas/product.schema";
import { IProduct } from "@/types";
import { Input, Chip, Textarea } from "@/components";

interface ProductFormProps {
  product?: IProduct;
  onSubmit: (data: CreateProduct) => void;
  isOpen?: boolean;
  formId?: string;
  onFormStateChange?: (formState: {
    isValid: boolean;
    isDirty: boolean;
  }) => void;
}

export function ProductForm({
  product,
  onSubmit,
  isOpen,
  formId = "product-form",
  onFormStateChange,
}: ProductFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<CreateProduct>({
    resolver: zodResolver(CreateProductSchema),
    defaultValues: {
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price || 0,
      status: product?.status || "active",
      tags: product?.tags || [],
      imageUrl: product?.imageUrl || "",
    },
  });

  // Reset form when product changes (for duplicate functionality)
  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  // Notify parent of form state changes
  useEffect(() => {
    if (onFormStateChange) {
      onFormStateChange({ isValid, isDirty });
    }
  }, [isValid, isDirty, onFormStateChange]);

  const watchedTags = watch("tags") || [];

  const addTag = (tag: string) => {
    if (tag && !watchedTags.includes(tag)) {
      setValue("tags", [...watchedTags, tag], { shouldDirty: true });
    }
  };

  const removeTag = (tagToRemove: string) => {
    setValue(
      "tags",
      watchedTags.filter((tag) => tag !== tagToRemove),
      { shouldDirty: true }
    );
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const target = e.target as HTMLInputElement;
      addTag(target.value.trim());
      target.value = "";
    }
  };

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        {...register("name")}
        label="Product Name"
        placeholder="Enter product name"
        error={errors.name?.message}
        required
      />

      <Textarea
        {...register("description")}
        label="Description"
        placeholder="Enter product description (optional)"
        error={errors.description?.message}
        rows={3}
      />

      <Input
        {...register("imageUrl")}
        type="url"
        label="Image URL"
        placeholder="https://example.com/image.jpg"
        error={errors.imageUrl?.message}
        leftIcon={
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        }
      />

      <Input
        {...register("price", { valueAsNumber: true })}
        type="number"
        step="0.01"
        min="0"
        label="Price"
        placeholder="0.00"
        error={errors.price?.message}
        leftIcon={
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
            />
          </svg>
        }
        required
      />

      <div>
        <label
          htmlFor="status"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Status <span className="text-red-500 ml-1">*</span>
        </label>
        <select
          {...register("status")}
          id="status"
          className="block w-full px-3 py-2 text-sm placeholder-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 border border-gray-300 rounded-md bg-white focus:ring-pink-500 focus:border-pink-500"
        >
          <option value="active">Active</option>
          <option value="archived">Archived</option>
        </select>
        {errors.status && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {errors.status.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tags
        </label>
        <div className="flex flex-wrap gap-2 mb-3">
          {watchedTags.map((tag, index) => (
            <Chip
              key={index}
              variant="primary"
              size="sm"
              onRemove={() => removeTag(tag)}
              removable
            >
              {tag}
            </Chip>
          ))}
        </div>
        <Input
          placeholder="Add a tag and press Enter"
          onKeyDown={handleTagKeyDown}
          rightIcon={
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              />
            </svg>
          }
        />
      </div>
    </form>
  );
}
