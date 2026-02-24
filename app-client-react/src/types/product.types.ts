export type ProductCategory = 'electronics' | 'clothing' | 'home' | 'sports' | 'books';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;        // cents, e.g. 24999 = $249.99
  category: ProductCategory;
  rating: number;       // 0–5
  reviewCount: number;
  images: string[];     // placeholder URLs
  stock: number;
  tags: string[];
  isFeatured: boolean;
  isTrending: boolean;
}
