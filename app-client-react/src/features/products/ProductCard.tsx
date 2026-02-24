import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { StarRating } from '@/components/ui/StarRating';
import { Badge } from '@/components/ui/Badge';
import { formatPrice } from '@/utils/format';
import type { Product } from '@/types';

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const { addItem, openCart } = useCart();

    function handleAddToCart(e: React.MouseEvent) {
        e.preventDefault();
        addItem(product);
        openCart();
    }

    return (
        <Link
            to={`/products/${product.id}`}
            className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md hover:border-gray-300 transition-all duration-200 flex flex-col"
        >
            {/* Image */}
            <div className="relative aspect-square overflow-hidden bg-gray-100">
                <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.isTrending && (
                    <div className="absolute top-2 left-2">
                        <Badge variant="warning">Trending</Badge>
                    </div>
                )}
                {product.stock <= 5 && product.stock > 0 && (
                    <div className="absolute top-2 right-2">
                        <Badge variant="danger">Low Stock</Badge>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-1">
                <p className="text-xs text-gray-400 capitalize mb-1">{product.category}</p>
                <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-2 flex-1">{product.name}</h3>
                <StarRating rating={product.rating} reviewCount={product.reviewCount} size="sm" />
                <div className="flex items-center justify-between mt-3">
                    <span className="text-base font-bold text-gray-900">{formatPrice(product.price)}</span>
                    <button
                        onClick={handleAddToCart}
                        disabled={product.stock === 0}
                        className="text-xs font-medium px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                    </button>
                </div>
            </div>
        </Link>
    );
}
