import { useTranslation } from 'next-i18next';
import Link from 'next/link';

export default function Footer() {
  const { t } = useTranslation('common');
  
  // Get current year for copyright
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-neutral-darkest text-white">
      {/* Main Footer */}
      <div className="container-custom py-12">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand Column */}
          <div>
            <h3 className="mb-4 text-xl font-bold text-primary">{t('siteTitle')}</h3>
            <p className="mb-4 text-neutral-light">{t('footerText')}</p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-dark text-white transition-colors hover:bg-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-dark text-white transition-colors hover:bg-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-dark text-white transition-colors hover:bg-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-dark text-white transition-colors hover:bg-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <path d="M19 12H5"></path>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">{t('categories')}</h3>
            <ul className="space-y-2 text-neutral-light">
              <li><Link href="/categories/electronics" className="hover:text-primary">{t('electronics')}</Link></li>
              <li><Link href="/categories/jewelery" className="hover:text-primary">{t('jewelry')}</Link></li>
              <li><Link href="/categories/men's clothing" className="hover:text-primary">{t('clothing')}</Link></li>
              <li><Link href="/categories" className="hover:text-primary">{t('viewAll')}</Link></li>
            </ul>
          </div>
          
          {/* Information */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">{t('information')}</h3>
            <ul className="space-y-2 text-neutral-light">
              <li><Link href="/about" className="hover:text-primary">{t('aboutUs')}</Link></li>
              <li><Link href="/contact" className="hover:text-primary">{t('contact')}</Link></li>
              <li><Link href="/faq" className="hover:text-primary">{t('faq')}</Link></li>
              <li><Link href="/shipping" className="hover:text-primary">{t('shipping')}</Link></li>
              <li><Link href="/returns" className="hover:text-primary">{t('returns')}</Link></li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">{t('newsletter')}</h3>
            <p className="mb-4 text-neutral-light">{t('newsletter')}</p>
            
            <form className="mb-4">
              <div className="flex">
                <input
                  type="email"
                  placeholder={t('yourEmail')}
                  className="w-full rounded-l-md border-transparent bg-neutral-dark px-4 py-2 text-white placeholder-neutral-light focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  required
                />
                <button 
                  type="submit" 
                  className="rounded-r-md bg-primary px-4 py-2 font-medium text-white transition-colors hover:bg-primary-dark"
                >
                  {t('subscribe')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      {/* Bottom Footer */}
      <div className="border-t border-neutral-dark py-6">
        <div className="container-custom flex flex-col justify-between gap-4 text-sm text-neutral-light md:flex-row md:items-center">
          <p>© {currentYear} {t('siteTitle')}. {t('allRightsReserved')}</p>
          
          <div className="flex flex-wrap gap-4">
            <Link href="/privacy" className="hover:text-primary">{t('privacyPolicy')}</Link>
            <Link href="/terms" className="hover:text-primary">{t('termsOfService')}</Link>
          </div>
          
          {/* Payment Methods */}
          <div className="flex items-center space-x-3">
            <span className="text-xs uppercase">Payment Methods:</span>
            <div className="flex space-x-2">
              {/* Credit Card Icons */}
              <div className="h-6 w-10 rounded bg-white/10 backdrop-blur-sm"></div>
              <div className="h-6 w-10 rounded bg-white/10 backdrop-blur-sm"></div>
              <div className="h-6 w-10 rounded bg-white/10 backdrop-blur-sm"></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
