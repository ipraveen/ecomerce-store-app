import { Link } from 'react-router-dom';

export function HeroSection() {
    return (
        <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-white" />
                <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-white" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
                <div className="max-w-2xl">
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                        Shop Smarter, <span className="text-blue-200">Live Better</span>
                    </h1>
                    <p className="text-lg text-blue-100 mb-8 leading-relaxed">
                        Discover premium products across electronics, clothing, home, sports, and books. Fast shipping,
                        easy returns, and a seamless checkout experience.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link
                            to="/products"
                            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium bg-white text-blue-700 rounded-lg hover:bg-blue-50 transition-colors"
                        >
                            Shop Now
                        </Link>
                        <Link
                            to="/products"
                            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white border-2 border-white/40 rounded-lg hover:border-white hover:bg-white/10 transition-colors"
                        >
                            Browse Electronics
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
