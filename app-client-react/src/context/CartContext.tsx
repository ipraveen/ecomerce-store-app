import React, { createContext, useContext, useReducer } from 'react';
// import { faro } from '@/lib/faro';
import type { CartContextValue, CartItem } from '@/types';
import type { Product } from '@/types';

// ─── State ───────────────────────────────────────────────────────────────────

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

const initialState: CartState = {
  items: [],
  isOpen: false,
};

// ─── Actions ─────────────────────────────────────────────────────────────────

type CartAction =
  | { type: 'ADD_ITEM'; product: Product }
  | { type: 'REMOVE_ITEM'; productId: string }
  | { type: 'UPDATE_QUANTITY'; productId: string; quantity: number }
  | { type: 'CLEAR_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' };

// ─── Reducer ─────────────────────────────────────────────────────────────────

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find((i) => i.product.id === action.product.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.product.id === action.product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { product: action.product, quantity: 1 }],
      };
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((i) => i.product.id !== action.productId),
      };
    case 'UPDATE_QUANTITY': {
      if (action.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((i) => i.product.id !== action.productId),
        };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.product.id === action.productId
            ? { ...i, quantity: action.quantity }
            : i
        ),
      };
    }
    case 'CLEAR_CART':
      return { ...state, items: [] };
    case 'OPEN_CART':
      return { ...state, isOpen: true };
    case 'CLOSE_CART':
      return { ...state, isOpen: false };
    default:
      return state;
  }
}

// ─── Context ─────────────────────────────────────────────────────────────────

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = state.items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );

  function addItem(product: Product) {
    dispatch({ type: 'ADD_ITEM', product });
    // faro.api.pushEvent('cart_item_added', {
    //   product_id: product.id,
    //   product_name: product.name,
    //   price: String(product.price),
    //   quantity: '1',
    // });
  }

  function removeItem(productId: string) {
    const item = state.items.find((i) => i.product.id === productId);
    dispatch({ type: 'REMOVE_ITEM', productId });
    if (item) {
      // faro.api.pushEvent('cart_item_removed', {
      //   product_id: item.product.id,
      //   product_name: item.product.name,
      // });
    }
  }

  function updateQuantity(productId: string, quantity: number) {
    const item = state.items.find((i) => i.product.id === productId);
    if (item) {
      faro.api.pushEvent('cart_quantity_updated', {
        product_id: productId,
        old_quantity: String(item.quantity),
        new_quantity: String(quantity),
      });
    }
    dispatch({ type: 'UPDATE_QUANTITY', productId, quantity });
  }

  function clearCart() {
    faro.api.pushEvent('cart_cleared', {
      item_count: String(state.items.length),
    });
    dispatch({ type: 'CLEAR_CART' });
  }

  const value: CartContextValue = {
    items: state.items,
    totalItems,
    totalPrice,
    isOpen: state.isOpen,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    openCart: () => dispatch({ type: 'OPEN_CART' }),
    closeCart: () => dispatch({ type: 'CLOSE_CART' }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
