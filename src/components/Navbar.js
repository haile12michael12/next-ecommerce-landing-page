import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import CurrencySwitcher from './CurrencySwitcher';
import { useStateContext } from '../Contexts/StateContext';

export default function Navbar() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { totalQuantity, toggleCart } = useStateContext();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Handle scroll to add box shadow to navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };
  
  // Close mobile menu when route changes
  useEffect(() => {
    const handleRouteChange = () => {
      setIsMobileMenuOpen(false);
      setIsSearchOpen(false);
    };
    
    router.events.on('routeChangeStart', handleRouteChange);
    return () => router.events.off('routeChangeStart', handleRouteChange);
  }, [router.events]);
  
  return (
    <header 
      className={`sticky top-0 z-40 transition-shadow ${
        isScrolled ? 'bg-white shadow-md dark:bg-neutral-darkest dark:shadow-black/20' : 'bg-white dark:bg-neutral-darkest'
      }`}
    >
      {/* Top bar - Language and Currency Switchers */}
      <div className="border-b border-neutral-light py-2 dark:border-neutral-dark">
        <div className="container-custom flex items-center justify-between">
          <p className="text-sm text-neutral-dark">
            {t('tagline')}
          </p>
          
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <div className="h-4 w-px bg-neutral-light dark:bg-neutral"></div>
            <CurrencySwitcher />
          </div>
        </div>
      </div>
      
      {/* Main Navbar */}
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-primary">
            {t('siteTitle')}
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden items-center md:flex">
            <ul className="flex items-center space-x-8">
              <li>
                <Link 
                  href="/" 
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    router.pathname === '/' ? 'text-primary' : 'text-neutral-dark'
                  }`}
                >
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/products" 
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    router.pathname.startsWith('/products') ? 'text-primary' : 'text-neutral-dark'
                  }`}
                >
                  {t('products')}
                </Link>
              </li>
              <li className="relative group">
                <button 
                  className={`flex items-center text-sm font-medium transition-colors hover:text-primary ${
                    router.pathname.startsWith('/categories') ? 'text-primary' : 'text-neutral-dark'
                  }`}
                >
                  {t('categories')}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="ml-1 h-4 w-4">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute left-0 z-10 mt-2 hidden w-48 rounded-md bg-white py-2 shadow-lg ring-1 ring-black/5 transition-all group-hover:block dark:bg-neutral-dark dark:ring-white/10">
                  <Link href="/categories/electronics" className="block px-4 py-2 text-sm text-neutral-dark hover:bg-neutral-lightest dark:text-white dark:hover:bg-neutral">
                    {t('electronics')}
                  </Link>
                  <Link href="/categories/jewelery" className="block px-4 py-2 text-sm text-neutral-dark hover:bg-neutral-lightest dark:text-white dark:hover:bg-neutral">
                    {t('jewelry')}
                  </Link>
                  <Link href="/categories/men's clothing" className="block px-4 py-2 text-sm text-neutral-dark hover:bg-neutral-lightest dark:text-white dark:hover:bg-neutral">
                    {t('clothing')}
                  </Link>
                </div>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    router.pathname === '/contact' ? 'text-primary' : 'text-neutral-dark'
                  }`}
                >
                  {t('contact')}
                </Link>
              </li>
            </ul>
          </nav>
          
          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-neutral-dark hover:bg-neutral-lightest dark:text-white dark:hover:bg-neutral"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>
            
            {/* Cart Button */}
            <button 
              onClick={toggleCart}
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-neutral-dark hover:bg-neutral-lightest dark:text-white dark:hover:bg-neutral"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              
              {totalQuantity > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-white">
                  {totalQuantity}
                </span>
              )}
            </button>
            
            {/* Account Button - Desktop Only */}
            <button className="hidden h-10 w-10 items-center justify-center rounded-full text-neutral-dark hover:bg-neutral-lightest dark:text-white dark:hover:bg-neutral md:flex">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-neutral-dark hover:bg-neutral-lightest dark:text-white dark:hover:bg-neutral md:hidden"
            >
              {isMobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="absolute left-0 top-full z-30 w-full bg-white px-4 py-4 shadow-md dark:bg-neutral-dark">
          <form onSubmit={handleSearch} className="container-custom relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('search')}
              className="w-full rounded-md border border-neutral-light bg-white py-3 pl-4 pr-12 text-neutral-dark focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-neutral dark:bg-neutral-darkest dark:text-white"
            />
            <button
              type="submit"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-dark dark:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>
          </form>
        </div>
      )}
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute left-0 top-full z-20 w-full bg-white shadow-md dark:bg-neutral-dark md:hidden">
          <nav className="container-custom py-4">
            <ul className="space-y-4">
              <li>
                <Link 
                  href="/" 
                  className={`block py-2 text-base ${
                    router.pathname === '/' ? 'font-medium text-primary' : 'text-neutral-dark dark:text-white'
                  }`}
                >
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/products" 
                  className={`block py-2 text-base ${
                    router.pathname.startsWith('/products') ? 'font-medium text-primary' : 'text-neutral-dark dark:text-white'
                  }`}
                >
                  {t('products')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/categories" 
                  className={`block py-2 text-base ${
                    router.pathname.startsWith('/categories') ? 'font-medium text-primary' : 'text-neutral-dark dark:text-white'
                  }`}
                >
                  {t('categories')}
                </Link>
              </li>
              <li className="border-t border-neutral-light pt-4 dark:border-neutral">
                <Link 
                  href="/categories/electronics" 
                  className="block py-2 pl-4 text-sm text-neutral-dark dark:text-neutral-light"
                >
                  {t('electronics')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/categories/jewelery" 
                  className="block py-2 pl-4 text-sm text-neutral-dark dark:text-neutral-light"
                >
                  {t('jewelry')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/categories/men's clothing" 
                  className="block py-2 pl-4 text-sm text-neutral-dark dark:text-neutral-light"
                >
                  {t('clothing')}
                </Link>
              </li>
              <li className="border-t border-neutral-light pt-4 dark:border-neutral">
                <Link 
                  href="/contact" 
                  className={`block py-2 text-base ${
                    router.pathname === '/contact' ? 'font-medium text-primary' : 'text-neutral-dark dark:text-white'
                  }`}
                >
                  {t('contact')}
                </Link>
              </li>
              <li className="border-t border-neutral-light pt-4 dark:border-neutral">
                <Link 
                  href="/account" 
                  className="block py-2 text-base text-neutral-dark dark:text-white"
                >
                  {t('account')}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
