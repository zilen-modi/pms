/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEditProduct, useDeleteProduct } from "@/hooks/use-products";
import { IProduct } from "@/types";
import { Button, Chip, Input, Textarea } from "@/components";
import { CreateProductSchema } from "@/schemas/product.schema";
import type { CreateProduct } from "@/schemas/product.schema";

interface ProductCardProps {
  product: IProduct;
  onDuplicate?: (product: IProduct) => void;
}

export function ProductCard({ product, onDuplicate }: ProductCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const editProductMutation = useEditProduct();
  const deleteProductMutation = useDeleteProduct();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isDirty },
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
  const watchedPrice = watch("price");

  const handleSave = async (data: CreateProduct) => {
    const hasChanges =
      data.name !== product.name ||
      data.price !== product.price ||
      data.description !== (product.description || "") ||
      data.imageUrl !== (product.imageUrl || "") ||
      JSON.stringify(data.tags) !== JSON.stringify(product.tags);

    if (hasChanges) {
      try {
        await editProductMutation.mutateAsync({
          productDetails: {
            ...product,
            ...data,
          },
        });
      } catch (error) {
        console.error("Failed to update product:", error);
        reset({
          name: product.name,
          description: product.description || "",
          price: product.price,
          status: product.status,
          tags: product.tags || [],
          imageUrl: product.imageUrl || "",
        });
      }
    }
  };

  const handleCancel = () => {
    reset({
      name: product.name,
      description: product.description || "",
      price: product.price,
      status: product.status,
      tags: product.tags || [],
      imageUrl: product.imageUrl || "",
    });
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProductMutation.mutateAsync({ productId: product.id });
      } catch (error) {
        console.error("Failed to delete product:", error);
      }
    }
    setShowDropdown(false);
  };

  const handleDuplicate = () => {
    if (onDuplicate) {
      onDuplicate(product);
    }
    setShowDropdown(false);
  };

  const toggleStatus = async () => {
    const newStatus = product.status === "active" ? "archived" : "active";
    try {
      await editProductMutation.mutateAsync({
        productDetails: { ...product, status: newStatus },
      });
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const handlePriceBlur = async () => {
    const newPrice = watchedPrice;
    if (isNaN(newPrice) || newPrice < 0) {
      setValue("price", product.price);
      return;
    }

    if (newPrice !== product.price) {
      try {
        await editProductMutation.mutateAsync({
          productDetails: { ...product, price: newPrice },
        });
      } catch (error) {
        console.error("Failed to update price:", error);
        setValue("price", product.price);
      }
    }
  };

  const handlePriceKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    } else if (e.key === "Escape") {
      setValue("price", product.price);
      e.currentTarget.blur();
    }
  };

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
    <div className="bg-gray-50 rounded-2xl shadow-sm border border-gray-200 relative">
      {/* Product Header */}
      <div className="p-4 flex items-center justify-between relative bg-white">
        <div className="flex items-center space-x-4">
          {/* Product Image Placeholder */}
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                width={48}
                height={48}
                className="w-12 h-12 rounded-lg object-cover"
              />
            ) : (
              <svg
                className="w-6 h-6 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z"
                />
              </svg>
            )}
          </div>

          {/* Product Info */}
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900">
              {product.name}
            </h3>

            {/* Tags Display - Non-removable in header */}
            <div className="mt-2">
              {product.tags.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <Chip
                      key={index}
                      variant="secondary"
                      size="md"
                      className="bg-pink-50 text-pink-700 px-3 py-1.5"
                    >
                      {tag}
                    </Chip>
                  ))}
                </div>
              ) : (
                <div className="text-xs text-gray-400">No tags assigned</div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Price Input Field */}
          <div className="w-44 mr-10">
            <Input
              {...register("price", { valueAsNumber: true })}
              type="number"
              onBlur={handlePriceBlur}
              onKeyDown={handlePriceKeyDown}
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
              step="0.01"
              min="0"
              placeholder="0.00"
              className="text-left"
            />
          </div>

          {/* Status Toggle */}
          <div className="flex items-center space-x-2 w-28">
            <span
              className={`text-sm font-medium ${
                product.status === "active" ? "text-gray-900" : "text-gray-500"
              }`}
            >
              {product.status === "active" ? "Active" : "Archived"}
            </span>
            <button
              onClick={toggleStatus}
              disabled={editProductMutation.isPending}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 ${
                product.status === "active" ? "bg-pink-600" : "bg-gray-200"
              } ${
                editProductMutation.isPending
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  product.status === "active"
                    ? "translate-x-5"
                    : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Actions Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="p-2 text-gray-400 hover:text-gray-600 focus:outline-none rounded-full hover:bg-gray-100"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-[60]">
                <div className="py-2">
                  <button
                    onClick={handleDuplicate}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                  >
                    Duplicate Product
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={deleteProductMutation.isPending}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-red-600 disabled:opacity-50 transition-colors"
                  >
                    {deleteProductMutation.isPending
                      ? "Deleting..."
                      : "Delete Product"}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Expand/Collapse Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            <svg
              className={`w-5 h-5 transform transition-transform ${
                isExpanded ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Expanded Content - Name, Description, Price, Image URL, and Tags */}
      {isExpanded && (
        <div className="border-t border-gray-200 p-6 bg-white">
          <form onSubmit={handleSubmit(handleSave)} className="space-y-6">
            {/* Name Field */}
            <div>
              <Input
                {...register("name")}
                label="Name"
                error={errors.name?.message}
                required
              />
            </div>

            {/* Description Field */}
            <div>
              <Textarea
                {...register("description")}
                label="Description"
                rows={3}
                placeholder="Enter product description..."
                error={errors.description?.message}
              />
            </div>

            {/* Price Field */}
            <div>
              <Input
                {...register("price", { valueAsNumber: true })}
                label="Price"
                type="number"
                step="0.01"
                min="0"
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
                error={errors.price?.message}
                required
              />
            </div>

            {/* Image URL Field */}
            <div>
              <Input
                {...register("imageUrl")}
                type="url"
                label="Image URL"
                placeholder="https://example.com/image.jpg"
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
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2v12a2 2 0 002 2z"
                    />
                  </svg>
                }
                error={errors.imageUrl?.message}
              />
            </div>

            {/* Tags Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tags
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {watchedTags.map((tag, index) => (
                  <Chip
                    key={index}
                    variant="secondary"
                    size="sm"
                    onRemove={() => removeTag(tag)}
                    removable
                    className="bg-pink-50 text-pink-700"
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

            {/* Save/Cancel Buttons */}
            <div className="flex justify-end space-x-3 pt-6 mt-6 border-t border-gray-200">
              <Button variant="outline" onClick={handleCancel} type="button">
                Cancel
              </Button>
              <Button
                variant="primary"
                type="submit"
                isLoading={editProductMutation.isPending}
                disabled={!isDirty}
                className="bg-pink-600 hover:bg-pink-700 focus:ring-pink-500"
              >
                Save
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Click outside to close dropdown */}
      {showDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  );
}
