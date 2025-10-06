"use client";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[rgb(24,35,55)] text-white py-14 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-[#1daa61]">Arya Enterprises</h3>
            <p className="text-gray-300 leading-relaxed">
              Illuminating your moments with elegant LED gifts and home decor.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#1daa61]">Products</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#" className="hover:text-[#1daa61] transition-colors">
                  LED Photo Frames
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#1daa61] transition-colors">
                  Smart Night Lamps
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#1daa61] transition-colors">
                  Decorative Lights
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#1daa61] transition-colors">
                  Gift Sets
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#1daa61]">Support</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#" className="hover:text-[#1daa61] transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#1daa61] transition-colors">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#1daa61] transition-colors">
                  Returns & Refunds
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#1daa61] transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#1daa61]">Join Our Newsletter</h4>
            <p className="text-gray-300 mb-3 text-sm">
              Get updates on new collections and exclusive offers.
            </p>
            <div className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg text-gray-800 focus:ring-2 focus:ring-[#1daa61] focus:outline-none"
              />
              <button className="w-full bg-[#1daa61] hover:bg-[#179c58] text-white px-4 py-2 rounded-lg font-semibold transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-10 pt-8 flex flex-col md:flex-row items-center justify-between text-gray-400 text-sm">
          <p>&copy; 2025 Arya Enterprises. All rights reserved.</p>
          <div className="flex gap-5 mt-4 md:mt-0">
            <a href="#" className="hover:text-[#1daa61] transition-colors">Facebook</a>
            <a href="#" className="hover:text-[#1daa61] transition-colors">Instagram</a>
            <a href="#" className="hover:text-[#1daa61] transition-colors">LinkedIn</a>
          </div>
        </div>

        {/* Created by section */}
        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>
            Designed & Developed by{" "}
            <a
              href="https://aydsoftware.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1daa61] hover:text-[#17c36e] font-semibold transition-colors"
            >
              AYD Software
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
