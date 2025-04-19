import { useState, useEffect } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import ProductGrid from '../../components/ProductGrid';
import Banner from '../../components/Banner';
import { getCategories, getProductsByCategory } from '../../utils/api';

export default function CategoryPage({ category, products: initialProducts }) {
  const { t } = useTranslation('common');
  const router = useRouter();
  
  const [products, setProducts] = useState(initialProducts || []);
  const [loading, setLoading] = useState(false);
  const [sortOption, setSortOption] = useState('default');
  
  // Banner images for different categories
  const categoryBanners = {
    "electronics": "https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "jewelery": "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "men's clothing": "https://images.unsplash.com/photo-1558770147-a0e2842c5ea1",
    "women's clothing": "https://images.unsplash.com/photo-1558770147-68c0607adb26",
    "default": "https://images.unsplash.com/photo-1605902711622-cfb43c4437b5",
  };
  
  const getBannerImage = (category) => {
    return categoryBanners[category] || categoryBanners.default;
  };
  
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
  
  // Format category name for display
  const formatCategoryName = (category) => {
    return category
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  // Handle sort change
  const handleSortChange = (e) => {
    const option = e.target.value;
    setSortOption(option);
    
    let sortedProducts = [...products];
    
    switch (option) {
      case 'price-low':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sortedProducts.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      case 'name-az':
        sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-za':
        sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        // Default sorting (by id)
        sortedProducts.sort((a, b) => a.id - b.id);
        break;
    }
    
    setProducts(sortedProducts);
  };
  
  // Load products if not available initially
  useEffect(() => {
    if (!initialProducts || initialProducts.length === 0) {
      const loadProducts = async () => {
        setLoading(true);
        try {
          const data = await getProductsByCategory(category);
          setProducts(data);
        } catch (error) {
          console.error('Error loading products:', error);
        } finally {
          setLoading(false);
        }
      };
      
      loadProducts();
    }
  }, [category, initialProducts]);
  
  return (
    <>
      <Head>
        <title>{formatCategoryName(category)} | {t('siteTitle')}</title>
        <meta name="description" content={`Browse our collection of ${category} products`} />
      </Head>
      
      {/* Category Banner */}
      <Banner
        image={getBannerImage(category)}
        title={formatCategoryName(category)}
        subtitle={`Discover our ${category} collection`}
        height="md"
        overlay={true}
      />
      
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
              <a href="/categories" className="text-neutral hover:text-primary">
                {t('categories')}
              </a>
              <span className="mx-2">/</span>
            </li>
            <li className="text-neutral-dark font-medium">
              {formatCategoryName(category)}
            </li>
          </ol>
        </nav>
        
        {/* Filters and Sorting */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">{formatCategoryName(category)}</h1>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <label htmlFor="sort" className="mr-2 text-sm font-medium">
                {t('sort')}:
              </label>
              <select
                id="sort"
                value={sortOption}
                onChange={handleSortChange}
                className="rounded-md border border-neutral-light bg-white px-3 py-1.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="default">Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
                <option value="name-az">Name: A-Z</option>
                <option value="name-za">Name: Z-A</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Products Grid */}
        <ProductGrid products={products} loading={loading} />
        
        {/* Empty State */}
        {!loading && products.length === 0 && (
          <div className="my-16 text-center">
            <h2 className="mb-4 text-xl font-semibold">No products found in this category</h2>
            <p className="mb-8 text-neutral">Try checking out our other categories or come back later for new arrivals.</p>
            <a href="/" className="btn-primary">
              Back to Home
            </a>
          </div>
        )}
        
        {/* Category Info */}
        <div className="mt-16">
          <h2 className="mb-4 text-xl font-semibold">{t('about')} {formatCategoryName(category)}</h2>
          
          <div className="prose max-w-none dark:prose-invert">
            <p>
              Explore our collection of premium {category} products. We offer a wide range of high-quality items
              to suit your needs. Our products are carefully selected to ensure durability and excellent performance.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

// Set layout for this page
CategoryPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// Generate static paths for all categories
export async function getStaticPaths() {
  try {
    const categories = await getCategories();
    
    const paths = categories.map(category => ({
      params: { category },
      locale: 'en',
    }));
    
    // Also generate French versions
    const frPaths = categories.map(category => ({
      params: { category },
      locale: 'am',
    }));
    
    return {
      paths: [...paths, ...frPaths],
      fallback: true, // Generate remaining pages on-demand
    };
  } catch (error) {
    console.error('Error generating category paths:', error);
    return {
      paths: [],
      fallback: true,
    };
  }
}

// Get static props for this page
export async function getStaticProps({ params, locale }) {
  try {
    const { category } = params;
    
    // Get products for this category
    const products = await getProductsByCategory(category);
    
    // If no products found for category, return 404
    if (!products || products.length === 0) {
      return {
        notFound: true,
      };
    }
    
    return {
      props: {
        category,
        products,
        ...(await serverSideTranslations(locale, ['common'])),
      },
      // Revalidate the page every hour
      revalidate: 3600,
    };
  } catch (error) {
    console.error(`Error fetching products for category ${params.category}:`, error);
    
    return {
      notFound: true,
    };
  }
}
