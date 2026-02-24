import { useMemo } from 'react';
import { products } from '@/data/products';
import type { Product } from '@/types';

export function useProduct(id: string | undefined): Product | undefined {
  return useMemo(() => {
    if (!id) return undefined;
    return products.find((p) => p.id === id);
  }, [id]);
}
