import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
// import { faro } from '@/lib/faro';
// import { useFaroPageview } from '@/hooks/useFaroPageview';
import { useProduct } from '@/hooks/useProduct';
import { PageProfiler } from '@/components/observability/PageProfiler';
import { ProductDetail } from '@/features/products/ProductDetail';

export function ProductDetailPage() {
  // useFaroPageview('product_detail');
  const { id } = useParams<{ id: string }>();
  const product = useProduct(id);

  useEffect(() => {
    if (product) {
      // faro.api.pushEvent('product_viewed', {
      //   product_id: product.id,
      //   product_name: product.name,
      //   category: product.category,
      // });
    }
  }, [product]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
        <p className="text-gray-500 mb-8">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
        >
          ← Back to Products
        </Link>
      </div>
    );
  }

  return (
    <PageProfiler name="ProductDetailPage">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-gray-700">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-gray-700">Products</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium truncate">{product.name}</span>
        </nav>
      </div>
      <ProductDetail product={product} />
    </PageProfiler>
  );
}
