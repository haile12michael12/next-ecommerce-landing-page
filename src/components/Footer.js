import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="bg-blackish text-gray-400 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Logo & About */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Konjo Store</h2>
            <p className="text-sm">
              Your go-to destination for premium products at unbeatable prices.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white transition">Home</Link></li>
              <li><Link href="/products" className="hover:text-white transition">Products</Link></li>
              <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Newsletter</h3>
            <p className="text-sm mb-4">Get updates on new arrivals and exclusive offers.</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="p-2 rounded-l-md text-sm w-full text-black focus:outline-none"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-r-md transition"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li>Email: support@konjo-store.com</li>
              <li>Phone: +251 955160603</li>
              <li>Address: Addis Ababa, Ethiopia</li>
            </ul>
          </div>
        </div>

        {/* Social Media */}
        <div className="flex justify-center md:justify-between items-center flex-wrap mt-12 border-t border-gray-700 pt-6 gap-6">
          <div className="flex space-x-6">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>

          {/* Payment Icons (Optional) */}
          <div className="flex space-x-4">
            <Image src="/icons/visa.svg" alt="Visa" width={40} height={24} />
            <Image src="/icons/mastercard.svg" alt="MasterCard" width={40} height={24} />
            <Image src="/icons/paypal.svg" alt="PayPal" width={40} height={24} />
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-sm">
          &copy; {new Date().getFullYear()} Konjo Store. All Rights Reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
