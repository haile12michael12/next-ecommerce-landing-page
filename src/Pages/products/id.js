import { useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import ProductCard from '../../components/ProductCard';
import { useStateContext } from '../../Contexts/StateContext';
import { getProductById, getProducts } from '../../utils/api';

export default function ProductDetail({ product, relatedProducts }) {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { addToCart, formatPrice } = useStateContext();
  
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  
  // If the page is not yet generated, show loading state
  if (router.isFallback) {
    return (
      <Layout>
        <div className="container-custom my-12 flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-neutral-light border-t-primary"></div>
            <p>{t('loading')}</p>
          </div>
        </div>
      </Layout>
    );
  }
  
  // If product is not found
  if (!product) {
    return (
      <Layout>
        <div className="container-custom my-12 flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <h1 className="mb-4 text-3xl font-bold">Product Not Found</h1>
            <p className="mb-6">The product you are looking for might have been removed or is temporarily unavailable.</p>
            <button
              onClick={() => router.push('/')}
              className="btn-primary"
            >
              Return to Home
            </button>
          </div>
        </div>
      </Layout>
    );
  }
  
  // Handle quantity changes
  const handleQuantityChange = (value) => {
    if (value < 1) return;
    setQuantity(value);
  };
  
  // Handle add to cart
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  return (
    <>
      <Head>
        <title>{product.title} | {t('siteTitle')}</title>
        <meta name="description" content={product.description.substring(0, 160)} />
      </Head>
      
      <div className="container-custom my-12">
        {/* Breadcrumbs */}
        <nav className="mb-8">
          <ol className="flex flex-wrap items-center text-sm">
            <li className="flex items-center">
              <a href="/" className="text-neutral hover:text-primary">
                {t('home')}
              </a>
              <span className="mx-2">/</span>
            </li>
            <li className="flex items-center">
              <a href={`/categories/${product.category}`} className="text-neutral hover:text-primary">
                {t(product.category.replace(/\s+/g, ''))}
              </a>
              <span className="mx-2">/</span>
            </li>
            <li className="text-neutral-dark font-medium">
              {product.title}
            </li>
          </ol>
        </nav>
        
        {/* Product Details */}
        <div className="grid gap-12 md:grid-cols-2">
          {/* Product Image */}
          <div className="relative overflow-hidden rounded-lg bg-white p-8">
            <div className="relative aspect-square w-full">
              <Image
                src={product.image}
                alt={product.title}
                fill
                style={{ objectFit: 'contain' }}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
          
          {/* Product Info */}
          <div>
            <h1 className="mb-4 text-3xl font-bold">{product.title}</h1>
            
            <div className="mb-6">
              <span className="text-3xl font-bold text-primary">
                {formatPrice(product.price)}
              </span>
              
              {/* Rating */}
              <div className="mt-2 flex items-center">
                <div className="flex text-accent">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill={i < Math.floor(product.rating.rate) ? "currentColor" : "none"}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={i < Math.floor(product.rating.rate) ? "0" : "1.5"}
                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" 
                      />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-sm">
                  {product.rating.rate} ({product.rating.count} {t('reviews')})
                </span>
              </div>
            </div>
            
            {/* Short Description */}
            <p className="mb-8 text-neutral-dark">{product.description.substring(0, 150)}...</p>
            
            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="mb-2 block font-medium">{t('quantity')}</label>
              <div className="flex h-12 w-32 items-center overflow-hidden rounded-md border border-neutral-light">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="flex h-full w-12 items-center justify-center bg-neutral-lightest text-neutral-dark hover:bg-neutral-light"
                  disabled={quantity <= 1}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                  </svg>
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                  className="h-full w-full border-x border-neutral-light bg-white text-center text-neutral-dark focus:outline-none"
                />
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="flex h-full w-12 items-center justify-center bg-neutral-lightest text-neutral-dark hover:bg-neutral-light"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Add to Cart Button */}
            <div className="mb-8">
              <button
                onClick={handleAddToCart}
                className="btn-primary w-full py-3 text-base sm:w-auto"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mr-2 h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
                {t('addToCart')}
              </button>
            </div>
            
            {/* Category Badge */}
            <div className="mb-4">
              <span className="badge bg-neutral-light text-neutral-dark">
                {t(product.category.replace(/\s+/g, ''))}
              </span>
            </div>
          </div>
        </div>
        
        {/* Product Tabs */}
        <div className="mt-16">
          <div className="mb-8 border-b border-neutral-light">
            <div className="flex overflow-x-auto">
              <button
                onClick={() => setActiveTab('description')}
                className={`whitespace-nowrap px-6 py-3 text-sm font-medium ${activeTab === 'description' ? 'border-b-2 border-primary text-primary' : 'text-neutral-dark'}`}
              >
                {t('description')}
              </button>
              <button
                onClick={() => setActiveTab('specifications')}
                className={`whitespace-nowrap px-6 py-3 text-sm font-medium ${activeTab === 'specifications' ? 'border-b-2 border-primary text-primary' : 'text-neutral-dark'}`}
              >
                {t('specifications')}
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`whitespace-nowrap px-6 py-3 text-sm font-medium ${activeTab === 'reviews' ? 'border-b-2 border-primary text-primary' : 'text-neutral-dark'}`}
              >
                {t('reviews')} ({product.rating.count})
              </button>
            </div>
          </div>
          
          <div className="min-h-[300px]">
            {activeTab === 'description' && (
              <div className="prose max-w-none dark:prose-invert">
                <p>{product.description}</p>
              </div>
            )}
            
            {activeTab === 'specifications' && (
              <div>
                <h3 className="mb-4 text-xl font-semibold">{t('specifications')}</h3>
                <div className="overflow-hidden rounded-lg border border-neutral-light">
                  <table className="w-full border-collapse">
                    <tbody>
                      <tr className="border-b border-neutral-light">
                        <td className="bg-neutral-lightest px-4 py-3 font-medium">ID</td>
                        <td className="px-4 py-3">{product.id}</td>
                      </tr>
                      <tr className="border-b border-neutral-light">
                        <td className="bg-neutral-lightest px-4 py-3 font-medium">{t('category')}</td>
                        <td className="px-4 py-3">{product.category}</td>
                      </tr>
                      <tr className="border-b border-neutral-light">
                        <td className="bg-neutral-lightest px-4 py-3 font-medium">{t('price')}</td>
                        <td className="px-4 py-3">{formatPrice(product.price)}</td>
                      </tr>
                      <tr>
                        <td className="bg-neutral-lightest px-4 py-3 font-medium">{t('rating')}</td>
                        <td className="px-4 py-3">{product.rating.rate} / 5</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div>
                <h3 className="mb-4 text-xl font-semibold">{t('reviews')}</h3>
                <div className="mb-4 flex items-center">
                  <div className="flex text-accent">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i} 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        fill={i < Math.floor(product.rating.rate) ? "currentColor" : "none"}
                        stroke="currentColor"
                        className="h-5 w-5"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={i < Math.floor(product.rating.rate) ? "0" : "1.5"}
                          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" 
                        />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2">
                    {product.rating.rate} ({product.rating.count} {t('reviews')})
                  </span>
                </div>
                
                <p className="text-neutral">
                  This product has {product.rating.count} reviews with an average rating of {product.rating.rate} out of 5 stars.
                </p>
              </div>
            )}
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts && relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-8 text-2xl font-bold">{t('relatedProducts')}</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// Set layout for this page
ProductDetail.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// Generate static paths for popular products
export async function getStaticPaths() {
  try {
    const products = await getProducts(10); // Pre-render the top 10 products
    
    const paths = products.map(product => ({
      params: { id: product.id.toString() },
      locale: 'en',
    }));
    
    // Also generate French versions
    const frPaths = products.map(product => ({
      params: { id: product.id.toString() },
      locale: 'am',
    }));
    
    return {
      paths: [...paths, ...frPaths],
      fallback: true, // Generate remaining pages on-demand
    };
  } catch (error) {
    console.error('Error generating product paths:', error);
    return {
      paths: [],
      fallback: true,
    };
  }
}

// Get static props for this page
export async function getStaticProps({ params, locale }) {
  try {
    const productId = params.id;
    const product = await getProductById(productId);
    
    // If product not found, return 404
    if (!product) {
      return {
        notFound: true,
      };
    }
    
    // Get all products to find related ones
    const allProducts = await getProducts();
    
    // Filter related products by category
    const relatedProducts = allProducts
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
    
    return {
      props: {
        product,
        relatedProducts,
        ...(await serverSideTranslations(locale, ['common'])),
      },
      // Revalidate the page every 24 hours
      revalidate: 86400,
    };
  } catch (error) {
    console.error(`Error fetching product ${params.id}:`, error);
    
    return {
      notFound: true,
    };
  }
}
