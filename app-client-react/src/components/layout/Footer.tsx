import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">ShopFront</h3>
            <p className="text-sm text-gray-500">
              A frontend observability playground built with React, TypeScript, and Grafana Faro.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  Cart
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Observability</h3>
            <p className="text-sm text-gray-500">
              Powered by Grafana Faro with OpenTelemetry tracing.
            </p>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400">
            © 2026 ShopFront Observability Playground. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
