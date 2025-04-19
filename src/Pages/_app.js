import { useEffect } from 'react';
import { appWithTranslation } from 'next-i18next';
import { StateProvider } from '../Contexts/StateContext';
import '../styles/globals.css';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  // Load fonts from Google Fonts
  useEffect(() => {
    const linkInter = document.createElement('link');
    linkInter.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
    linkInter.rel = 'stylesheet';
    
    const linkPoppins = document.createElement('link');
    linkPoppins.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap';
    linkPoppins.rel = 'stylesheet';
    
    document.head.appendChild(linkInter);
    document.head.appendChild(linkPoppins);
    
    return () => {
      document.head.removeChild(linkInter);
      document.head.removeChild(linkPoppins);
    };
  }, []);
  
  // Get layout if it exists, otherwise use default layout
  const getLayout = Component.getLayout || ((page) => page);
  
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="ShopNest - Your premium eCommerce destination" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StateProvider>
        {getLayout(<Component {...pageProps} />)}
      </StateProvider>
    </>
  );
}

export default appWithTranslation(MyApp);
