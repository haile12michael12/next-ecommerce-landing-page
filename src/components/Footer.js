import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="bg-blackish text-gray-500 py-8">
      <div className="container mx-auto px-4">
        {/* Grid Layout for Footer Sections */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">About Us</h3>
            <p className="text-sm">
              We are a leading e-commerce platform offering the best products at affordable prices.
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-sm hover:text-white">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Newsletter</h3>
            <p className="text-sm mb-4">
              Subscribe to our newsletter for the latest updates and offers.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="p-2 rounded-l-lg text-sm text-gray-900 focus:outline-none flex-grow"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 rounded-r-lg hover:bg-blue-700"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Contact Information Section */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-sm">Email: support@konjo-store.com</li>
              <li className="text-sm">Phone: +251 955160603</li>
              <li className="text-sm">Address: Addis Ababa,  Ethiopia</li>
            </ul>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6 mt-8">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-white"
          >
            <i className="fab fa-facebook"></i>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-white"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-white"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-white"
          >
            <i className="fab fa-linkedin"></i>
          </a>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} konjo-store. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;