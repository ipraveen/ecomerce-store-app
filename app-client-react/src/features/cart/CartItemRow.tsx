import { useCart } from '@/context/CartContext';
import { QuantitySelector } from '@/components/ui/QuantitySelector';
import { formatPrice } from '@/utils/format';
import type { CartItem } from '@/types';

interface CartItemRowProps {
  item: CartItem;
}

export function CartItemRow({ item }: CartItemRowProps) {
  const { removeItem, updateQuantity } = useCart();
  const { product, quantity } = item;

  return (
    <li className="flex gap-4 py-4">
      <img
        src={product.images[0]}
        alt={product.name}
        className="w-16 h-16 rounded-lg object-cover bg-gray-100 flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
        <p className="text-sm text-gray-500 capitalize">{product.category}</p>
        <p className="text-sm font-semibold text-gray-900 mt-1">
          {formatPrice(product.price * quantity)}
        </p>
      </div>
      <div className="flex flex-col items-end gap-2 flex-shrink-0">
        <button
          onClick={() => removeItem(product.id)}
          className="text-gray-400 hover:text-red-500 transition-colors"
          aria-label={`Remove ${product.name}`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <QuantitySelector
          value={quantity}
          max={product.stock}
          onChange={(qty) => updateQuantity(product.id, qty)}
        />
      </div>
    </li>
  );
}
