
"use client";
import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Forward, ArrowLeft, ChevronLeft, ChevronRight, } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { addToCart } from "@/redux/features/cartSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Share2Icon } from "lucide-react";
import { fetchProducts } from "@/redux/features/productSlice";
import "swiper/css";
import { addToCartBackend } from "@/redux/features/cartSlice";
import toast from "react-hot-toast";
import NetworkBackground from "../background";
import "swiper/css/pagination"
import { Star, StarHalf, StarOff } from "lucide-react";
export default function ProductDetails({
  product,
  favorites = [],
  goBack,
  related = [], // optional related products
}) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("@google/model-viewer");
    }
  }, []);
  const user = useAppSelector((state) => state.user.user);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || "");
  const [quantity, setQuantity] = useState(1);
  const isFav = favorites.includes(product?.id);
  const [showShareModal, setShowShareModal] = useState(false);
  const [categoryNames, setCategoryNames] = useState([])
  const [relatedProducts, setRelatedProducts] = useState([])
  const dispatch = useAppDispatch()
  const total = useMemo(() => (product?.price || 0) * quantity, [product, quantity]);
  const router = useRouter();
  // Build gallery list – include 3D model as first thumbnail if exists
  const gallery = [
    ...(product?.model3D ? [{ type: "3d", src: product.model3D }] : []),
    ...(product?.images?.map((img) => ({ type: "image", src: img })) || []),
  ];
  const handleClick = (name) => {

    dispatch(fetchProducts(name));

    // ✅ Navigate to category page
    router.push(`/category/${encodeURIComponent(name)}`);
  };
  useEffect(() => {
    const fetchCategoryNames = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`);
        const data = await res.json();

        const matchedNames = data
          .filter((cat) => product.categories.includes(cat._id))
          .map((cat) => cat.name);

        setCategoryNames(matchedNames);
        console.log("🏷️ Fetched category names:", matchedNames);
      } catch (error) {
        console.error("❌ Failed to fetch categories:", error);
      }
    };

    if (product?.categories?.length) {
      fetchCategoryNames();
    }
  }, [product]);


  const inc = () => setQuantity((q) => Math.min(q + 1, 99));
  const dec = () => setQuantity((q) => Math.max(1, q - 1));

  const goPrev = () =>
    setActiveIndex((i) => (i - 1 + gallery.length) % gallery.length);

  const goNext = () =>
    setActiveIndex((i) => (i + 1) % gallery.length);

  console.log(product)
  const [tab, setTab] = useState("description");

  // ✅ Get related products
  useEffect(() => {
    if (!product?.categories?.length) return;

    const fetchRelatedProducts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
        const data = await res.json();

        const productCategoryIDs = product.categories.map((c) =>
          typeof c === "string" ? c : c._id
        );

        const related = data.filter((p) => {
          const ids = p.categories.map((c) =>
            typeof c === "string" ? c : c._id
          );

          return (
            p._id !== product._id && // exclude same product
            ids.some((cid) => productCategoryIDs.includes(cid))
          );
        });

        setRelatedProducts(related);
      } catch (err) {
        console.error("❌ Error fetching related:", err);
      }
    };

    fetchRelatedProducts();
  }, [product]);



  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 mt-20 " >
      {/* Header */}
      <NetworkBackground />

      {/* Product Detail Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between ">

  {/* Back to Shop */}
  <button
    onClick={goBack}
    className="flex items-center space-x-2 text-gray-700 hover:text-[#1daa61] transition-colors"
  >
    <ArrowLeft className="w-5 h-5" />
    <span className="font-medium text-xs sm:text-sm text-[#1daa61]">
      Back to Shop
    </span>
  </button>

  {/* Share */}
  <button
    onClick={() => setShowShareModal(true)}
    className="p-2 rounded-lg shadow-sm text-[#1daa61] transition-all duration-200 shrink-0 flex items-center gap-2"
  >
    <span className="font-medium text-xs sm:text-sm">Share</span>
    <Forward className="w-4 h-4 sm:w-5 sm:h-5 text-[#1daa61]" />
  </button>

</div>


        <div className="backdrop-transparent-lg rounded-3xl  overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 md:p-8">
            {/* Left: Gallery + Thumbs */}
            <div>
              <div className="relative rounded-2xl overflow-hidden bg-amber-100 p-1  rounded-xl">
                <AnimatePresence initial={false} mode="wait">

                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.35 }}
                    className="w-full flex items-center justify-center rounded-xl"
                  >
                    {gallery[activeIndex].type === "3d" ? (
                      <model-viewer
                        src={gallery[activeIndex].src}
                        alt={product.name}
                        camera-controls
                        auto-rotate
                        style={{
                          width: "100%",
                          height: "360px",
                          background: "#f5fff9",
                          borderRadius: "1rem",
                          border: "1px solid #e5e7eb",
                        }}
                      ></model-viewer>
                    ) : (
                      <Image
                        src={gallery[activeIndex].src}
                        alt={`${product?.name} ${activeIndex + 1}`}
                        width={300}
                        height={300}
                        className="object-contain max-h-[360px] rounded-xl "
                      />
                    )}



                  </motion.div>
                </AnimatePresence>
                {!product?.model3D && (
                  <>
                    <button
                      onClick={goPrev}
                      aria-label="previous"
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:scale-105"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={goNext}
                      aria-label="next"
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:scale-105"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
                {gallery.length > 0 && (
                  <div className="mt-4 flex items-center gap-3 overflow-x-auto pb-2">
                    {gallery.map((item, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveIndex(i)}
                        className={`rounded-lg overflow-hidden border-2 ${i === activeIndex ? "border-amber-400" : "border-transparent"
                          }`}
                      >
                        {item.type === "3d" ? (
                          <div className="w-[80px] h-[80px] flex items-center justify-center bg-gray-100 rounded-md border">
                            <model-viewer
                              alt={product.name}
                              camera-controls
                              auto-rotate
                              style={{
                                width: "100%",
                                height: "360px",
                                background: "#f5fff9",
                                borderRadius: "1rem",
                                border: "1px solid #e5e7eb",
                              }}
                            ></model-viewer>
                          </div>
                        ) : (
                          <Image
                            src={item.src}
                            alt={`thumb-${i}`}
                            width={80}
                            height={80}
                            className="object-cover"
                          />
                        )}
                      </button>
                    ))}
                  </div>
                )}

              </div>

              {/* Badge */}
              {product?.badge && (
                <div className="mt-4">
                  <span className="inline-block bg-gradient-to-r from-amber-500 to-orange-600 text-[#d0061] px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    {product.badge}
                  </span>
                </div>
              )}
            </div>

            {/* Right: Info + Actions */}
            <div >
              <h3 className="text-sm font-semibold text-gray-700 sm:mb-2">
                Categories
              </h3>
              <div className="flex items-center justify-between sm:mb-4">

                <div className="flex items-center gap-2 flex-wrap">


                  {categoryNames.map((cat) => (
                    <span
                      key={cat}
                      onClick={() => handleClick(cat)}
                      className="cursor-pointer text-xs bg-[#1daa61]/10 text-[#1daa61] px-3 py-1 rounded-full font-medium hover:bg-[#1daa61]/20 transition"
                    >
                      {cat}
                    </span>
                  ))}
                </div>

             

              </div>


              <div className="flex items-start justify-between mb-2 gap-4">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 flex-1">
                  {product?.name}
                </h1>


              </div>

              <div className="flex items-center gap-3 mb-4">

                {/* <div className="flex items-center">
                  {[...Array(5)].map((_, i) => {
                    const rating = product?.rating || 0;

                    if (i + 1 <= Math.floor(rating)) {
                      // FULL GOLD STAR
                      return (
                        <Star
                          key={i}
                          className="w-5 h-5"
                          style={{ color: "#FFD700", fill: "#FFD700" }}
                        />
                      );
                    }

                    if (i < rating && rating % 1 !== 0) {
                      // HALF GOLD STAR
                      return (
                        <StarHalf
                          key={i}
                          className="w-5 h-5"
                          style={{ color: "#FFD700", fill: "#FFD700" }}
                        />
                      );
                    }

                    // EMPTY STAR (light gray)
                    return (
                      <StarOff
                        key={i}
                        className="w-5 h-5"
                        style={{ color: "#D1D5DB" }}
                      />
                    );
                  })}
                </div> */}

                {/* <div className="text-sm text-gray-600">{product?.rating} ({product?.reviews} reviews)</div> */}
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-4">
                  <div className="text-4xl font-bold text-amber-600">  ₹{product?.price}</div>
                  {product?.originalPrice && (
                    <div className="text-gray-400 line-through">  ₹{product.originalPrice}</div>
                  )}
                </div>
                {product?.inStock ? (
                  <p className="text-green-600 font-medium mt-2">In Stock — Ready to Ship</p>
                ) : (
                  <p className="text-red-500 font-medium mt-2">Out of Stock</p>
                )}
              </div>

              {/* ✅ Combined Features + Specifications — replacing tabs section */}
              <div className="border-t  mt-8 rounded-b-3xl py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                  {/* Features Section */}
                  {product?.keyFeatures?.length > 0 && (
                    <div className="mb-8">
                      <h3 className="font-bold text-xl mb-4 text-gray-800"> Key Features</h3>
                      <ul className="space-y-2 text-gray-700">
                        {product.keyFeatures.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-[#1daa61] font-bold">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Specifications Section */}
                  {product?.specs && (
                    <div className="mb-8">

                      <ul className="space-y-2 text-gray-700">
                        {Object.entries(product.specs).map(([key, value]) => (
                          <li key={key} className="flex gap-2">
                            <span className="text-[#1daa61] font-bold min-w-[130px] capitalize">
                              {key.replace(/_/g, " ")}:
                            </span>
                            <span>{Array.isArray(value) ? value.join(", ") : value}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>


              {/* Color selection */}
              {product?.colors?.length > 0 && (
                <div className="mb-6">
                  <div className="font-medium text-gray-700 mb-2">Color</div>
                  <div className="flex items-center gap-3">
                    {product.colors.map((c) => (
                      <button
                        key={c}
                        onClick={() => setSelectedColor(c)}
                        className={`px-3 py-2 rounded-md border-2 font-medium transition ${selectedColor === c ? "border-amber-500 bg-amber-50" : "border-gray-200"}`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity + Total */}
              <div className="mb-6 flex items-center gap-6">
                <div className="flex items-center border rounded-lg overflow-hidden">
                  <button onClick={dec} className="px-4 py-2 text-lg">–</button>
                  <div className="px-6 py-2 font-semibold">{quantity}</div>
                  <button onClick={inc} className="px-4 py-2 text-lg">+</button>
                </div>

                <div className="text-lg">
                  <div className="text-sm text-gray-500">Total</div>

                  <div className="font-bold text-2xl text-amber-600">₹{total.toFixed(2)}</div>

                </div>
                <div>

                </div>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <div>{product?.shipping || "Free Shipping"}</div>
                <div>{product?.returnPolicy || "Easy Returns"}</div>
                <div>{product?.warranty || "1 Year Warranty"}</div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {/* 🟢 BUY NOW BUTTON */}
                <button
                  disabled={!product?.inStock}
                  onClick={async () => {
                    try {
                      // 1️⃣ Add to Cart (backend or local)
                      if (user) {
                        await dispatch(
                          addToCartBackend({
                            uid: user.uid,
                            product: {
                              ...product,
                              selectedColor,
                              quantity,
                              image: product.images?.[0],
                              shippingCharge:
  typeof product.shipping === "number"
    ? product.shipping                   // use numeric shipping price
    : 0,    // ✅ include shippingCharge
                            },
                          })
                        );
                      } else {
                        dispatch(
                          addToCart({
                            ...product,
                            selectedColor,
                            quantity,
                            image: product.images?.[0],
                          })
                        );
                      }

                      // 2️⃣ Notify user
                      toast.success(`Redirecting to checkout... 🛍️`);

                      // 3️⃣ Redirect to checkout
                      router.push("/checkout") // ✅ adjust path if your checkout route differs

                    } catch (err) {
                      console.error("❌ Buy Now failed:", err);
                      toast.error("Failed to process checkout");
                    }
                  }}
                  className="w-full bg-[#1daa61] text-white py-3 rounded-xl 
      font-bold text-lg shadow-md hover:shadow-lg hover:scale-[1.03] transition-all 
      flex items-center justify-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 10h18M7 15h10M5 6h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z"
                    />
                  </svg> Buy Now
                </button>

                <button
                  disabled={!product?.inStock}
                  onClick={() => {
                    if (user) {
                      // 👤 Logged-in user — sync with backend
                   (console.log("Adding to cart for user:", Number(String(product.shipping).replace(/[^0-9]/g, "")) ),  
                       dispatch(
                        addToCartBackend({
                          uid: user.uid,
                          product: {
                            ...product,
                            selectedColor,
                            quantity,
                            image: product.images?.[0],
                            shippingCharge: Number(String(product.shipping).replace(/[^0-9]/g, "")) || 0
                          },
                        })
                      ))
                      // toast.success(`${product.name} added to your account cart! 🛒`);
                    } else {
                      // 🧍 Guest user — local Redux only
                      dispatch(
                        addToCart({
                          ...product,
                          selectedColor,
                          quantity,
                          image: product.images?.[0],
                         shippingCharge: Number(String(product.shipping).replace(/[^0-9]/g, "")) || 0
                        })
                      );
                      toast.success(`${product.name} added to cart! 🛒`);
                    }
                  }}

                  className="w-full bg-[#1daa61] text-white py-3 rounded-xl font-bold text-lg 
             hover:bg-[#189c57] hover:shadow-[0_8px_20px_rgba(29,170,97,0.3)]
             transform hover:scale-[1.03] transition-all flex items-center 
             justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" /> Add to Cart
                </button>



              </div>
              {showShareModal && (
                <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fadeIn">
                  <div className="relative bg-white rounded-3xl shadow-2xl p-6 sm:p-8 w-[90%] max-w-sm text-center border border-gray-100">
                    {/* Close Button */}
                    <button
                      onClick={() => setShowShareModal(false)}
                      className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
                    >
                      ✕
                    </button>

                    {/* Heading */}
                    <h3 className="text-xl font-bold text-gray-800 mb-6">
                      Share this Product
                    </h3>

                    {/* Icons Grid */}
                    <div className="grid grid-cols-3 gap-5">
                      {/* WhatsApp */}
                      <a
                        href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                          `Check this out: ${product.name} - ${window.location.origin}/product/${product._id || product.id}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center gap-2"
                      >
                        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#25D366]/10 group-hover:bg-[#25D366]/20 transition">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 text-[#25D366] group-hover:scale-110 transition-transform"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12.004 2C6.48 2 2 6.48 2 12c0 1.84.5 3.57 1.36 5.08L2 22l5.1-1.33A9.931 9.931 0 0012.004 22c5.52 0 10-4.48 10-10S17.524 2 12.004 2zm5.92 14.58c-.25.7-1.44 1.33-1.99 1.42-.53.08-1.2.12-1.93-.12-.45-.14-1.03-.34-1.77-.67-3.1-1.35-5.12-4.5-5.28-4.72-.16-.22-1.26-1.68-1.26-3.2 0-1.52.8-2.27 1.08-2.59.28-.32.6-.4.8-.4.2 0 .4 0 .57.01.18.01.43-.07.67.5.25.6.85 2.08.93 2.23.08.16.13.34.02.55-.1.2-.15.34-.3.53-.15.18-.32.41-.46.55-.15.14-.3.3-.13.6.18.3.77 1.27 1.66 2.05 1.15 1.02 2.12 1.34 2.42 1.5.3.16.47.13.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.67-.15.27.1 1.74.82 2.04.97.3.15.5.22.57.35.07.13.07.73-.17 1.43z" />
                          </svg>
                        </div>
                        <span className="text-xs font-medium text-gray-600">WhatsApp</span>
                      </a>

                      {/* Facebook */}
                      <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                          `${window.location.origin}/product/${product._id || product.id}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center gap-2"
                      >
                        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#1877F2]/10 group-hover:bg-[#1877F2]/20 transition">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            className="w-6 h-6 text-[#1877F2] group-hover:scale-110 transition-transform"
                          >
                            <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12a10 10 0 008.45 9.87v-6.99H8.07v-2.88h2.38v-2.2c0-2.36 1.4-3.66 3.54-3.66 1.02 0 2.1.18 2.1.18v2.31h-1.18c-1.16 0-1.52.72-1.52 1.46v1.91h2.59l-.41 2.88h-2.18v6.99A10 10 0 0022 12z" />
                          </svg>
                        </div>
                        <span className="text-xs font-medium text-gray-600">Facebook</span>
                      </a>

                      {/* Twitter / X */}
                      <a
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                          `Check out ${product.name} - ${window.location.origin}/product/${product._id || product.id}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center gap-2"
                      >
                        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#1DA1F2]/10 group-hover:bg-[#1DA1F2]/20 transition">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            className="w-6 h-6 text-[#1DA1F2] group-hover:scale-110 transition-transform"
                          >
                            <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.27 4.27 0 001.88-2.36 8.59 8.59 0 01-2.72 1.04A4.24 4.24 0 0016 4a4.26 4.26 0 00-4.26 4.26c0 .33.03.66.1.97A12.06 12.06 0 013 5.16a4.23 4.23 0 001.32 5.67 4.18 4.18 0 01-1.93-.53v.05a4.26 4.26 0 003.42 4.18 4.21 4.21 0 01-1.92.07 4.26 4.26 0 003.98 2.96A8.52 8.52 0 012 19.54a12.02 12.02 0 006.52 1.91c7.83 0 12.11-6.48 12.11-12.11l-.01-.55A8.58 8.58 0 0022.46 6z" />
                          </svg>
                        </div>
                        <span className="text-xs font-medium text-gray-600">Twitter</span>
                      </a>

                      {/* Email */}
                      <a
                        href={`mailto:?subject=${encodeURIComponent(
                          product.name
                        )}&body=${encodeURIComponent(
                          `Check out this product: ${product.name}\n${window.location.origin}/product/${product._id || product.id}`
                        )}`}
                        className="group flex flex-col items-center gap-2"
                      >
                        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#EA4335]/10 group-hover:bg-[#EA4335]/20 transition">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 text-[#EA4335] group-hover:scale-110 transition-transform"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 2v.01L12 13 4 6.01V6h16z" />
                          </svg>
                        </div>
                        <span className="text-xs font-medium text-gray-600">Email</span>
                      </a>

                      {/* Copy Link */}
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(
                            `${window.location.origin}/product/${product._id || product.id}`
                          );
                          toast.success("Link copied to clipboard! 📋");
                          setShowShareModal(false);
                        }}
                        className="group flex flex-col items-center gap-2"
                      >
                        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 group-hover:bg-gray-300 transition">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            className="w-6 h-6 text-gray-700 group-hover:scale-110 transition-transform"
                            viewBox="0 0 24 24"
                          >
                            <path d="M10 13a5 5 0 01.17-1.29l-2.1-2.1a7 7 0 000 6.78l2.1-2.1A5 5 0 0110 13zm4 0a5 5 0 01-.17 1.29l2.1 2.1a7 7 0 000-6.78l-2.1 2.1A5 5 0 0114 13zm-2-3a3 3 0 00-.83 5.9l1.41 1.41A5 5 0 0012 8.1l-1.41 1.41A3 3 0 0012 10z" />
                          </svg>
                        </div>
                        <span className="text-xs font-medium text-gray-600">Copy Link</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}



            </div>
          </div>

          {/* Tabs: Description / Specifications / Reviews */}
          {/* Tabs: Description / Specifications / Reviews */}
          <div className="border-t">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              {/* Tabs Header */}
              <div className="flex items-center gap-6  pb-4">
                <button
                  onClick={() => setTab("description")}
                  className={`pb-2 ${tab === "description"
                    ? "border-b-2 border-amber-500 font-semibold text-amber-600"
                    : "text-gray-600"
                    }`}
                >
                  Description
                </button>
                {/* <button
                  onClick={() => setTab("specs")}
                  className={`pb-2 ${tab === "specs"
                    ? "border-b-2 border-amber-500 font-semibold text-amber-600"
                    : "text-gray-600"
                    }`}
                >
                  Specifications
                </button>
                <button
                  onClick={() => setTab("reviews")}
                  className={`pb-2 ${tab === "reviews"
                    ? "border-b-2 border-amber-500 font-semibold text-amber-600"
                    : "text-gray-600"
                    }`}
                >
                  Reviews
                </button> */}
              </div>

              {/* Tab Content */}
              <div className="py-2">
                <AnimatePresence mode="wait">
                  {tab === "description" && (
                    <motion.div
                      key="desc"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                    >
                      {/* <h3 className="font-bold text-lg mb-3">Product Description</h3> */}
                      <p className="text-gray-600">
                        {product?.description ||
                          "Premium product with elegant design and high-quality materials."}
                      </p>
                      {/* <ul className="mt-4 space-y-2 text-gray-700">
                        {(product?.keyFeatures || product?.specs?.features || []).map(
                          (f, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="mt-1 text-amber-500">•</span>
                              <span>{f}</span>
                            </li>
                          )
                        )}
                      </ul> */}
                    </motion.div>
                  )}

                  {tab === "specs" && (
                    <motion.div
                      key="specs"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                    >
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-bold mb-3">Specifications</h4>
                          <div className="space-y-3 text-gray-700">
                            {product?.specs ? (
                              Object.entries(product.specs).map(([k, v]) => (
                                <div key={k} className="flex">
                                  <div className="min-w-[140px] font-semibold capitalize">
                                    {k.replace(/_/g, " ")}:
                                  </div>
                                  <div>{Array.isArray(v) ? v.join(", ") : v}</div>
                                </div>
                              ))
                            ) : (
                              <div className="text-gray-500">
                                No specifications available.
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-bold mb-3">Shipping & Returns</h4>
                          <div className="text-gray-600">
                            <p>Shipping: {product?.shipping || "₹99"}</p>
                            <p>Warranty: {product?.warranty || "1 year"}</p>
                            <p>
                              Returnable:{" "}
                              {product?.returnable === false
                                ? "No"
                                : "Within 30 days"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {tab === "reviews" && (
                    <motion.div
                      key="reviews"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                    >
                      <div className="space-y-4">
                        {(product?.reviewsList || []).length === 0 && (
                          <div className="text-gray-500">
                            No reviews yet. Be the first to review this product.
                          </div>
                        )}

                        {(product?.reviewsList || []).map((rv, i) => (
                          <div key={i} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                                  {(rv.name || "U").charAt(0)}
                                </div>
                                <div>
                                  <div className="font-semibold">{rv.name}</div>
                                  <div className="text-xs text-gray-500">{rv.date}</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, s) => (
                                  <Star
                                    key={s}
                                    className={`w-4 h-4 ${s < rv.rating
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300"
                                      }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <div className="text-gray-700">{rv.comment}</div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* ✅ Related Products Section */}
            <div className="border-t bg-transparent backdrop-blur-md mt-2 rounded-b-3xl py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h4 className="font-bold mb-6 text-gray-800 text-lg">You Might Also Like</h4>

                {/* Swiper Slider for Related Products */}
                <div className="relative">
                  <Swiper
                    slidesPerView={1.5}
                    spaceBetween={16}
                    breakpoints={{
                      640: { slidesPerView: 2.5, spaceBetween: 20 },
                      1024: { slidesPerView: 4, spaceBetween: 24 },
                    }}
                    loop
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    className="pb-6"
                  >
                    {relatedProducts.slice(0, 8).map((item, i) => (
                      <SwiperSlide key={i}>
                        <div
                          onClick={() => router.push(`/product/${item._id}`)}
                          className="cursor-pointer rounded-2xl m-2 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                        >
                          <div className="relative h-40 flex items-center justify-center overflow-hidden">
                            <Image
                              src={item.images?.[0] || "/placeholder.png"}
                              alt={item.name}
                              width={200}
                              height={200}
                              className="object-cover w-full transition-transform duration-300 hover:scale-105"
                            />
                          </div>

                          <div className="p-4 text-center">
                            <h5 className="text-gray-800 font-semibold text-sm truncate">
                              {item.name}
                            </h5>
                            <p className="text-[#1daa61] font-bold text-base">₹{item.price}</p>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>

                </div>
              </div>
            </div>


          </div>
        </div>

      </div>
    </div>
  );
}
