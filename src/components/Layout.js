import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from './Navbar';
import Footer from './Footer';
import { useStateContext } from '../Contexts/StateContext';

export default function Layout({ children }) {
  const { loading, setLoading } = useStateContext();
  const router = useRouter();
  
  // Page transition loading state
  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);
    
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);
    
    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router, setLoading]);
  
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      {/* Page Transition Loader */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm dark:bg-neutral-darkest/80">
          <div className="flex flex-col items-center">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-neutral-light border-t-primary"></div>
            <p className="mt-4 font-medium">Loading...</p>
          </div>
        </div>
      )}
      
      <main className="flex-grow">
        {children}
      </main>
      
      <Footer />
    </div>
  );
}
