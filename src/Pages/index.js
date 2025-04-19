import { useState, useEffect } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import Layout from '../components/Layout';
import Banner from '../components/Banner';
import CategorySection from '../components/CategorySection';
import FeaturedProducts from '../components/FeaturedProducts';
import ProductGrid from '../components/ProductGrid';
import { getProducts, getCategories } from '../utils/api';

export default function Home({ initialProducts, categories }) {
  const { t } = useTranslation('common');
  const [products, setProducts] = useState(initialProducts || []);
  const [loading, setLoading] = useState(false);
  
  // Banners data with stock photos
  const banners = [
    {
      id: 1,
      title: t('newArrivals'),
      subtitle: "Spring Collection 2023",
      buttonText: t('shopNow'),
      buttonLink: "/categories/clothing",
      imageUrl: "https://images.unsplash.com/photo-1558770147-a0e2842c5ea1",
      position: "right",
    },
    {
      id: 2,
      title: t('specialOffers'),
      subtitle: "Up to 50% Off Selected Electronics",
      buttonText: t('viewAll'),
      buttonLink: "/categories/electronics",
      imageUrl: "https://images.unsplash.com/photo-1605902711622-cfb43c4437b5",
      position: "left",
    },
  ];
  
  // Refresh products when language changes
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const freshProducts = await getProducts();
      setProducts(freshProducts);
      setLoading(false);
    };
    
    if (!initialProducts || initialProducts.length === 0) {
      loadProducts();
    }
  }, [initialProducts]);
  
  return (
    <>
      <Head>
        <title>{t('siteTitle')} - {t('tagline')}</title>
        <meta name="description" content={t('tagline')} />
      </Head>
      
      {/* Hero Banner */}
      <section className="mb-12">
        <div className="relative">
          <Banner
            image="https://images.unsplash.com/photo-1599658880436-c61792e70672"
            title={t('siteTitle')}
            subtitle={t('tagline')}
            buttonText={t('shopNow')}
            buttonLink="/products"
            overlay={true}
            height="lg"
          />
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="mb-16">
        <div className="container-custom">
          <h2 className="mb-8 text-center text-3xl font-bold">{t('categories')}</h2>
          <CategorySection categories={categories} />
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="mb-16 bg-neutral-lightest py-12 dark:bg-neutral-dark">
        <div className="container-custom">
          <h2 className="mb-8 text-center text-3xl font-bold">{t('featuredProducts')}</h2>
          <FeaturedProducts products={products.slice(0, 4)} />
        </div>
      </section>
      
      {/* Banner Row */}
      <section className="mb-16">
        <div className="container-custom grid gap-6 md:grid-cols-2">
          {banners.map(banner => (
            <Banner
              key={banner.id}
              image={banner.imageUrl}
              title={banner.title}
              subtitle={banner.subtitle}
              buttonText={banner.buttonText}
              buttonLink={banner.buttonLink}
              position={banner.position}
              height="sm"
            />
          ))}
        </div>
      </section>
      
      {/* New Arrivals */}
      <section className="mb-16">
        <div className="container-custom">
          <h2 className="mb-8 text-center text-3xl font-bold">{t('newArrivals')}</h2>
          <ProductGrid products={products.slice(0, 8)} loading={loading} />
          
          <div className="mt-8 text-center">
            <a href="/products" className="btn-primary">
              {t('viewAll')}
            </a>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="mb-16 bg-primary py-16 text-white">
        <div className="container-custom">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold">{t('subscribe')}</h2>
            <p className="mb-6">{t('newsletter')}</p>
            
            <form className="flex flex-col items-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <input
                type="email"
                placeholder={t('yourEmail')}
                className="w-full rounded-md border border-white bg-white/10 px-4 py-2 text-white placeholder-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white sm:w-72"
                required
              />
              <button type="submit" className="rounded-md bg-white px-6 py-2 font-medium text-primary transition-colors hover:bg-white/90">
                {t('subscribe')}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

// Set layout for this page
Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// Server-side props for initial data and translations
export async function getStaticProps({ locale }) {
  try {
    // Fetch initial products and categories
    const initialProducts = await getProducts();
    const categories = await getCategories();
    
    return {
      props: {
        initialProducts,
        categories,
        // Pass translations to the page
        ...(await serverSideTranslations(locale, ['common'])),
      },
      // Revalidate the data every hour
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Error fetching initial data:', error);
    
    return {
      props: {
        initialProducts: [],
        categories: [],
        ...(await serverSideTranslations(locale, ['common'])),
      },
      revalidate: 60, // Retry sooner if there was an error
    };
  }
}
