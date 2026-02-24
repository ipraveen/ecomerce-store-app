import { Link } from 'react-router-dom';
import { useProducts } from '@/hooks/useProducts';
import { ProductCard } from '@/features/products/ProductCard';

export function FeaturedProducts() {
    const featured = useProducts({ featured: true });

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
                    <p className="text-gray-500 mt-1">Hand-picked items for you</p>
                </div>
                <Link to="/products?featured=true" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    View all →
                </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {featured.slice(0, 4).map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
}
