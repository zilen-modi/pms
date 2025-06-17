'use client'

import { QueryClientWrapper } from '@/providers/query-client-provider'
import { ProductsPage } from '@/features/products/pages/ProductsPage'

export default function ProductsPageRoute() {
  return (
    <QueryClientWrapper>
      <ProductsPage />
    </QueryClientWrapper>
  )
}