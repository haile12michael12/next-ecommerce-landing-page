/**
 * Currency conversion utilities
 * 
 * This file provides utility functions for converting between currencies
 * Note: In a production app, this would use real-time exchange rates from an API
 */

// Exchange rates (fixed for demo purposes)
// In production, these would come from an API like Open Exchange Rates or Fixer.io
export const exchangeRates = {
  USD: 1,
  EUR: 0.93,
  GBP: 0.81,
  birr: 148.58,
  CAD: 1.38,
  AUD: 1.56,
  CNY: 7.28,
  INR: 83.43,
};

export const currencySymbols = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  birr: 'birr',
  CAD: 'C$',
  AUD: 'A$',
  CNY: '¥',
  INR: '₹',
};

/**
 * Converts a price from USD to the target currency
 * @param {number} priceInUSD - The price in USD
 * @param {string} targetCurrency - The currency code to convert to
 * @returns {number} - The converted price
 */
export const convertCurrency = (priceInUSD, targetCurrency = 'USD') => {
  if (!priceInUSD || typeof priceInUSD !== 'number') return 0;
  
  // If target currency doesn't exist in our rates, return the USD price
  if (!exchangeRates[targetCurrency]) return priceInUSD;
  
  const convertedPrice = priceInUSD * exchangeRates[targetCurrency];
  
  // Round to 2 decimal places (except JPY which doesn't typically use decimal places)
  return targetCurrency === 'birr' 
    ? Math.round(convertedPrice) 
    : Math.round(convertedPrice * 100) / 100;
};

/**
 * Formats a price with the appropriate currency symbol
 * @param {number} price - The price to format
 * @param {string} currency - The currency code
 * @returns {string} - The formatted price with currency symbol
 */
export const formatPrice = (price, currency = 'USD') => {
  if (typeof price !== 'number') return `${currencySymbols[currency] || '$'}0.00`;
  
  const symbol = currencySymbols[currency] || '$';
  
  // Format based on currency conventions
  if (currency === 'JPY' || currency === 'CNY') {
    return `${symbol}${Math.round(price)}`;
  }
  
  return `${symbol}${price.toFixed(2)}`;
};

/**
 * Converts a price from one currency to another
 * @param {number} price - The price to convert
 * @param {string} fromCurrency - The source currency code
 * @param {string} toCurrency - The target currency code
 * @returns {number} - The converted price
 */
export const convertBetweenCurrencies = (price, fromCurrency = 'USD', toCurrency = 'USD') => {
  if (!price || typeof price !== 'number') return 0;
  
  // If either currency is not in our rates, return the original price
  if (!exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) return price;
  
  // First convert to USD, then to target currency
  const priceInUSD = price / exchangeRates[fromCurrency];
  return convertCurrency(priceInUSD, toCurrency);
};
