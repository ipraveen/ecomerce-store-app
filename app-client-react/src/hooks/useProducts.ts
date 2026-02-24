import { useMemo } from 'react';
import { products } from '@/data/products';
import type { Product, ProductCategory } from '@/types';

export type SortOption = 'price-asc' | 'price-desc' | 'rating' | 'name';

export interface ProductFilters {
  category?: ProductCategory;
  search?: string;
  sort?: SortOption;
  featured?: boolean;
  trending?: boolean;
}

export function useProducts(filters: ProductFilters = {}): Product[] {
  return useMemo(() => {
    let result = [...products];

    if (filters.category) {
      result = result.filter((p) => p.category === filters.category);
    }

    if (filters.featured) {
      result = result.filter((p) => p.isFeatured);
    }

    if (filters.trending) {
      result = result.filter((p) => p.isTrending);
    }

    if (filters.search) {
      const query = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.tags.some((t) => t.includes(query))
      );
    }

    switch (filters.sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [filters.category, filters.search, filters.sort, filters.featured, filters.trending]);
}
