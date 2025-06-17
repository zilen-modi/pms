"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { ProductSlider } from "../components/ProductSlider";
import { useAddProduct, useGetProducts, useEditProduct, useDeleteProduct } from "@/hooks/use-products";
import { useViewPreference } from "@/hooks/use-view-preference";
import { Button, Input } from "@/components";
import type { CreateProduct } from "@/schemas/product.schema";
import { IProduct } from "@/types";
import { ProductCard } from "@/features/products/components/ProductCard";
import { ProductTable } from "@/features/products/components/ProductTable";
import { ViewToggle } from "@/features/products/components/ViewToggle";

export function ProductsPage() {
  const searchParams = useSearchParams();
  const initialSearchQuery = searchParams.get("search") || "";
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [isProductSliderOpen, setIsProductSliderOpen] = useState(false);
  const [sliderMode, setSliderMode] = useState<'add' | 'edit' | 'duplicate'>('add');
  const [selectedProduct, setSelectedProduct] = useState<IProduct | undefined>(undefined);

  const { data: products, isLoading } = useGetProducts();
  const addProductMutation = useAddProduct();
  const editProductMutation = useEditProduct();
  const deleteProductMutation = useDeleteProduct();
  const { viewType, setViewType } = useViewPreference();

  const filteredProducts = useMemo(() => {
    if (!products) return [];

    return products.filter((product) => {
      if (!searchQuery) return true;

      const query = searchQuery.toLowerCase();

      const matchesName = product.name.toLowerCase().includes(query);

      const matchesStatus = product.status.toLowerCase().includes(query);

      const matchesTags = product.tags.some((tag) =>
        tag.toLowerCase().includes(query)
      );

      return matchesName || matchesStatus || matchesTags;
    });
  }, [products, searchQuery]);

  const handleAddProduct = async (data: CreateProduct) => {
    try {
      if (sliderMode === 'edit') {
        await editProductMutation.mutateAsync({
          productDetails: data,
        });
      } else {
        // For both 'add' and 'duplicate', we create a new product
        await addProductMutation.mutateAsync({
          productDetails: data,
        });
      }
      closeSlider();
    } catch (error) {
      console.error(`Failed to ${sliderMode} product:`, error);
    }
  };

  const handleDuplicate = (product: IProduct) => {
    setSliderMode('duplicate');
    setSelectedProduct(product);
    setIsProductSliderOpen(true);
  };

  const handleNewProduct = () => {
    setSliderMode('add');
    setSelectedProduct(undefined);
    setIsProductSliderOpen(true);
  };

  const handleEdit = (product: IProduct) => {
    setSliderMode('edit');
    setSelectedProduct(product);
    setIsProductSliderOpen(true);
  };

  const closeSlider = () => {
    setIsProductSliderOpen(false);
    setSelectedProduct(undefined);
  };

  const handleDelete = async (product: IProduct) => {
    if (window.confirm(`Are you sure you want to delete "${product.name}"? This action cannot be undone.`)) {
      try {
        await deleteProductMutation.mutateAsync({
          productId: product.id,
        });
      } catch (error) {
        console.error("Failed to delete product:", error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-4">
      <div className="bg-gray-100 mb-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Products</h1>

          <div className="flex items-center space-x-4">
            <ViewToggle viewType={viewType} onViewChange={setViewType} />

            <div className="w-80">
              <Input
                type="text"
                placeholder="Search products by name, status, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                }
                rightIcon={
                  searchQuery ? (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  ) : undefined
                }
              />
            </div>

            <Button
              variant="primary"
              onClick={handleNewProduct}
              className="bg-pink-600 hover:bg-pink-700 focus:ring-pink-500"
            >
              New Product
            </Button>
          </div>
        </div>
      </div>

      <div>
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2M4 13h2"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No products found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchQuery
                ? "Try adjusting your search."
                : "Get started by creating a new product."}
            </p>
            {!searchQuery && (
              <div className="mt-6">
                <Button
                  variant="primary"
                  onClick={handleNewProduct}
                  className="bg-pink-600 hover:bg-pink-700 focus:ring-pink-500"
                >
                  Add Product
                </Button>
              </div>
            )}
          </div>
        ) : viewType === "table" ? (
          <ProductTable
            products={filteredProducts}
            onDuplicate={handleDuplicate}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ) : (
          <div className="space-y-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onDuplicate={handleDuplicate}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Slider (for both Add/Edit/Duplicate) */}
      <ProductSlider
        isOpen={isProductSliderOpen}
        onClose={closeSlider}
        onSubmit={handleAddProduct}
        isLoading={sliderMode === 'edit' ? editProductMutation.isPending : addProductMutation.isPending}
        product={selectedProduct}
        isEditing={sliderMode === 'edit'}
      />
    </div>
  );
}
