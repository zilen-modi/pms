"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Textarea, Chip } from "@/components";
import { Slider } from "@/components/Slider";
import { CreateProductSchema } from "@/schemas/product.schema";
import type { CreateProduct } from "@/schemas/product.schema";
import { IProduct } from "@/types";

interface EditProductSliderProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateProduct) => void;
  isLoading?: boolean;
  product: IProduct;
}

export function EditProductSlider({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
  product,
}: EditProductSliderProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CreateProduct>({
    resolver: zodResolver(CreateProductSchema),
    defaultValues: {
      name: product.name,
      description: product.description || "",
      price: product.price,
      status: product.status,
      tags: product.tags || [],
      imageUrl: product.imageUrl || "",
    },
  });

  const watchedTags = watch("tags") || [];

  // Reset form when product changes
  useEffect(() => {
    reset({
      name: product.name,
      description: product.description || "",
      price: product.price,
      status: product.status,
      tags: product.tags || [],
      imageUrl: product.imageUrl || "",
    });
  }, [product, reset]);

  const addTag = (tag: string) => {
    if (tag && !watchedTags.includes(tag)) {
      setValue("tags", [...watchedTags, tag]);
    }
  };

  const removeTag = (tagToRemove: string) => {
    setValue("tags", watchedTags.filter((tag) => tag !== tagToRemove));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const target = e.target as HTMLInputElement;
      addTag(target.value.trim());
      target.value = "";
    }
  };

  const onFormSubmit = (data: CreateProduct) => {
    // Include the product ID for the update
    onSubmit({ ...data, id: product.id } as CreateProduct);
  };

  return (
    <Slider isOpen={isOpen} onClose={onClose} title="Edit Product">
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        {/* Product Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Product Name *
          </label>
          <Input
            id="name"
            type="text"
            placeholder="Enter product name"
            {...register("name")}
            error={errors.name?.message}
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Description
          </label>
          <Textarea
            id="description"
            placeholder="Enter product description"
            rows={3}
            {...register("description")}
            error={errors.description?.message}
          />
        </div>

        {/* Price */}
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Price *
          </label>
          <Input
            id="price"
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            {...register("price", { valueAsNumber: true })}
            error={errors.price?.message}
            leftIcon={
              <span className="text-gray-500 text-sm font-medium">$</span>
            }
          />
        </div>

        {/* Status */}
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Status *
          </label>
          <select
            id="status"
            {...register("status")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
          >
            <option value="active">Active</option>
            <option value="archived">Archived</option>
          </select>
          {errors.status && (
            <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
          )}
        </div>

        {/* Image URL */}
        <div>
          <label
            htmlFor="imageUrl"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Image URL
          </label>
          <Input
            id="imageUrl"
            type="url"
            placeholder="https://example.com/image.jpg"
            {...register("imageUrl")}
            error={errors.imageUrl?.message}
          />
        </div>

        {/* Tags */}
        <div>
          <label
            htmlFor="tags"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Tags
          </label>
          <Input
            id="tags"
            type="text"
            placeholder="Add a tag and press Enter"
            onKeyDown={handleTagKeyDown}
          />
          {watchedTags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {watchedTags.map((tag) => (
                <Chip
                  key={tag}
                  variant="secondary"
                  className="group cursor-pointer"
                  onClick={() => removeTag(tag)}
                >
                  {tag}
                  <span className="ml-1 text-gray-400 group-hover:text-gray-600">
                    ×
                  </span>
                </Chip>
              ))}
            </div>
          )}
          {errors.tags && (
            <p className="mt-1 text-sm text-red-600">{errors.tags.message}</p>
          )}
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
            className="bg-pink-600 hover:bg-pink-700 focus:ring-pink-500"
          >
            Update Product
          </Button>
        </div>
      </form>
    </Slider>
  );
} 