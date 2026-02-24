import type { Product } from './product.types';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartContextValue {
  items: CartItem[];
  totalItems: number;     // derived
  totalPrice: number;     // derived, cents
  isOpen: boolean;        // drawer open state
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}
