import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { StarRating } from '@/components/ui/StarRating';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { QuantitySelector } from '@/components/ui/QuantitySelector';
import { formatPrice } from '@/utils/format';
import type { Product } from '@/types';

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const { addItem, openCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  function handleAddToCart() {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    openCart();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                    i === selectedImage ? 'border-blue-500' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt={`${product.name} view ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge>{product.category}</Badge>
              {product.isTrending && <Badge variant="warning">Trending</Badge>}
              {product.isFeatured && <Badge variant="info">Featured</Badge>}
            </div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          </div>

          <StarRating rating={product.rating} reviewCount={product.reviewCount} />

          <div className="text-3xl font-bold text-gray-900">
            {formatPrice(product.price)}
          </div>

          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Stock status */}
          <div className="flex items-center gap-2">
            {product.stock === 0 ? (
              <span className="text-sm text-red-600 font-medium">Out of stock</span>
            ) : product.stock <= 5 ? (
              <span className="text-sm text-orange-600 font-medium">
                Only {product.stock} left in stock
              </span>
            ) : (
              <span className="text-sm text-green-600 font-medium">
                In stock ({product.stock} available)
              </span>
            )}
          </div>

          {/* Add to cart */}
          {product.stock > 0 && (
            <div className="flex items-center gap-4">
              <QuantitySelector
                value={quantity}
                max={product.stock}
                onChange={setQuantity}
              />
              <Button size="lg" onClick={handleAddToCart} className="flex-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Add to Cart
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
