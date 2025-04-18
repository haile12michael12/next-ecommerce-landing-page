import React from "react";
import { BsFacebook, BsTwitter, BsInstagram, BsLinkedin, BsWhatsapp, BsTelephone, BsEnvelope, BsChevronDown } from "react-icons/bs";
import { FiUser, FiHeart, FiShoppingBag } from "react-icons/fi";

const HeaderTop = () => {
  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white hidden sm:block">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-2">
          {/* Left Section - Social Media & Contact Info */}
          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center space-x-2">
              <a href="#" className="hover:text-blue-400 transition-colors duration-300">
                <BsFacebook className="text-sm" />
              </a>
              <a href="#" className="hover:text-sky-400 transition-colors duration-300">
                <BsTwitter className="text-sm" />
              </a>
              <a href="#" className="hover:text-pink-500 transition-colors duration-300">
                <BsInstagram className="text-sm" />
              </a>
              <a href="#" className="hover:text-blue-600 transition-colors duration-300">
                <BsLinkedin className="text-sm" />
              </a>
              <a href="#" className="hover:text-green-500 transition-colors duration-300">
                <BsWhatsapp className="text-sm" />
              </a>
            </div>
            
            <div className="hidden md:flex items-center space-x-4 text-xs">
              <div className="flex items-center space-x-1">
                <BsTelephone className="text-xs" />
                <span>+251 123 456 789</span>
              </div>
              <div className="flex items-center space-x-1">
                <BsEnvelope className="text-xs" />
                <span>support@shopethiopia.com</span>
              </div>
            </div>
          </div>

          {/* Middle Section - Promo Banner */}
          <div className="hidden md:block">
            <div className="bg-amber-500 text-black px-3 py-1 rounded-full text-xs font-bold animate-pulse">
              <strong>FREE SHIPPING </strong>
              THIS WEEK ON ORDERS OVER 55 Birr
            </div>
          </div>

          {/* Right Section - User Controls */}
          <div className="flex items-center space-x-4">
            {/* Quick Links */}
            <div className="hidden lg:flex items-center space-x-4 text-xs">
              <a href="#" className="hover:text-amber-400 transition-colors duration-300 flex items-center">
                <FiUser className="mr-1" /> My Account
              </a>
              <a href="#" className="hover:text-amber-400 transition-colors duration-300 flex items-center">
                <FiHeart className="mr-1" /> Wishlist
              </a>
              <a href="#" className="hover:text-amber-400 transition-colors duration-300 flex items-center">
                <FiShoppingBag className="mr-1" /> Orders
              </a>
            </div>

            {/* Language & Currency Selector */}
            <div className="flex items-center space-x-2">
              <div className="relative group">
                <select
                  name="currency"
                  id="currency"
                  className="bg-transparent text-white text-xs py-1 pl-2 pr-6 appearance-none focus:outline-none border-r border-gray-600"
                >
                  <option value="USD $">USD $</option>
                  <option value="ETB">ETB</option>
                  <option value="EUR €">EUR €</option>
                </select>
                <BsChevronDown className="absolute right-1 top-1/2 transform -translate-y-1/2 text-xs pointer-events-none" />
              </div>
              
              <div className="relative group">
                <select
                  name="language"
                  id="language"
                  className="bg-transparent text-white text-xs py-1 pl-2 pr-6 appearance-none focus:outline-none"
                >
                  <option value="English">English</option>
                  <option value="Amharic">Amharic</option>
                  <option value="French">French</option>
                </select>
                <BsChevronDown className="absolute right-1 top-1/2 transform -translate-y-1/2 text-xs pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;