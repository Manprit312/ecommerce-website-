"use client";
import React, { useState } from "react";
import { Search, ShoppingCart, User, ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
interface HeaderProps {
  cart: any[];
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function Header({ cart, menuOpen, setMenuOpen }: HeaderProps) {
 const [hoveredMenu, setHoveredMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menus = [
    { name: "Electronics", subItems: ["Speakers", "Smart Lights", "Headphones", "Smart Watches"] },
    { name: "Decor", subItems: ["LED Frames", "Table Lamps", "Wall Lights", "Gift Sets"] },
    { name: "Luxury", subItems: ["Premium Gifts", "Exclusive Series", "Crystal Edition"] },
    { name: "Brands", subItems: ["Lumina", "GlowArt", "Decora", "EliteLight"] },
    { name: "Collections", subItems: ["Festive", "Minimalist", "Romantic", "Office"] },
  ];

  return (
    <header className="w-full border-gray-200 shadow-sm pt-4 relative overflow-visible z-50 bg-white">
      {/* --- MAIN HEADER --- */}
      <div className="bg-white py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-20 relative">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={200}
                height={260}
                className="object-cover"
              />
            </div>
            <span className="text-lg font-semibold text-gray-800 text-[#1daa61]">
              Arya Enterprises
            </span>
          </div>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8 relative">
            <input
              type="text"
              placeholder="Search Products"
              className="w-full border border-gray-300 rounded-full py-2 pl-5 pr-10 text-gray-700 focus:ring-2 focus:ring-[#1daa61] focus:outline-none placeholder-[#1daa61]-400"
            />
            <Search className="absolute right-3 top-2.5 text-gray-500 w-5 h-5" />
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-5">
            <button className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-[#1daa61]" />
              <span className="absolute -top-1 -right-2 bg-[#1daa61] text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                0
              </span>
            </button>
            <button>
              <User className="w-6 h-6 text-gray-700 hover:text-[#1daa61]" />
            </button>
            <button
              className="md:hidden block p-2 rounded-lg hover:bg-[#f5fff9] transition"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* --- DESKTOP NAVIGATION --- */}
      <nav className="hidden md:block border-t border-gray-100 bg-white relative">
        <div className="max-w-7xl mx-auto flex items-center justify-start space-x-10 px-6">
          {menus.map((menu, index) => (
            <div
              key={index}
              className="relative py-4 group"
              onMouseEnter={() => setHoveredMenu(menu.name)}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              {/* Menu label */}
              <div className="flex items-center space-x-1 cursor-pointer text-[15px] font-semibold text-gray-700 transition-all duration-200 group-hover:text-[#1daa61]">
                <span>{menu.name}</span>
                <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
              </div>

              {/* Dropdown */}
              <div
                className={`absolute left-1/2 -translate-x-1/2 top-[calc(100%+6px)] w-52 bg-white rounded-2xl border border-[#1daa61]-100 shadow-[0_6px_25px_rgba(0,0,0,0.1)] transition-all duration-300 ease-out z-50 ${
                  hoveredMenu === menu.name
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-2"
                }`}
              >
                <div className="py-3">
                  {menu.subItems.map((item, i) => (
                    <a
                      key={i}
                      href="#"
                      className="block px-5 py-2 text-[15px] text-gray-700 hover:text-[#1daa61] hover:bg-[#f5fff9] transition-all"
                    >
                      {item}
                    </a>
                  ))}
                </div>
                {/* pointer triangle */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1.5 w-3 h-3 rotate-45 bg-white border-t border-l border-gray-100 shadow-sm"></div>
              </div>

              {/* underline hover */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#1daa61] transition-all duration-300 group-hover:w-full"></div>
            </div>
          ))}
        </div>
      </nav>

      {/* --- MOBILE MENU --- */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
          <button onClick={() => setMobileMenuOpen(false)}>
            <X className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        <div className="flex flex-col p-4 space-y-4 overflow-y-auto">
          {menus.map((menu, index) => (
            <details key={index} className="group">
              <summary className="flex items-center justify-between cursor-pointer font-medium text-gray-800 hover:text-[#1daa61]">
                {menu.name}
                <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
              </summary>
              <div className="mt-2 ml-2 flex flex-col space-y-2 border-l pl-3 border-gray-200">
                {menu.subItems.map((item, i) => (
                  <a
                    key={i}
                    href="#"
                    className="text-gray-600 hover:text-[#1daa61] text-sm"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>

      {/* Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}
    </header>
  );
}
