'use client'
import React, { useState } from "react";
import { BsSearch, BsPerson, BsCart3 } from "react-icons/bs";
import { FiHeart, FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { RiArrowDropDownLine } from "react-icons/ri";

const HeaderMain = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Mock cart and wishlist counts
  const cartCount = 3;
  const wishlistCount = 5;

  // Categories for dropdown
  const categories = [
    "Electronics",
    "Fashion",
    "Home & Garden",
    "Beauty & Care",
    "Sports",
    "Toys & Games"
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      {/* Top Announcement Bar */}
      

      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo and Mobile Menu Button */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <button 
              className="md:hidden text-gray-700"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <FiMenu size={24} />
            </button>
            
            <div className="text-3xl font-bold text-amber-600">
              <span className="text-gray-900">Konjo</span>-Store
            </div>
            
            <div className="md:hidden flex items-center space-x-4">
              <button className="text-gray-700 relative">
                <BsCart3 size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Search Bar with Category Dropdown */}
          <div className="w-full md:w-1/2 lg:w-2/5 relative mt-4 md:mt-0">
            <div className="flex border-2 border-amber-500 rounded-lg overflow-hidden">
              <div className="relative group">
                <button className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 text-sm font-medium">
                  All Categories
                  <RiArrowDropDownLine size={20} />
                </button>
                <div className="absolute left-0 mt-1 w-56 bg-white shadow-lg rounded-md py-2 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {categories.map((category, index) => (
                    <a 
                      key={index} 
                      href="#" 
                      className="block px-4 py-2 text-gray-700 hover:bg-amber-50"
                    >
                      {category}
                    </a>
                  ))}
                </div>
              </div>
              <input
                className={`flex-1 px-4 py-2 focus:outline-none ${isSearchFocused ? 'placeholder-amber-300' : ''}`}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              <button className="bg-amber-500 text-white px-4 hover:bg-amber-600 transition-colors">
                <BsSearch size={18} />
              </button>
            </div>
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="relative group">
              <button className="flex flex-col items-center text-gray-700 hover:text-amber-600 text-xs">
                <BsPerson size={20} />
                <span>Account</span>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-amber-50">Sign In</a>
                <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-amber-50">Register</a>
                <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-amber-50">My Orders</a>
              </div>
            </div>
            
            
            
            <div className="relative group">
              <button className="flex flex-col items-center text-gray-700 hover:text-amber-600 text-xs relative">
                <BsCart3 size={20} />
                <span>Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-1 right-0 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
          <div className="bg-white h-full w-4/5 max-w-sm relative">
            <div className="p-4 border-b flex justify-between items-center">
              <div className="text-xl font-bold text-amber-600">
                <span className="text-gray-900">Konjo</span>-Store
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-800 focus:outline-none"
              >
                <AiOutlineClose size={24} />
              </button>
            </div>
            
            <div className="p-4 overflow-y-auto h-[calc(100%-60px)]">
              <div className="mb-6">
                <div className="relative">
                  <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    type="text"
                    placeholder="Search products..."
                  />
                  <button className="absolute right-2 top-2 text-gray-500">
                    <BsSearch size={18} />
                  </button>
                </div>
              </div>
              
              <nav className="space-y-2">
                <a href="#" className="block py-3 px-2 font-medium text-gray-800 border-b border-gray-100">Home</a>
                <a href="#" className="block py-3 px-2 font-medium text-gray-800 border-b border-gray-100">Categories</a>
                <a href="#" className="block py-3 px-2 font-medium text-gray-800 border-b border-gray-100">Men's Fashion</a>
                <a href="#" className="block py-3 px-2 font-medium text-gray-800 border-b border-gray-100">Women's Fashion</a>
                <a href="#" className="block py-3 px-2 font-medium text-gray-800 border-b border-gray-100">Jewelry</a>
                <a href="#" className="block py-3 px-2 font-medium text-gray-800 border-b border-gray-100">Hot Offers</a>
              </nav>
              
              <div className="mt-8 pt-4 border-t">
                <div className="flex flex-col space-y-4">
                  <a href="#" className="flex items-center text-gray-800 py-2">
                    <BsPerson className="mr-3" size={18} /> My Account
                  </a>
                  <a href="#" className="flex items-center text-gray-800 py-2">
                    <FiHeart className="mr-3" size={18} /> Wishlist
                    {wishlistCount > 0 && (
                      <span className="ml-auto bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {wishlistCount}
                      </span>
                    )}
                  </a>
                  <a href="#" className="flex items-center text-gray-800 py-2">
                    <BsCart3 className="mr-3" size={18} /> My Cart
                    {cartCount > 0 && (
                      <span className="ml-auto bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default HeaderMain;