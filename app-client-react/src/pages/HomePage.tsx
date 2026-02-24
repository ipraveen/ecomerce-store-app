import { useFaroPageview } from '@/hooks/useFaroPageview';
import { PageProfiler } from '@/components/observability/PageProfiler';
// import { HeroSection } from '@/features/home/HeroSection';
import { FeaturedProducts } from '@/features/home/FeaturedProducts';
import { TrendingProducts } from '@/features/home/TrendingProducts';

export function HomePage() {
    useFaroPageview('home');

    return (
        <PageProfiler name="HomePage">
            {/* <HeroSection /> */}
            <FeaturedProducts />
            <TrendingProducts />
        </PageProfiler>
    );
}
