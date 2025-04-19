import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// Create context
const StateContext = createContext();

// Currency options
const currencies = {
  USD: { symbol: '$', rate: 1 },
  EUR: { symbol: '€', rate: 0.93 },
  GBP: { symbol: '£', rate: 0.81 },
  birr: { symbol: 'birr', rate: 148.58 },
  CAD: { symbol: 'C$', rate: 1.38 },
};

export const StateProvider = ({ children }) => {
  const router = useRouter();
  
  // Initialize language from router or default to English
  const [language, setLanguage] = useState('en');
  
  // Initialize currency with USD as default
  const [currency, setCurrency] = useState('USD');
  
  // Cart state
  const [cartItems, setCartItems] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  
  // UI states
  const [showCart, setShowCart] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Initialize language from router when available
  useEffect(() => {
    if (router.locale) {
      setLanguage(router.locale);
    }
  }, [router.locale]);
  
  // Initialize cart from local storage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedCurrency = localStorage.getItem('currency');
    
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCartItems(parsedCart);
      
      // Calculate totals
      const quantity = parsedCart.reduce((total, item) => total + item.quantity, 0);
      setTotalQuantity(quantity);
      
      const price = parsedCart.reduce((total, item) => total + (item.price * item.quantity), 0);
      setTotalPrice(price);
    }
    
    if (savedCurrency && currencies[savedCurrency]) {
      setCurrency(savedCurrency);
    }
  }, []);
  
  // Save cart to local storage when it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    
    // Calculate totals
    const quantity = cartItems.reduce((total, item) => total + item.quantity, 0);
    setTotalQuantity(quantity);
    
    const price = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    setTotalPrice(price);
  }, [cartItems]);
  
  // Save currency preference
  useEffect(() => {
    localStorage.setItem('currency', currency);
  }, [currency]);
  
  // Handle language change
  const changeLanguage = (lang) => {
    router.push(router.pathname, router.asPath, { locale: lang });
    setLanguage(lang);
  };
  
  // Handle currency change
  const changeCurrency = (curr) => {
    if (currencies[curr]) {
      setCurrency(curr);
    }
  };
  
  // Convert price to selected currency
  const convertPrice = (priceInUSD) => {
    if (!priceInUSD) return 0;
    const converted = priceInUSD * currencies[currency].rate;
    return parseFloat(converted.toFixed(2));
  };
  
  // Format price with currency symbol
  const formatPrice = (price) => {
    const convertedPrice = convertPrice(price);
    const currencyInfo = currencies[currency];
    
    // Format based on currency
    if (currency === 'birr') {
      return `${currencyInfo.symbol}${Math.round(convertedPrice)}`;
    }
    
    return `${currencyInfo.symbol}${convertedPrice.toFixed(2)}`;
  };
  
  // Add product to cart
  const addToCart = (product, quantity = 1) => {
    // Check if product is already in cart
    const exist = cartItems.find(item => item.id === product.id);
    
    if (exist) {
      // Update quantity if product exists
      setCartItems(
        cartItems.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      // Add new product
      setCartItems([...cartItems, { ...product, quantity }]);
    }
  };
  
  // Update cart item quantity
  const updateCartItemQuantity = (id, quantity) => {
    if (quantity < 1) return;
    
    setCartItems(
      cartItems.map(item => 
        item.id === id 
          ? { ...item, quantity }
          : item
      )
    );
  };
  
  // Remove product from cart
  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };
  
  // Clear cart
  const clearCart = () => {
    setCartItems([]);
  };
  
  // Toggle cart visibility
  const toggleCart = () => {
    setShowCart(!showCart);
  };
  
  return (
    <StateContext.Provider
      value={{
        language,
        currency,
        currencies,
        cartItems,
        totalQuantity,
        totalPrice,
        showCart,
        loading,
        setLoading,
        changeLanguage,
        changeCurrency,
        convertPrice,
        formatPrice,
        addToCart,
        updateCartItemQuantity,
        removeFromCart,
        clearCart,
        toggleCart,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

// Custom hook to use the context
export const useStateContext = () => useContext(StateContext);
