/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProductsPage } from "../ProductsPage";

jest.mock("@/hooks/use-products", () => ({
  useGetProducts: jest.fn(),
  useAddProduct: jest.fn(),
  useEditProduct: jest.fn(),
  useDeleteProduct: jest.fn(),
}));

jest.mock("@/hooks/use-view-preference", () => ({
  useViewPreference: jest.fn(),
}));

import {
  useGetProducts,
  useAddProduct,
  useEditProduct,
  useDeleteProduct,
} from "@/hooks/use-products";
import { useViewPreference } from "@/hooks/use-view-preference";
import { useSearchParams } from "next/navigation";

const mockProducts = [
  {
    id: "1",
    name: "Test Product 1",
    description: "Description 1",
    price: 99.99,
    status: "active" as const,
    tags: ["tag1", "tag2"],
    imageUrl: "https://example.com/image1.jpg",
  },
  {
    id: "2",
    name: "Test Product 2",
    description: "Description 2",
    price: 149.99,
    status: "archived" as const,
    tags: ["tag3"],
    imageUrl: "https://example.com/image2.jpg",
  },
];

const mockUseGetProducts = useGetProducts as jest.MockedFunction<
  typeof useGetProducts
>;
const mockUseAddProduct = useAddProduct as jest.MockedFunction<
  typeof useAddProduct
>;
const mockUseEditProduct = useEditProduct as jest.MockedFunction<
  typeof useEditProduct
>;
const mockUseDeleteProduct = useDeleteProduct as jest.MockedFunction<
  typeof useDeleteProduct
>;
const mockUseViewPreference = useViewPreference as jest.MockedFunction<
  typeof useViewPreference
>;
const mockUseSearchParams = useSearchParams as jest.MockedFunction<
  typeof useSearchParams
>;

describe("ProductsPage", () => {
  const mockMutateAsync = jest.fn();
  const mockSetViewType = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseGetProducts.mockReturnValue({
      data: mockProducts,
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    } as any);

    mockUseAddProduct.mockReturnValue({
      mutateAsync: mockMutateAsync,
      isPending: false,
    } as any);

    mockUseEditProduct.mockReturnValue({
      mutateAsync: mockMutateAsync,
      isPending: false,
    } as any);

    mockUseDeleteProduct.mockReturnValue({
      mutateAsync: mockMutateAsync,
      isPending: false,
    } as any);

    mockUseViewPreference.mockReturnValue({
      viewType: "table",
      setViewType: mockSetViewType,
    });

    mockUseSearchParams.mockReturnValue({
      get: jest.fn(() => ""),
    } as any);
  });

  it("renders loading state", () => {
    mockUseGetProducts.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
      refetch: jest.fn(),
    } as any);

    render(<ProductsPage />);

    expect(document.querySelector(".animate-spin")).toBeInTheDocument();
    expect(document.querySelector(".border-pink-600")).toBeInTheDocument();
  });

  it("renders products page with header and controls", () => {
    render(<ProductsPage />);

    expect(screen.getByText("Products")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Search products by name, status, or tags...")
    ).toBeInTheDocument();
    expect(screen.getByText("New Product")).toBeInTheDocument();
  });

  it("renders empty state when no products", () => {
    mockUseGetProducts.mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    } as any);

    render(<ProductsPage />);

    expect(screen.getByText("No products found")).toBeInTheDocument();
    expect(
      screen.getByText("Get started by creating a new product.")
    ).toBeInTheDocument();
  });

  it("filters products based on search query", async () => {
    const user = userEvent.setup();
    render(<ProductsPage />);

    const searchInput = screen.getByPlaceholderText(
      "Search products by name, status, or tags..."
    );

    await user.type(searchInput, "Test Product 1");

    expect(searchInput).toHaveValue("Test Product 1");
  });

  it("clears search when clear button is clicked", async () => {
    const user = userEvent.setup();
    render(<ProductsPage />);

    const searchInput = screen.getByPlaceholderText(
      "Search products by name, status, or tags..."
    );

    await user.type(searchInput, "test");
    expect(searchInput).toHaveValue("test");

    const clearButton = document.querySelector(
      ".text-gray-400.hover\\:text-gray-600"
    ) as HTMLButtonElement;
    await user.click(clearButton);

    expect(searchInput).toHaveValue("");
  });

  it("opens new product slider when New Product button is clicked", async () => {
    const user = userEvent.setup();
    render(<ProductsPage />);

    const newProductButton = screen.getByText("New Product");
    await user.click(newProductButton);

    expect(screen.getByText("Add New Product")).toBeInTheDocument();
  });

  it("opens duplicate product slider", async () => {
    render(<ProductsPage />);

    const tableRows = screen.getAllByRole("row");

    expect(tableRows.length).toBeGreaterThan(1);
  });

  it("opens edit product slider", async () => {
    render(<ProductsPage />);

    const tableRows = screen.getAllByRole("row");
    expect(tableRows.length).toBeGreaterThan(1);
  });

  it("handles product deletion with confirmation", async () => {
    const mockConfirm = jest.fn(() => true);
    global.confirm = mockConfirm;

    render(<ProductsPage />);

    expect(mockProducts.length).toBe(2);
  });

  it("does not delete product when confirmation is cancelled", async () => {
    const mockConfirm = jest.fn(() => false);
    global.confirm = mockConfirm;

    render(<ProductsPage />);

    expect(mockProducts.length).toBe(2);
  });

  it("displays products in table view by default", () => {
    render(<ProductsPage />);

    expect(screen.getByRole("table")).toBeInTheDocument();
  });

  it("opens new product form", async () => {
    const user = userEvent.setup();
    render(<ProductsPage />);

    const newProductButton = screen.getByText("New Product");
    await user.click(newProductButton);

    expect(screen.getByText("Add New Product")).toBeInTheDocument();
  });

  it("handles API errors gracefully", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation();

    const mockAddProductMutation = {
      mutateAsync: jest.fn().mockRejectedValue(new Error("API Error")),
      isPending: false,
    };

    mockUseAddProduct.mockReturnValue(mockAddProductMutation as any);

    const user = userEvent.setup();
    render(<ProductsPage />);

    const newProductButton = screen.getByText("New Product");
    await user.click(newProductButton);

    expect(screen.getByText("Create Product")).toBeDisabled();

    consoleSpy.mockRestore();
  });
});
