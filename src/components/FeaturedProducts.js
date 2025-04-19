import { useTranslation } from 'next-i18next';
import ProductCard from './ProductCard';

export default function FeaturedProducts({ products = [] }) {
  const { t } = useTranslation('common');
  
  // If no products or too few, show placeholder
  if (!products || products.length < 4) {
    return (
      <div className="text-center">
        <p className="text-neutral">{t('noFeaturedProducts')}</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
