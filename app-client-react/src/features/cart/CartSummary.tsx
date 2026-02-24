import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/utils/format';

interface CartSummaryProps {
  compact?: boolean;
}

const SHIPPING_THRESHOLD_CENTS = 5000; // free shipping over $50
const SHIPPING_COST_CENTS = 799;
const TAX_RATE = 0.08;

export function CartSummary({ compact = false }: CartSummaryProps) {
  const { totalPrice, totalItems } = useCart();

  const shipping = totalPrice >= SHIPPING_THRESHOLD_CENTS ? 0 : SHIPPING_COST_CENTS;
  const tax = Math.round(totalPrice * TAX_RATE);
  const total = totalPrice + shipping + tax;

  if (compact) {
    return (
      <div className="space-y-1">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Subtotal ({totalItems} items)</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
        <div className="flex justify-between text-base font-semibold text-gray-900">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 rounded-xl p-6 space-y-3">
      <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
      <div className="flex justify-between text-sm text-gray-600">
        <span>Subtotal ({totalItems} items)</span>
        <span>{formatPrice(totalPrice)}</span>
      </div>
      <div className="flex justify-between text-sm text-gray-600">
        <span>Shipping</span>
        <span>
          {shipping === 0 ? (
            <span className="text-green-600 font-medium">Free</span>
          ) : (
            formatPrice(shipping)
          )}
        </span>
      </div>
      <div className="flex justify-between text-sm text-gray-600">
        <span>Estimated tax</span>
        <span>{formatPrice(tax)}</span>
      </div>
      {shipping > 0 && (
        <p className="text-xs text-blue-600">
          Add {formatPrice(SHIPPING_THRESHOLD_CENTS - totalPrice)} more for free shipping!
        </p>
      )}
      <div className="border-t border-gray-200 pt-3 flex justify-between font-semibold text-gray-900">
        <span>Total</span>
        <span>{formatPrice(total)}</span>
      </div>
    </div>
  );
}
