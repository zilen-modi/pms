"use client";

import { Suspense } from "react";
import { ProductsPage } from "@/features/products/pages/ProductsPage";

function ProductsPageFallback() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
    </div>
  );
}

export default function ProductsPageRoute() {
  return (
    <Suspense fallback={<ProductsPageFallback />}>
      <ProductsPage />
    </Suspense>
  );
}
