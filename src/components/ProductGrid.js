import { useTranslation } from 'next-i18next';
import ProductCard from '../components/ProductCard';

export default function ProductGrid({ products, loading = false }) {
  const { t } = useTranslation('common');
  
  // Loading state
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="relative overflow-hidden rounded-lg bg-white shadow-sm dark:bg-neutral-dark">
            <div className="relative aspect-[3/4] w-full animate-pulse bg-neutral-light dark:bg-neutral"></div>
            <div className="p-4">
              <div className="mb-1 h-3 w-16 animate-pulse rounded bg-neutral-light dark:bg-neutral"></div>
              <div className="mb-2 h-5 w-full animate-pulse rounded bg-neutral-light dark:bg-neutral"></div>
              <div className="flex items-center justify-between">
                <div className="h-6 w-20 animate-pulse rounded bg-neutral-light dark:bg-neutral"></div>
                <div className="h-4 w-10 animate-pulse rounded bg-neutral-light dark:bg-neutral"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  // Empty state
  if (!loading && (!products || products.length === 0)) {
    return (
      <div className="my-12 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mx-auto mb-4 h-16 w-16 text-neutral-light">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
        </svg>
        <h2 className="mb-2 text-xl font-semibold">{t('noProducts')}</h2>
        <p className="text-neutral">{t('tryAgainLater')}</p>
      </div>
    );
  }
  
  // Product grid
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
