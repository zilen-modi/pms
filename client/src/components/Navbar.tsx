"use client";

import { useRouter, usePathname } from "next/navigation";

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const isProductsPage = pathname === "/products";

  return (
    <>
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div
              className="text-xl font-semibold text-gray-900 cursor-pointer"
              onClick={() => router.push("/")}
            >
              PMS
            </div>

            <div className="absolute left-1/2 transform -translate-x-1/2">
              <div className="flex space-x-1">
                <button
                  onClick={() => router.push("/products")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    isProductsPage
                      ? "bg-pink-100 text-pink-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  Products
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
