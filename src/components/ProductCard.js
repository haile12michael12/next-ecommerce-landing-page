import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useStateContext } from '../Contexts/StateContext';

export default function ProductCard({ product }) {
  const { t } = useTranslation('common');
  const { formatPrice, addToCart } = useStateContext();
  
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Handle quick add to cart
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };
  
  // Handle quick view (would open a modal in a real app)
  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Quick view functionality would go here
  };
  
  return (
    <Link 
      href={`/products/${product.id}`}
      className="group relative block overflow-hidden rounded-lg bg-white shadow-sm transition-all hover:shadow-md dark:bg-neutral-dark"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with Fixed Aspect Ratio */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-lightest p-4 dark:bg-neutral">
        {/* Product Image */}
        <Image
          src={product.image}
          alt={product.title}
          fill
          style={{ objectFit: 'contain' }}
          sizes="(max-width: 768px) 50vw, 33vw"
          priority={false}
          onLoadingComplete={() => setLoading(false)}
          className={`transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}
        />
        
        {/* Loading Indicator */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-light border-t-primary"></div>
          </div>
        )}
        
        {/* Action Buttons (visible on hover) */}
        <div 
          className={`absolute inset-x-0 bottom-4 flex justify-center space-x-2 transition-all duration-300 ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          <button
            onClick={handleQuickView}
            className="rounded-full bg-white p-2 text-neutral-dark shadow-md hover:bg-primary hover:text-white dark:bg-neutral-dark dark:text-white dark:hover:bg-primary"
            aria-label={t('quickView')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          
          <button
            onClick={handleAddToCart}
            className="rounded-full bg-primary p-2 text-white shadow-md hover:bg-primary-dark"
            aria-label={t('addToCart')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        {/* Category */}
        <div className="mb-1 text-xs font-medium uppercase text-neutral">
          {product.category}
        </div>
        
        {/* Product Title */}
        <h3 className="mb-2 truncate text-base font-medium group-hover:text-primary">
          {product.title}
        </h3>
        
        {/* Price */}
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary">
            {formatPrice(product.price)}
          </span>
          
          {/* Rating */}
          <div className="flex items-center text-accent">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
              <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
            </svg>
            <span className="ml-1 text-xs">{product.rating.rate}</span>
          </div>
        </div>
      </div>
      
      {/* Sale Badge */}
      {product.id % 3 === 0 && (
        <div className="absolute left-0 top-4 z-10 bg-secondary px-2 py-1 text-xs font-bold uppercase text-white">
          {t('sale')}
        </div>
      )}
      
      {/* New Badge */}
      {product.id % 5 === 0 && (
        <div className="absolute right-0 top-4 z-10 bg-primary px-2 py-1 text-xs font-bold uppercase text-white">
          {t('new')}
        </div>
      )}
    </Link>
  );
}
