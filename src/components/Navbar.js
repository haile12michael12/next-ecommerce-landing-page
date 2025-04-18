'use client'
import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { FaFire } from "react-icons/fa";

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isHovering, setIsHovering] = useState(false);

  const navItems = [
    { 
      name: "HOME", 
      href: "#",
      isActive: true
    },
    { 
      name: "CATEGORIES", 
      href: "#",
      dropdown: [
        { name: "Electronics", href: "#", new: true },
        { name: "Fashion", href: "#" },
        { name: "Home & Garden", href: "#" },
        { name: "Beauty & Care", href: "#" },
        { name: "Sports & Outdoors", href: "#" }
      ]
    },
    { 
      name: "MEN'S", 
      href: "#",
      dropdown: [
        { name: "Clothing", href: "#" },
        { name: "Shoes", href: "#", sale: true },
        { name: "Accessories", href: "#" },
        { name: "Watches", href: "#" }
      ]
    },
    { 
      name: "WOMEN'S", 
      href: "#",
      dropdown: [
        { name: "Clothing", href: "#", new: true },
        { name: "Shoes", href: "#" },
        { name: "Bags", href: "#", sale: true },
        { name: "Jewelry", href: "#" }
      ]
    },
    { 
      name: "JEWELRY", 
      href: "#",
      dropdown: [
        { name: "Necklaces", href: "#" },
        { name: "Bracelets", href: "#" },
        { name: "Earrings", href: "#", new: true },
        { name: "Rings", href: "#" }
      ]
    },
    { 
      name: "PERFUME", 
      href: "#",
      dropdown: [
        { name: "Men's Fragrance", href: "#" },
        { name: "Women's Fragrance", href: "#" },
        { name: "Unisex", href: "#" }
      ]
    },
    { name: "BLOG", href: "#" },
    { 
      name: "HOT OFFERS", 
      href: "#",
      icon: <FaFire className="ml-1 text-amber-500" />,
      highlight: true,
      dropdown: [
        { name: "Flash Sale", href: "#", sale: true },
        { name: "Clearance", href: "#", sale: true },
        { name: "Bundle Deals", href: "#" }
      ]
    }
  ];

  const toggleDropdown = (itemName) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-40">
      {/* Desktop Navbar */}
      <div className="hidden lg:block border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <ul className="flex space-x-1">
              {navItems.map((item, index) => (
                <li 
                  key={index} 
                  className="relative group"
                  onMouseEnter={() => {
                    setIsHovering(true);
                    if (item.dropdown) setActiveDropdown(item.name);
                  }}
                  onMouseLeave={() => {
                    setIsHovering(false);
                    setActiveDropdown(null);
                  }}
                >
                  <a
                    href={item.href}
                    className={`flex items-center px-4 py-4 font-medium transition-colors duration-200 ${
                      item.isActive 
                        ? 'text-amber-600 border-b-2 border-amber-600' 
                        : item.highlight 
                          ? 'text-red-600 hover:text-red-700' 
                          : 'text-gray-700 hover:text-amber-600'
                    }`}
                    onClick={(e) => {
                      if (item.dropdown) {
                        e.preventDefault();
                        toggleDropdown(item.name);
                      }
                    }}
                  >
                    {item.name}
                    {item.icon && item.icon}
                    {item.dropdown && (
                      activeDropdown === item.name ? 
                      <FiChevronUp className="ml-1 text-xs opacity-70" /> : 
                      <FiChevronDown className="ml-1 text-xs opacity-70" />
                    )}
                  </a>

                  {item.dropdown && activeDropdown === item.name && (
                    <div 
                      className={`absolute left-1/2 transform -translate-x-1/2 mt-0 w-56 bg-white shadow-lg rounded-b-md py-2 z-50 ${
                        isHovering ? 'animate-fadeIn' : 'animate-fadeOut'
                      }`}
                    >
                      {item.dropdown.map((subItem, subIndex) => (
                        <a
                          key={subIndex}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-600 relative"
                        >
                          {subItem.name}
                          {subItem.new && (
                            <span className="absolute right-3 top-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                              New
                            </span>
                          )}
                          {subItem.sale && (
                            <span className="absolute right-3 top-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                              Sale
                            </span>
                          )}
                        </a>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile Navbar Toggle */}
      <div className="lg:hidden bg-white py-3 px-4 flex justify-between items-center border-b border-gray-200">
        <button className="text-gray-700">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="text-xl font-bold text-gray-800">Konjo Store</div>
        <div className="w-6"></div> {/* Spacer for alignment */}
      </div>
    </nav>
  );
};

export default Navbar;