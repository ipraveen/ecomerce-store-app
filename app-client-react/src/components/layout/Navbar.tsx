import { Link, NavLink } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import Logo from '../../assets/Logo';
import CartIcon from '@/assets/CartIcon';

export function Navbar() {
  const { totalItems, openCart } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Logo />
            <span className="text-lg font-bold text-gray-900">ShopFront</span>
          </Link>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-6">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
                }`
              }
            >
              Products
            </NavLink>
          </div>

          {/* Cart button */}
          <button
            onClick={openCart}
            className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label={`Open cart, ${totalItems} items`}
          >
           <CartIcon />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}
