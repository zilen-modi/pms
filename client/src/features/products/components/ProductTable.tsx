/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
  SortingState,
  ColumnFiltersState,
  PaginationState,
} from "@tanstack/react-table";
import { IProduct } from "@/types";
import { Button, Chip } from "@/components";
import { useEditProduct } from "@/hooks/use-products";

interface ProductTableProps {
  products: IProduct[];
  onDuplicate?: (product: IProduct) => void;
  onEdit?: (product: IProduct) => void;
  onDelete?: (product: IProduct) => void;
}

const columnHelper = createColumnHelper<IProduct>();

export function ProductTable({ products, onDuplicate, onEdit, onDelete }: ProductTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const editProductMutation = useEditProduct();

  const toggleStatus = async (product: IProduct) => {
    const newStatus = product.status === "active" ? "archived" : "active";
    try {
      await editProductMutation.mutateAsync({
        productDetails: { ...product, status: newStatus },
      });
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const columns = [
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
            {info.row.original.imageUrl ? (
              <img
                src={info.row.original.imageUrl}
                alt={info.getValue()}
                className="w-10 h-10 rounded-lg object-cover"
              />
            ) : (
              <svg
                className="w-5 h-5 text-gray-400"
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
          <div>
            <div className="font-medium text-gray-900">{info.getValue()}</div>
            {info.row.original.description && (
              <div className="text-sm text-gray-500 max-w-xs truncate">
                {info.row.original.description}
              </div>
            )}
          </div>
        </div>
      ),
    }),
    columnHelper.accessor("price", {
      header: "Price",
      cell: (info) => (
        <span className="font-medium text-gray-900">
          ${info.getValue().toFixed(2)}
        </span>
      ),
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => {
        const status = info.getValue();
        return (
          <button
            onClick={() => toggleStatus(info.row.original)}
            className="focus:outline-none"
          >
            <Chip
              variant="secondary"
              className={`cursor-pointer hover:opacity-80 transition-opacity ${
                status === "active" ? "bg-pink-100 text-pink-800" : "bg-gray-100 text-gray-800"
              }`}
            >
              {status}
            </Chip>
          </button>
        );
      },
    }),
    columnHelper.accessor("tags", {
      header: "Tags",
      cell: (info) => (
        <div className="flex flex-wrap gap-1 max-w-xs">
          {info
            .getValue()
            .slice(0, 3)
            .map((tag) => (
              <Chip key={tag} variant="secondary" size="sm" className="bg-pink-50 text-pink-700">
                {tag}
              </Chip>
            ))}
          {info.getValue().length > 3 && (
            <Chip variant="secondary" size="sm" className="bg-pink-50 text-pink-700">
              +{info.getValue().length - 3}
            </Chip>
          )}
        </div>
      ),
      enableSorting: false,
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: (info) => (
        <div className="flex items-center space-x-2">
          <Button
            variant="primary"
            size="sm"
            onClick={() => onEdit?.(info.row.original)}
            className="bg-pink-600 hover:bg-pink-700 focus:ring-pink-500"
          >
            Edit
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => onDuplicate?.(info.row.original)}
            className="bg-pink-600 hover:bg-pink-700 focus:ring-pink-500"
          >
            Duplicate
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete?.(info.row.original)}
            className="text-pink-600 hover:text-pink-700 focus:ring-pink-500"
          >
            Delete
          </Button>
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data: products,
    columns,
    state: {
      sorting,
      columnFilters,
      rowSelection,
      pagination,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    // Default sort by creation date if available
    initialState: {
      sorting: [{ id: "name", desc: false }],
    },
  });

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={
                          header.column.getCanSort()
                            ? "cursor-pointer select-none flex items-center space-x-1"
                            : ""
                        }
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        <span>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </span>
                        {header.column.getCanSort() && (
                          <span className="text-gray-400">
                            {{
                              asc: " ↑",
                              desc: " ↓",
                            }[header.column.getIsSorted() as string] ?? " ↕"}
                          </span>
                        )}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {products.length === 0 ? (
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
            Get started by creating a new product.
          </p>
        </div>
      ) : (
        <div className="px-6 py-4 flex items-center justify-end border-t border-gray-200 bg-gray-50">
          <div className="w-full flex justify-end sm:hidden">
            <Button
              variant="outline"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="text-pink-600 mr-2 text-base font-medium"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="text-pink-600 text-base font-medium"
            >
              Next
            </Button>
          </div>
          
          <div className="hidden sm:flex sm:items-center sm:justify-end w-full">
            <div className="flex items-center gap-x-4 mr-4">
              <label className="text-base font-medium text-gray-700 flex items-center">
                <span className="mr-2">Show</span>
                <select
                  value={table.getState().pagination.pageSize}
                  onChange={e => {
                    table.setPageSize(Number(e.target.value))
                  }}
                  className="px-3 py-1.5 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                >
                  {[5, 10, 20].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                      {pageSize}
                    </option>
                  ))}
                </select>
              </label>
              
              <span className="text-base font-medium text-gray-700">
                Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
              </span>
            </div>
            
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
                className="px-3 py-1.5 text-base font-medium text-pink-600 min-w-[40px]"
              >
                {"<<"}
              </Button>
              <Button
                variant="outline"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="px-3 py-1.5 text-base font-medium text-pink-600 min-w-[40px]"
              >
                {"<"}
              </Button>
              <Button
                variant="outline"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="px-3 py-1.5 text-base font-medium text-pink-600 min-w-[40px]"
              >
                {">"}
              </Button>
              <Button
                variant="outline"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
                className="px-3 py-1.5 text-base font-medium text-pink-600 min-w-[40px]"
              >
                {">>"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
