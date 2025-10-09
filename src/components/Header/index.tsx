"use client";
import React, { useState } from "react";
import {
  Search,
  ShoppingCart,
  User,
  ChevronDown,
  Menu,
  X,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import { useSelector ,useDispatch} from "react-redux";
import { useRouter } from "next/navigation";
interface HeaderProps {
  cart: any[];
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
import { removeFromCart } from "@/redux/features/cartSlice";
import Link from "next/link";
export default function Header({  menuOpen, setMenuOpen }: HeaderProps) {
  const router = useRouter();
const dispatch = useDispatch();
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
 const cart = useSelector((state: any) => state.cart.items);
  const totalQuantity = useSelector((state: any) => state.cart.totalQuantity);
  const menus = [
    { name: "Electronics", subItems: ["Speakers", "Smart Lights", "Headphones", "Smart Watches"] },
    { name: "Decor", subItems: ["LED Frames", "Table Lamps", "Wall Lights", "Gift Sets"] },
    { name: "Luxury", subItems: ["Premium Gifts", "Exclusive Series", "Crystal Edition"] },
    { name: "Brands", subItems: ["Lumina", "GlowArt", "Decora", "EliteLight"] },
    { name: "Collections", subItems: ["Festive", "Minimalist", "Romantic", "Office"] },
  ];

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
console.log()
  return (
    <header className="w-full border-gray-200 shadow-sm relative overflow-visible z-50 bg-white">
      {/* --- MAIN HEADER --- */}
      <div className="bg-white py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4">
          {/* Logo */}
          <Link  href="/"className="flex items-center">
            <span className="text-[#1daa61] font-bold text-lg leading-tight text-center">
              Arya<br />
              <span className="text-gray-800 font-medium">Enterprises</span>
            </span>
          </Link>

          {/* Search (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8 relative">
            <input
              type="text"
              placeholder="Search Products"
              className="w-full border border-gray-300 rounded-full py-1 pl-5 pr-10 text-gray-700 focus:ring-2 focus:ring-[#1daa61] focus:outline-none placeholder-gray-400"
            />
            <Search className="absolute right-3 top-2 text-gray-500 w-4 h-4" />
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-5">
            {/* 🛒 CART ICON */}
            <button
              className="relative"
              onClick={() => setCartOpen(true)} // ✅ Opens  on click
            >
              <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-[#1daa61]" />
              <span className="absolute -top-1 -right-2 bg-[#1daa61] text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            </button>

            {/* 👤 USER */}
            <button >
              <User onClick={()=>router.push("/account")} className="w-6 h-6 text-gray-700 hover:text-[#1daa61]" />
            </button>

            {/* ☰ MENU ICON (Mobile) */}
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

      {/* --- NAVIGATION (Desktop) --- */}
      <nav className="hidden md:block border-t border-gray-100 bg-white relative">
        <div className="max-w-7xl mx-auto flex items-center justify-start space-x-10 px-6">
          {menus.map((menu, index) => (
            <div
              key={index}
              className="relative py-4 group"
              onMouseEnter={() => setHoveredMenu(menu.name)}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              <div className="flex items-center space-x-1 cursor-pointer text-[15px] font-semibold text-gray-700 transition-all duration-200 group-hover:text-[#1daa61]">
                <span>{menu.name}</span>
                <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
              </div>

              <div
                className={`absolute left-1/2 -translate-x-1/2 top-[calc(100%+6px)] w-52 bg-white rounded-2xl border border-[#1daa61]/20 shadow-[0_6px_25px_rgba(0,0,0,0.1)] transition-all duration-300 ease-out z-50 ${
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
              </div>

              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#1daa61] transition-all duration-300 group-hover:w-full"></div>
            </div>
          ))}
        </div>
      </nav>

      {/* --- MOBILE MENU SIDEBAR --- */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-[60] ${
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

      {/* --- CART PREVIEW SIDEBAR --- */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-[70] ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Your Cart</h2>
          <button onClick={() => setCartOpen(false)}>
            <X className="w-6 h-6 text-gray-700 hover:text-[#1daa61]" />
          </button>
        </div>

        {/* Items */}
        <div className="flex flex-col divide-y divide-gray-100 overflow-y-auto max-h-[70vh]">
          {cart.length === 0 ? (
            <p className="text-center py-10 text-gray-500 text-sm">
              Your cart is empty.
            </p>
          ) : (
            cart.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-3">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={50}
                    height={50}
                    className="rounded-lg object-cover border"
                  />
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    <p className="text-[#1daa61] font-semibold text-sm">
                      ${item.price}
                    </p>
                  </div>
                </div>
                <button className="text-gray-500 hover:text-red-500 transition">
                  <Trash2 className="w-5 h-5"   onClick={() => {
    dispatch(removeFromCart(item._id || item.id));
    toast.error(`${item.name} removed from cart 🗑️`, {
      style: {
        background: "#dc2626",
        color: "#fff",
        borderRadius: "8px",
        fontWeight: 600,
        padding: "12px 20px",
        boxShadow: "0 6px 20px rgba(220,38,38,0.3)",
      },
    });
  }} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-gray-200">
            <div className="flex justify-between text-gray-700 text-sm mb-3">
              <span>Subtotal</span>
              <span className="font-semibold">${total}</span>
            </div>
            <button className="w-full bg-[#1daa61] text-white py-2 rounded-full font-semibold hover:bg-[#179d56] transition">
              Checkout
            </button>
          </div>
        )}
      </div>

      {/* Overlay for Cart or Mobile Menu */}
      {(mobileMenuOpen || cartOpen) && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[50]"
          onClick={() => {
            setMobileMenuOpen(false);
            setCartOpen(false);
          }}
        ></div>
      )}
    </header>
  );
}
