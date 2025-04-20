import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import CurrencySwitcher from './CurrencySwitcher';
import { useStateContext } from '../Contexts/StateContext';

export default function Navbar() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { totalQuantity, toggleCart, user, logout } = useStateContext();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] = useState(false);
  
  const searchRef = useRef(null);
  const userDropdownRef = useRef(null);
  const categoriesDropdownRef = useRef(null);

  // Handle scroll to add box shadow to navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
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
      setIsUserDropdownOpen(false);
      setIsCategoriesDropdownOpen(false);
    };
    
    router.events.on('routeChangeStart', handleRouteChange);
    return () => router.events.off('routeChangeStart', handleRouteChange);
  }, [router.events]);
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
      if (categoriesDropdownRef.current && !categoriesDropdownRef.current.contains(event.target)) {
        setIsCategoriesDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target) && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSearchOpen]);

  // Toggle body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 shadow-md backdrop-blur-sm dark:bg-neutral-darkest/95 dark:shadow-black/20' : 'bg-white dark:bg-neutral-darkest'
      }`}
    >
      {/* Top bar - Language and Currency Switchers */}
      <div className="border-b border-neutral-light bg-neutral-lightest py-2 dark:border-neutral-dark dark:bg-neutral-darker">
        <div className="container-custom mx-auto flex items-center justify-between px-4 sm:px-6">
          <p className="text-xs text-neutral-dark dark:text-neutral-light sm:text-sm">
            {t('tagline')} <span className="hidden sm:inline">| {t('freeShipping')} 50+ birr</span>
          </p>
          
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <div className="h-4 w-px bg-neutral-light dark:bg-neutral"></div>
            <CurrencySwitcher />
          </div>
        </div>
      </div>
      
      {/* Main Navbar */}
      <div className="container-custom mx-auto px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-2xl font-bold text-primary transition-transform hover:scale-105 dark:text-primary-light"
            aria-label="Home"
          >
            <span className="hidden sm:inline">{t('siteTitle')}</span>
            <span className="sm:hidden">TL</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden items-center md:flex">
            <ul className="flex items-center space-x-6 lg:space-x-8">
              <li>
                <Link 
                  href="/" 
                  className={`text-sm font-medium transition-all hover:text-primary ${
                    router.pathname === '/' 
                      ? 'text-primary dark:text-primary-light' 
                      : 'text-neutral-dark hover:scale-105 dark:text-neutral-light'
                  }`}
                >
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/products" 
                  className={`text-sm font-medium transition-all hover:text-primary ${
                    router.pathname.startsWith('/products') 
                      ? 'text-primary dark:text-primary-light' 
                      : 'text-neutral-dark hover:scale-105 dark:text-neutral-light'
                  }`}
                >
                  {t('products')}
                </Link>
              </li>
              <li 
                className="relative" 
                ref={categoriesDropdownRef}
                onMouseEnter={() => setIsCategoriesDropdownOpen(true)}
                onMouseLeave={() => setIsCategoriesDropdownOpen(false)}
              >
                <button 
                  className={`flex items-center text-sm font-medium transition-all hover:text-primary ${
                    router.pathname.startsWith('/categories') 
                      ? 'text-primary dark:text-primary-light' 
                      : 'text-neutral-dark hover:scale-105 dark:text-neutral-light'
                  }`}
                  aria-expanded={isCategoriesDropdownOpen}
                  aria-haspopup="true"
                >
                  {t('categories')}
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor" 
                    className={`ml-1 h-4 w-4 transition-transform ${isCategoriesDropdownOpen ? 'rotate-180' : ''}`}
                  >
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {/* Dropdown Menu */}
                <div 
                  className={`absolute left-0 z-10 mt-2 w-48 rounded-md bg-white py-2 shadow-lg ring-1 ring-black/5 transition-all duration-200 dark:bg-neutral-dark dark:ring-white/10 ${
                    isCategoriesDropdownOpen 
                      ? 'visible translate-y-0 opacity-100' 
                      : 'invisible -translate-y-1 opacity-0'
                  }`}
                >
                  <Link 
                    href="/categories/electronics" 
                    className="block px-4 py-2 text-sm text-neutral-dark transition-colors hover:bg-neutral-lightest hover:text-primary dark:text-white dark:hover:bg-neutral dark:hover:text-primary-light"
                  >
                    {t('electronics')}
                  </Link>
                  <Link 
                    href="/categories/jewelery" 
                    className="block px-4 py-2 text-sm text-neutral-dark transition-colors hover:bg-neutral-lightest hover:text-primary dark:text-white dark:hover:bg-neutral dark:hover:text-primary-light"
                  >
                    {t('jewelry')}
                  </Link>
                  <Link 
                    href="/categories/men's clothing" 
                    className="block px-4 py-2 text-sm text-neutral-dark transition-colors hover:bg-neutral-lightest hover:text-primary dark:text-white dark:hover:bg-neutral dark:hover:text-primary-light"
                  >
                    {t('clothing')}
                  </Link>
                  <Link 
                    href="/categories/women's clothing" 
                    className="block px-4 py-2 text-sm text-neutral-dark transition-colors hover:bg-neutral-lightest hover:text-primary dark:text-white dark:hover:bg-neutral dark:hover:text-primary-light"
                  >
                    {t('womenClothing')}
                  </Link>
                </div>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className={`text-sm font-medium transition-all hover:text-primary ${
                    router.pathname === '/about' 
                      ? 'text-primary dark:text-primary-light' 
                      : 'text-neutral-dark hover:scale-105 dark:text-neutral-light'
                  }`}
                >
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className={`text-sm font-medium transition-all hover:text-primary ${
                    router.pathname === '/contact' 
                      ? 'text-primary dark:text-primary-light' 
                      : 'text-neutral-dark hover:scale-105 dark:text-neutral-light'
                  }`}
                >
                  {t('contact')}
                </Link>
              </li>
            </ul>
          </nav>
          
          {/* Action Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search Button */}
            <button 
              onClick={() => {
                setIsSearchOpen(!isSearchOpen);
                if (!isSearchOpen) {
                  setTimeout(() => searchRef.current?.querySelector('input')?.focus(), 100);
                }
              }}
              className="flex h-10 w-10 items-center justify-center rounded-full text-neutral-dark transition-colors hover:bg-neutral-lightest hover:text-primary dark:text-white dark:hover:bg-neutral dark:hover:text-primary-light"
              aria-label="Search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>
            
            {/* Cart Button */}
            <button 
              onClick={toggleCart}
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-neutral-dark transition-colors hover:bg-neutral-lightest hover:text-primary dark:text-white dark:hover:bg-neutral dark:hover:text-primary-light"
              aria-label="Cart"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              
              {totalQuantity > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-white shadow-sm dark:bg-primary-light">
                  {totalQuantity > 9 ? '9+' : totalQuantity}
                </span>
              )}
            </button>
            
            {/* Account Button - Desktop Only */}
            <div 
              className="relative hidden md:block" 
              ref={userDropdownRef}
              onMouseEnter={() => setIsUserDropdownOpen(true)}
              onMouseLeave={() => setIsUserDropdownOpen(false)}
            >
              <button 
                className="flex h-10 w-10 items-center justify-center rounded-full text-neutral-dark transition-colors hover:bg-neutral-lightest hover:text-primary dark:text-white dark:hover:bg-neutral dark:hover:text-primary-light"
                aria-label="Account"
                aria-expanded={isUserDropdownOpen}
                aria-haspopup="true"
              >
                {user ? (
                  <div className="h-6 w-6 rounded-full bg-primary text-xs font-medium leading-6 text-white dark:bg-primary-light">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                )}
              </button>
              
              {/* User Dropdown Menu */}
              <div 
                className={`absolute right-0 z-10 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition-all duration-200 dark:bg-neutral-dark dark:ring-white/10 ${
                  isUserDropdownOpen 
                    ? 'visible translate-y-0 opacity-100' 
                    : 'invisible -translate-y-1 opacity-0'
                }`}
              >
                {user ? (
                  <>
                    <div className="px-4 py-2 text-sm text-neutral-dark dark:text-white">
                      <div className="font-medium">{user.name}</div>
                      <div className="truncate text-xs text-neutral dark:text-neutral-light">{user.email}</div>
                    </div>
                    <div className="border-t border-neutral-light dark:border-neutral"></div>
                    <Link 
                      href="/account" 
                      className="block px-4 py-2 text-sm text-neutral-dark transition-colors hover:bg-neutral-lightest hover:text-primary dark:text-white dark:hover:bg-neutral dark:hover:text-primary-light"
                    >
                      {t('myAccount')}
                    </Link>
                    <Link 
                      href="/orders" 
                      className="block px-4 py-2 text-sm text-neutral-dark transition-colors hover:bg-neutral-lightest hover:text-primary dark:text-white dark:hover:bg-neutral dark:hover:text-primary-light"
                    >
                      {t('myOrders')}
                    </Link>
                    <Link 
                      href="/wishlist" 
                      className="block px-4 py-2 text-sm text-neutral-dark transition-colors hover:bg-neutral-lightest hover:text-primary dark:text-white dark:hover:bg-neutral dark:hover:text-primary-light"
                    >
                      {t('wishlist')}
                    </Link>
                    <div className="border-t border-neutral-light dark:border-neutral"></div>
                    <button
                      onClick={logout}
                      className="block w-full px-4 py-2 text-left text-sm text-neutral-dark transition-colors hover:bg-neutral-lightest hover:text-primary dark:text-white dark:hover:bg-neutral dark:hover:text-primary-light"
                    >
                      {t('logout')}
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      href="/login" 
                      className="block px-4 py-2 text-sm text-neutral-dark transition-colors hover:bg-neutral-lightest hover:text-primary dark:text-white dark:hover:bg-neutral dark:hover:text-primary-light"
                    >
                      {t('login')}
                    </Link>
                    <Link 
                      href="/register" 
                      className="block px-4 py-2 text-sm text-neutral-dark transition-colors hover:bg-neutral-lightest hover:text-primary dark:text-white dark:hover:bg-neutral dark:hover:text-primary-light"
                    >
                      {t('register')}
                    </Link>
                  </>
                )}
              </div>
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-neutral-dark transition-colors hover:bg-neutral-lightest hover:text-primary dark:text-white dark:hover:bg-neutral dark:hover:text-primary-light md:hidden"
              aria-label="Menu"
              aria-expanded={isMobileMenuOpen}
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
        <div 
          ref={searchRef}
          className="absolute left-0 top-full z-40 w-full bg-white px-4 py-4 shadow-md dark:bg-neutral-dark"
        >
          <form onSubmit={handleSearch} className="container-custom relative mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full rounded-md border border-neutral-light bg-white py-3 pl-4 pr-12 text-neutral-dark placeholder-neutral transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-neutral dark:bg-neutral-darkest dark:text-white dark:placeholder-neutral-light dark:focus:ring-primary-light/30"
              autoFocus
            />
            <button
              type="submit"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-dark transition-colors hover:text-primary dark:text-white dark:hover:text-primary-light"
              aria-label="Submit search"
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
        <div className="fixed inset-0 top-[calc(3.5rem+1px)] z-40 h-screen w-full overflow-y-auto bg-white pb-20 dark:bg-neutral-dark md:hidden">
          <nav className="container-custom mx-auto px-4 py-6">
            <div className="mb-6">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('searchPlaceholder')}
                  className="w-full rounded-md border border-neutral-light bg-white py-3 pl-4 pr-12 text-neutral-dark placeholder-neutral transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-neutral dark:bg-neutral-darkest dark:text-white dark:placeholder-neutral-light dark:focus:ring-primary-light/30"
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
            
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/" 
                  className={`block rounded-lg px-4 py-3 text-base ${
                    router.pathname === '/' 
                      ? 'bg-primary-light/10 font-medium text-primary dark:bg-neutral dark:text-primary-light' 
                      : 'text-neutral-dark hover:bg-neutral-lightest dark:text-white dark:hover:bg-neutral'
                  }`}
                >
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/products" 
                  className={`block rounded-lg px-4 py-3 text-base ${
                    router.pathname.startsWith('/products') 
                      ? 'bg-primary-light/10 font-medium text-primary dark:bg-neutral dark:text-primary-light' 
                      : 'text-neutral-dark hover:bg-neutral-lightest dark:text-white dark:hover:bg-neutral'
                  }`}
                >
                  {t('products')}
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => setIsCategoriesDropdownOpen(!isCategoriesDropdownOpen)}
                  className={`flex w-full items-center justify-between rounded-lg px-4 py-3 text-base ${
                    router.pathname.startsWith('/categories') 
                      ? 'bg-primary-light/10 font-medium text-primary dark:bg-neutral dark:text-primary-light' 
                      : 'text-neutral-dark hover:bg-neutral-lightest dark:text-white dark:hover:bg-neutral'
                  }`}
                >
                  {t('categories')}
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor" 
                    className={`h-5 w-5 transition-transform ${isCategoriesDropdownOpen ? 'rotate-180' : ''}`}
                  >
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {/* Mobile Categories Dropdown */}
                {isCategoriesDropdownOpen && (
                  <ul className="mt-1 space-y-1 pl-4">
                    <li>
                      <Link 
                        href="/categories/electronics" 
                        className="block rounded-lg px-4 py-2 text-sm text-neutral-dark hover:bg-neutral-lightest dark:text-neutral-light dark:hover:bg-neutral"
                      >
                        {t('electronics')}
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/categories/jewelery" 
                        className="block rounded-lg px-4 py-2 text-sm text-neutral-dark hover:bg-neutral-lightest dark:text-neutral-light dark:hover:bg-neutral"
                      >
                        {t('jewelry')}
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/categories/men's clothing" 
                        className="block rounded-lg px-4 py-2 text-sm text-neutral-dark hover:bg-neutral-lightest dark:text-neutral-light dark:hover:bg-neutral"
                      >
                        {t('clothing')}
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/categories/women's clothing" 
                        className="block rounded-lg px-4 py-2 text-sm text-neutral-dark hover:bg-neutral-lightest dark:text-neutral-light dark:hover:bg-neutral"
                      >
                        {t('womenClothing')}
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <Link 
                  href="/about" 
                  className={`block rounded-lg px-4 py-3 text-base ${
                    router.pathname === '/about' 
                      ? 'bg-primary-light/10 font-medium text-primary dark:bg-neutral dark:text-primary-light' 
                      : 'text-neutral-dark hover:bg-neutral-lightest dark:text-white dark:hover:bg-neutral'
                  }`}
                >
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className={`block rounded-lg px-4 py-3 text-base ${
                    router.pathname === '/contact' 
                      ? 'bg-primary-light/10 font-medium text-primary dark:bg-neutral dark:text-primary-light' 
                      : 'text-neutral-dark hover:bg-neutral-lightest dark:text-white dark:hover:bg-neutral'
                  }`}
                >
                  {t('contact')}
                </Link>
              </li>
            </ul>
            
            {/* Mobile Account Section */}
            <div className="mt-8 border-t border-neutral-light pt-6 dark:border-neutral">
              {user ? (
                <>
                  <div className="flex items-center space-x-3 px-4 py-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-medium text-white dark:bg-primary-light">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium text-neutral-darkest dark:text-white">{user.name}</div>
                      <div className="text-xs text-neutral-dark dark:text-neutral-light">{user.email}</div>
                    </div>
                  </div>
                  <ul className="mt-2 space-y-1">
                    <li>
                      <Link 
                        href="/account" 
                        className="block rounded-lg px-4 py-3 text-base text-neutral-dark hover:bg-neutral-lightest dark:text-white dark:hover:bg-neutral"
                      >
                        {t('myAccount')}
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/orders" 
                        className="block rounded-lg px-4 py-3 text-base text-neutral-dark hover:bg-neutral-lightest dark:text-white dark:hover:bg-neutral"
                      >
                        {t('myOrders')}
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/wishlist" 
                        className="block rounded-lg px-4 py-3 text-base text-neutral-dark hover:bg-neutral-lightest dark:text-white dark:hover:bg-neutral"
                      >
                        {t('wishlist')}
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={logout}
                        className="block w-full rounded-lg px-4 py-3 text-left text-base text-neutral-dark hover:bg-neutral-lightest dark:text-white dark:hover:bg-neutral"
                      >
                        {t('logout')}
                      </button>
                    </li>
                  </ul>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link 
                    href="/login" 
                    className="rounded-lg border border-primary px-4 py-3 text-center text-base font-medium text-primary transition-colors hover:bg-primary-light/10 dark:border-primary-light dark:text-primary-light"
                  >
                    {t('login')}
                  </Link>
                  <Link 
                    href="/register" 
                    className="rounded-lg bg-primary px-4 py-3 text-center text-base font-medium text-white transition-colors hover:bg-primary-dark dark:bg-primary-light dark:hover:bg-primary"
                  >
                    {t('register')}
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}