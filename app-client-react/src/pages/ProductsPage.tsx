import { useState } from 'react';
// import { useFaroPageview } from '@/hooks/useFaroPageview';
import { useProducts } from '@/hooks/useProducts';
import { PageProfiler } from '@/components/observability/PageProfiler';
import { ProductFilters } from '@/features/products/ProductFilters';
import { ProductGrid } from '@/features/products/ProductGrid';
import type { ProductCategory } from '@/types';
import type { SortOption } from '@/hooks/useProducts';

export function ProductsPage() {
  // useFaroPageview('products');

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<ProductCategory | ''>('');
  const [sort, setSort] = useState<SortOption | ''>('');

  const products = useProducts({
    search: search || undefined,
    category: category || undefined,
    sort: sort || undefined,
  });

  return (
    <PageProfiler name="ProductsPage">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">All Products</h1>
          <p className="text-gray-500 mt-1">{products.length} products found</p>
        </div>

        <div className="space-y-6">
          <ProductFilters
            search={search}
            category={category}
            sort={sort}
            onSearch={setSearch}
            onCategory={setCategory}
            onSort={setSort}
          />
          <ProductGrid products={products} />
        </div>
      </div>
    </PageProfiler>
  );
}
