

"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState ,useEffect} from "react";
import { Mail, Phone, Clock, Facebook, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState(""); 
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(""); // success / error
  const [loading, setLoading] = useState(false);
  const [logoUrl, setLogoUrl] = useState("");
 useEffect(() => {
     const fetchLogo = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/logo`);
        if (!res.ok) throw new Error("Failed to fetch logo");
        const data = await res.json();
        if (data?.logoUrl) setLogoUrl(data.logoUrl);
        setDescription(data?.description || "");  
      } catch (err) {
        console.error("❌ Failed to fetch logo:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLogo();
 }, []);
  return (
    <footer className="bg-[#182337] text-white py-14 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

          {/* ✅ Brand + Description */}
          <div>
            <Image
              src={logoUrl?logoUrl:null} // ⭐ change to logo url (public folder or cloudinary)
              alt="Arya Enterprises Logo"
              width={120}
              height={120}
              className="mb-3 object-contain"
            />

            <p className="text-gray-300 leading-relaxed pr-8">
            {description}
            </p>

            {/* ✅ Social Icons */}
            <div className="flex space-x-4 mt-4">
              <Link href="https://facebook.com" target="_blank">
                <Facebook className="w-6 h-6 hover:text-[#1daa61] transition" />
              </Link>

              <Link href="https://instagram.com" target="_blank">
                <Instagram className="w-6 h-6 hover:text-[#1daa61] transition" />
              </Link>

              <Link href="https://linkedin.com" target="_blank">
                <Linkedin className="w-6 h-6 hover:text-[#1daa61] transition" />
              </Link>
            </div>
          </div>

          {/* ✅ Support Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#1daa61]">Support</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/contact" className="hover:text-[#1daa61]">Contact Us</Link></li>
              <li><Link href="/shipping" className="hover:text-[#1daa61]">Shipping Info</Link></li>
              <li><Link href="/blogs" className="hover:text-[#1daa61]">Blogs</Link></li>
            </ul>
          </div>

          {/* ✅ Policies */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#1daa61]">Policies</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/return&refund" className="hover:text-[#1daa61]">Returns & Refunds</Link></li>
              <li><Link href="/privacy_policy" className="hover:text-[#1daa61]">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* ✅ Contact Details */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#1daa61]">Contact</h4>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-[#1daa61]" />
                +91 98765 43210
              </li>

              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#1daa61]" />
                support@aryaenterprises.in
              </li>

              <li className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#1daa61]" />
                Mon – Sat, 10 AM – 6 PM
              </li>
            </ul>
          </div>
        </div>

        {/* ✅ Divider */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-gray-400 text-sm flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} Arya Enterprises. All rights reserved.</p>

          <p className="mt-3 md:mt-0">
            Designed by{" "}
            <a
              href="https://www.aydpm.in/"
              target="_blank"
              className="text-[#1daa61] hover:text-[#17c36e] font-semibold"
            >
              AYD Software
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
