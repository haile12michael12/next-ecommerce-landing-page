import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Favicon */}
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#0080ff" />
          <meta name="theme-color" content="#ffffff" />
          
          {/* Meta tags */}
          <meta charSet="utf-8" />
          <meta name="description" content="ShopNest - Your premium eCommerce destination with multi-language support" />
          <meta name="keywords" content="ecommerce, shop, online shopping, products, premium" />
          
          {/* Open Graph / Social Media */}
          <meta property="og:type" content="website" />
          <meta property="og:title" content="ShegaShop - Premium eCommerce" />
          <meta property="og:description" content="Your premium eCommerce destination with multi-language support" />
          <meta property="og:image" content="/og-image.jpg" />
          <meta property="og:url" content="https://ShegaShop.com" />
          
          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="ShegaShop - Premium eCommerce" />
          <meta name="twitter:description" content="Your premium eCommerce destination with multi-language support" />
          <meta name="twitter:image" content="/twitter-image.jpg" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
