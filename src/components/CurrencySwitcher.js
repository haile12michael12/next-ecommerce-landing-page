import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { useStateContext } from '../Contexts/StateContext';

export default function CurrencySwitcher() {
  const { t } = useTranslation('common');
  const { currency, currencies, changeCurrency } = useStateContext();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Available currencies for display
  const currencyOptions = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'Birr', name: 'Ethiopian birr', symbol: 'birr' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  ];
  
  // Find current currency
  const currentCurrency = currencyOptions.find(c => c.code === currency) || currencyOptions[0];
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Handle currency change
  const handleCurrencyChange = (currencyCode) => {
    changeCurrency(currencyCode);
    setIsOpen(false);
  };
  
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 text-sm text-neutral-dark hover:text-primary"
      >
        <span>{currentCurrency.symbol}</span>
        <span>{currentCurrency.code}</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-black/5 focus:outline-none dark:bg-neutral-dark dark:ring-white/10">
          {currencyOptions.map((currencyOption) => (
            <button
              key={currencyOption.code}
              onClick={() => handleCurrencyChange(currencyOption.code)}
              className={`flex w-full items-center justify-between px-4 py-2 text-left text-sm hover:bg-neutral-lightest dark:hover:bg-neutral ${
                currency === currencyOption.code ? 'font-medium text-primary' : 'text-neutral-dark dark:text-white'
              }`}
            >
              <span>{currencyOption.name}</span>
              <span className="font-medium">{currencyOption.symbol}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
