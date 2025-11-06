"use client";
import React, { useState, useEffect, useRef } from "react";
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
import { fetchProducts } from "@/redux/features/productSlice";
import toast from "react-hot-toast";
import Categories from "../Categories";
import { getUserCart } from "@/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { removeFromCart } from "@/redux/features/cartSlice";
import Link from "next/link";
import { removeFromCartBackend } from "@/redux/features/cartSlice";
interface MenuItem {
  name: string;
  subItems: string[];
}

interface DropdownProduct {
  _id?: string;
  id?: string;
  name: string;
  price?: number;
  images?: string[];
  model3D?: string;
}
interface HeaderProps {
  cart: any[];
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Header({ menuOpen, setMenuOpen }: HeaderProps) {

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("@google/model-viewer");
    }
  }, []);

  const router = useRouter();

  const dispatch = useAppDispatch();

  const [loadingDropdown, setLoadingDropdown] = useState(false);

  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [dropdownProducts, setDropdownProducts] = useState<Record<string, DropdownProduct[]>>({});
  const [dropdownPositions, setDropdownPositions] = useState<Record<string, { top: number; left: number }>>({});
  const menuRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);;
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const fetchCategoryProducts = async (category: string) => {
    if (!category) return;
    if (dropdownProducts[category]) return;

    try {
      setLoadingDropdown(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products?categories=${encodeURIComponent(category)}`
      );

      if (!res.ok) throw new Error("Failed to fetch products");

      const data = await res.json();
      console.log(`📦 Products for ${category}:`, data);

      setDropdownProducts((prev) => ({
        ...prev,
        [category]: data || [],
      }));
    } catch (err) {
      console.error(`❌ Error fetching ${category} products:`, err);
    } finally {
      setLoadingDropdown(false);
    }
  };

  const handleProductClick = (productId: string) => {
    if (!productId) return;
    router.push(`/product/${productId}`);
  };
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement | null>(null);

  const user = useAppSelector((state: any) => state.user.user);
  const localCart = useAppSelector((state: any) => state.cart.items);
  const backendCart = useAppSelector((state: any) => state.cart);

  // ✅ Determine cart items based on user login
  const cart = user ? backendCart.items || [] : localCart;
  useEffect(() => {
    if (hoveredMenu && menuRefs.current[hoveredMenu]) {
      const rect = menuRefs.current[hoveredMenu].getBoundingClientRect();
      setDropdownPositions(prev => ({
        ...prev,
        [hoveredMenu]: {
          top: rect.bottom,
          left: rect.left
        }
      }));
    }
  }, [hoveredMenu]);
  useEffect(() => {
    if (hoveredMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [hoveredMenu]);
  const handleMouseEnter = (menuName: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHoveredMenu(menuName);

    // 👇 Fetch products for hovered category
    fetchCategoryProducts(menuName);

    if (menuRefs.current[menuName]) {
      const rect = menuRefs.current[menuName].getBoundingClientRect();
      setDropdownPositions((prev) => ({
        ...prev,
        [menuName]: {
          top: rect.bottom,
          left: rect.left,
        },
      }));
    }
  };


  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHoveredMenu(null);
    }, 150);
  };

  const handleDropdownEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleDropdownLeave = () => {
    setHoveredMenu(null);
  };
  // ✅ Compute total based on login state
  const total = user
    ? backendCart.totalAmount?.toFixed(2) || "0.00"
    : cart.length > 0
      ? cart
        .reduce((sum: number, item: any) => sum + item.price * (item.quantity || 1), 0)
        .toFixed(2)
      : "0.00";
  useEffect(() => {
    if (user) {
      dispatch(getUserCart(user.uid)); // keeps cart in sync after login
    }
  }, [user, dispatch]);
  // 🟢 SEARCH STATES
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);

  // 🔍 Handle live search (fetch from backend)
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (query.trim().length > 1) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/products?search=${encodeURIComponent(
              query
            )}`
          );
          const data = await res.json();
          setSearchResults(data);
          setSearchOpen(true);
        } catch (err) {
          console.error("Search failed", err);
        }
      } else {
        setSearchResults([]);
        setSearchOpen(false);
      }
    }, 400); // debounce

    return () => clearTimeout(delayDebounce);
  }, [query]);
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(e.target as Node)
      ) {
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleSearchSelect = (productId: string) => {
    setQuery("");
    setSearchResults([]);
    setSearchOpen(false);
    router.push(`/product/${productId}`);
  };

  const handleCheckout = () => {
    if (!user) {
      toast.error("Please log in to continue checkout.");
      router.push("/signin"); // or your login page route
      return;
    } router.push("/checkout");
  }
  const handleClick = (name: string) => {

    dispatch(fetchProducts(name));   // ✅ same just like Categories
    const section = document.getElementById("productgrid");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`);
        if (!res.ok) throw new Error("Failed to fetch categories");

        const data = await res.json();
        console.log("📂 Fetched categories:", data);
        // 🧩 Normalize to match your UI structure
        const formattedMenus = data.map((cat: any) => ({
          name: cat.name || "Unnamed Category",
          subItems:
            cat.subcategories?.length > 0
              ? cat.subcategories.map((sub: any) => sub.name || sub)
              : [""],
        }));

        setMenus(formattedMenus);
      } catch (error) {
        console.error("❌ Error loading categories:", error);
        setMenus([]); // fallback
      } finally {
        setLoading(false);
      }
    };
    const fetchLogo = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/logo`);
        if (!res.ok) throw new Error("Failed to fetch logo");
        const data = await res.json();
        if (data?.logoUrl) setLogoUrl(data.logoUrl);
      } catch (err) {
        console.error("❌ Failed to fetch logo:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLogo();
    fetchCategories();
  }, []);

  return (
    <header className="w-full fixed top-0 left-0 border-gray-200 shadow-sm z-[1000] bg-white transition-all duration-300">

      {/* --- MAIN HEADER --- */}
      <div className="bg-white py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group transition-all"
          >
            {!loading && logoUrl ? (
              <div className="relative w-[42px] h-[42px] sm:w-[48px] sm:h-[48px]">
                <Image
                  src={logoUrl}
                  alt="Company Logo"
                  fill
                  sizes="48px"
                  className="object-contain rounded-md transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            ) : (

              <span className="text-[#1daa61] font-bold text-lg leading-tight text-center">
                Arya
                <br />
                <span className="text-gray-800 font-medium">Enterprises</span>
              </span>
            )}
          </Link>

          {/* Search (Desktop)x */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8 relative" ref={searchRef}>
            <input
              type="text"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full border border-gray-300 rounded-full py-1 pl-5 pr-10 text-gray-700 focus:ring-2 focus:ring-[#1daa61] focus:outline-none placeholder-gray-400"
            />
            <Search className="absolute right-3 top-2 text-gray-500 w-4 h-4" />

            {/* 🔽 SEARCH RESULTS DROPDOWN */}
            {searchOpen && searchResults.length > 0 && (
              <div className="absolute top-full mt-18 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-80 overflow-y-auto z-100">
                {searchResults.map((product: any) => (
                  <div
                    key={product._id}
                    onClick={() => handleSearchSelect(product._id)}
                    className="flex items-center gap-3 p-2 hover:bg-[#f5fff9] cursor-pointer"
                  >
                    <Image
                      src={product.images?.[0] || "/placeholder.png"}
                      alt={product.name}
                      width={40}
                      height={40}
                      className="rounded-lg object-cover"
                    />
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{product.name}</p>
                      <p className="text-xs text-[#1daa61] font-medium">₹{product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-5">
            {/* 🛒 CART ICON */}
            <button className="relative" onClick={() => setCartOpen(true)}>
              <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-[#1daa61]" />
              <span className="absolute -top-1 -right-2 bg-[#1daa61] text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                {user
                  ? backendCart.totalQuantity || 0
                  : cart.reduce((sum, i) => sum + (i.quantity || 1), 0)}

              </span>

            </button>

            {/* 👤 USER */}
            <button onClick={() => router.push("/account")}>
              <User className="w-6 h-6 text-gray-700 hover:text-[#1daa61]" />
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
      <nav className="hidden md:block border-t border-gray-100 bg-white relative overflow-visible z-50 px-20">
        <div className="relative">
          {/* Scrollable container */}
          <div className="menu-scroll-wrapper overflow-x-auto overflow-y-visible">
            <div className="menu-scroll flex items-center justify-start space-x-10 px-6 max-w-7xl mx-auto">
              <span
                className="text-gray-800 font-semibold hover:text-[#1daa61] text-sm cursor-pointer"
                onClick={() => router.push("/")}
              >
                Home
              </span>
              <span
                className="text-gray-800 font-semibold hover:text-[#1daa61] text-sm cursor-pointer"
                onClick={() => router.push("/category/all")}
              >
                View All
              </span>

              {menus.map((menu, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    menuRefs.current[menu.name] = el;
                  }}
                  className="relative py-4 flex items-center gap-1"
                >
                  {/* ✅ Clicking name calls handleClick (NOT dropdown) */}
                  <span
                    className="cursor-pointer text-[15px] font-semibold text-gray-700 hover:text-[#1daa61]"
                    onClick={() => handleClick(menu.name)}
                  >
                    {menu.name}
                  </span>

                  {/* ✅ Only icon triggers dropdown */}
                  <ChevronDown
                    className="w-4 h-4 cursor-pointer text-gray-700 hover:text-[#1daa61] transition-transform duration-300"
                    onMouseEnter={() => handleMouseEnter(menu.name)}
                    onClick={() => handleMouseEnter(menu.name)}
                  />
                </div>


              ))}
            </div>
          </div>
          {/* Dropdowns - rendered outside scroll container */}
          {hoveredMenu && dropdownPositions[hoveredMenu] && (
            <div
              className="fixed w-52 bg-white rounded-2xl border border-[#1daa61]/20 shadow-[0_6px_25px_rgba(0,0,0,0.1)] z-[9999]"
              style={{
                top: `${dropdownPositions[hoveredMenu].top + 8}px`,
                left: `${dropdownPositions[hoveredMenu].left}px`
              }}
              onMouseEnter={handleDropdownEnter}
              onMouseLeave={handleDropdownLeave}
            >
              <div
                className="py-3 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
                style={{
                  overscrollBehavior: "contain", // prevent page from scrolling
                }}
              >
                {loadingDropdown ? (
                  <p className="px-4 py-3 text-gray-500 text-sm">Loading...</p>
                ) : dropdownProducts[hoveredMenu]?.length ? (
                  dropdownProducts[hoveredMenu].map((product, i) => (
                    <button
                      key={i}
                      onClick={() => handleProductClick(product._id || product.id)}
                      className="w-full text-left px-4 py-2 flex items-center gap-3 hover:bg-[#f5fff9] transition-all"
                    >
                      {product.images?.length > 0 ? (
                        // 🖼️ Show first image if available
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          width={30}
                          height={30}
                          className="rounded-md object-cover"
                        />
                      ) : product.model3D ? (
                        // 🧩 Show 3D model preview if no images but model3D exists
                        <model-viewer
                          src={product.model3D}
                          alt={product.name}
                          camera-controls
                          auto-rotate
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "0.25rem",
                            background: "#f9fafb",
                            border: "1px solid #e5e7eb",
                          }}
                        ></model-viewer>
                      ) : (
                        // 🪫 Fallback placeholder
                        <Image
                          src="/placeholder.png"
                          alt={product.name}
                          width={30}
                          height={30}
                          className="rounded-md object-cover"
                        />
                      )}

                      <div className="flex flex-col items-start">
                        <span className="text-[14px] text-gray-700">{product.name}</span>
                      </div>
                    </button>

                  ))
                ) : (
                  <p className="px-4 py-3 text-gray-500 text-sm">No products found</p>
                )}
              </div>

            </div>
          )}
        </div>
      </nav>
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-[60] ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"
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
            <details
              key={index}
              className="group overflow-y-auto"
              onToggle={(e) => {
                const details = e.target as HTMLDetailsElement;

                if (details.open) {
                  details.scrollIntoView({ behavior: "smooth", block: "start" });
                  fetchCategoryProducts(menu.name);
                }
              }}
            >
              <summary className="flex items-center justify-between cursor-pointer font-medium text-gray-800 hover:text-[#1daa61]">
                {menu.name}
                <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
              </summary>

              {/* Subcategories */}
              <div className="mt-2 ml-2 flex flex-col space-y-2 border-l pl-3 border-gray-200">

                {menu.subItems.map((item, i) => (
                  <span
                    key={i}
                    className="text-gray-600 hover:text-[#1daa61] text-sm cursor-pointer"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Products */}
              {dropdownProducts[menu.name]?.length > 0 ? (
                <div
                  className="mt-3 ml-4 flex flex-col space-y-3 max-h-64 overflow-y-auto pr-2"
                  onWheel={(e) => e.stopPropagation()}   // ✅ prevents page scroll
                >

                  {dropdownProducts[menu.name].map((product, i) => (
                    <button
                      key={i}
                      onClick={() => handleProductClick(product._id || product.id)}
                      className="flex items-center gap-3 text-left hover:bg-[#f5fff9] p-2 rounded-lg"
                    >
                      {product.images?.length > 0 ? (
                        // 🖼️ Show first image if available
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          width={30}
                          height={30}
                          className="rounded-md object-cover"
                        />
                      ) : product.model3D ? (
                        // 🧩 Show 3D model preview if no images but model3D exists
                        <model-viewer
                          src={product.model3D}
                          alt={product.name}
                          camera-controls
                          auto-rotate
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "0.25rem",
                            background: "#f9fafb",
                            border: "1px solid #e5e7eb",
                          }}
                        ></model-viewer>) : (
                        // 🪫 Fallback placeholder
                        <Image
                          src="/placeholder.png"
                          alt={product.name}
                          width={30}
                          height={30}
                          className="rounded-md object-cover"
                        />
                      )}
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {product.name.length > 20
                            ? product.name.substring(0, 20) + "..."
                            : product.name}
                        </p>
                        <p className="text-xs text-[#1daa61] font-semibold">
                          ₹{product.price}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 ml-4 mt-2">No products found</p>
              )}
            </details>
          ))}

        </div>
      </div>

      {/* --- CART SIDEBAR --- */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-[70] ${cartOpen ? "translate-x-0" : "translate-x-full"
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
            cart.map((item, index) => {
              const product = item.productId || item;    // backend or guest cart
              const productId =
                typeof item.productId === "object"
                  ? item.productId._id        // populated object
                  : item.productId || item._id; // plain string or local cart

              const imageSrc =
                product.images?.[0] ||                   // backend image
                item.image ||                             // guest cart image
                "/placeholder.png";

              const name = product.name || item.name;
              const price = product.price || item.price;

              return (
                <div key={index} className="flex items-center justify-between p-4">
                  {/* ✅ Clicking product opens product page */}
                  <div
                    className="flex items-center space-x-3 cursor-pointer"
                    onClick={() => router.push(`/product/${productId}`)}
                  >
                    <Image
                      src={imageSrc}
                      alt={name}
                      width={50}
                      height={50}
                      className="rounded-lg object-cover border"
                    />

                    <div>
                      <h3 className="text-sm font-semibold text-gray-800">{name}</h3>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      <p className="text-[#1daa61] font-semibold text-sm">₹{price}</p>
                    </div>
                  </div>

                  {/* 🗑 Remove */}
                  <button className="text-gray-500 hover:text-red-500 transition">
                    <Trash2
                      className="w-5 h-5"
                      onClick={() => {
                        if (user) {
                          dispatch(removeFromCartBackend({ uid: user.uid, productId: productId }))
                            .unwrap()
                            .then(() => toast.error(`${name} removed 🗑️`))
                            .catch((err: any) => toast.error(err.message));
                        } else {
                          dispatch(removeFromCart(productId));
                          toast.error(`${name} removed 🗑️`);
                        }
                      }}
                    />
                  </button>
                </div>
              );
            }))}


        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-gray-200">
            <div className="flex justify-between text-gray-700 text-sm mb-3">
              <span>Subtotal</span>
              <span className="font-semibold">₹{total}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-[#1daa61] text-white py-2 rounded-full font-semibold hover:bg-[#179d56] transition"
            >
              Checkout
            </button>
          </div>
        )}
      </div>

      {/* Overlay */}
      {(mobileMenuOpen || cartOpen) && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[50]"
          onClick={() => {
            setMobileMenuOpen(false);
            setCartOpen(false);
          }}
        ></div>
      )}
      <style jsx>{`
  .menu-scroll-wrapper {
    position: relative;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    white-space: nowrap;
  }

  .menu-scroll {
    display: inline-flex;
    white-space: nowrap;
    position: relative;
    z-index: 10;
  }

  /* Hide scrollbar */
  .menu-scroll-wrapper::-webkit-scrollbar {
    display: none;
  }
  .menu-scroll-wrapper {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
@keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
  /* Prevent vertical expansion */
  nav {
    overflow-y: visible !important;
  }
`}</style>



<div className="md:hidden block ">  
  <Categories />
</div>
    </header>
  );
}

