"use client";
import Link from "next/link";

import React, { useState } from "react";

export default function Footer() {
  const handleSubscribe = async (e) => {
    e.preventDefault();

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    try {
      // Example API call (replace with your real API endpoint)
      // await fetch("/api/subscribe", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email }),
      // });

      // Simulate success for now
      setTimeout(() => {
        setStatus("success");
        setMessage("🎉 You’ve successfully subscribed!");
        setEmail("");
      }, 1000);
    } catch (error) {
      setStatus("error");
      setMessage("Something went wrong. Please try again later.");
    }
  };
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(""); // "success" or "error"
  return (
    <footer className="bg-[rgb(24,35,55)] text-white py-14 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-[#1daa61]">Arya Enterprises</h3>
            <p className="text-gray-300 leading-relaxed">
              Illuminating your moments with elegant LED gifts and home decor.
            </p>
          </div>


          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#1daa61]">Support</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/contact" className="hover:text-[#1daa61] transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-[#1daa61] transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="hover:text-[#1daa61] transition-colors">
                  Blogs                 </Link>
              </li>
              {/* <li>
                <Link href="/return&refund" className="hover:text-[#1daa61] transition-colors">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                 <Link href="/privacy_policy" className="hover:text-[#1daa61] transition-colors">
                  Privacy Policy
                </Link>
              </li> * */}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#1daa61]">Support</h4>
            <ul className="space-y-2 text-gray-300">

              <li>
                <Link href="/return&refund" className="hover:text-[#1daa61] transition-colors">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link href="/privacy_policy" className="hover:text-[#1daa61] transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-10 pt-8 flex flex-col md:flex-row items-center justify-between text-gray-400 text-sm">
          <p>&copy; 2025 Arya Enterprises. All rights reserved.</p>
          <div className="flex gap-5 mt-4 md:mt-0">
            <Link href="/contact" className="hover:text-[#1daa61] transition-colors">Facebook</Link>
            <Link href="#" className="hover:text-[#1daa61] transition-colors">Instagram</Link>
            <Link href="#" className="hover:text-[#1daa61] transition-colors">LinkedIn</Link>
          </div>
        </div>

        {/* Created by section */}
        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>
            Designed & Developed by{" "}
            <a
              href="https://www.aydpm.in/"
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
