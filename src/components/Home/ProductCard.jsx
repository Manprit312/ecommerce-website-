"use client";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import Image from "next/image";

export default function ProductCard({ product }) {
  const router = useRouter();

  // ✅ Go to product detail page
  const handleViewDetails = (e) => {
    e.stopPropagation();
    if (!product?._id) return;
    router.push(`/product/${product._id}`);
  };

  // ✅ Handle category click — works for populated or string categories
  const handleCategoryClick = (e) => {
    e.stopPropagation();
    let categoryName = "General";

    if (product.categories?.length > 0) {
      // Handle both populated object and string case
      const firstCategory = product.categories[0];
      categoryName = typeof firstCategory === "object" ? firstCategory.name : firstCategory;
    } else if (product.category) {
      categoryName = typeof product.category === "object" ? product.category.name : product.category;
    }

    if (categoryName && categoryName !== "General") {
      router.push(`/category/${encodeURIComponent(categoryName.toLowerCase())}`);
    }
  };

  // ✅ Extract category name safely
  const displayCategory =
    typeof product.categories?.[0] === "object"
      ? product.categories[0]?.name
      : product.categories?.[0] || product.category || "General";

  return (
    <div
      onClick={handleViewDetails}
      className="relative bg-white rounded-2xl shadow-md overflow-hidden border border-[#e7f6ed]
                 cursor-pointer hover:shadow-[0_10px_25px_rgba(29,170,97,0.25)]
                 hover:scale-[1.02] transition-all duration-300 group"
    >
      {/* === Product Image === */}
      <div className="relative aspect-[4/3] w-full bg-gradient-to-br from-[#f5fff9] to-white flex items-center justify-center overflow-hidden">
        {product.images?.[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            width={500}
            height={375}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex items-center justify-center text-gray-400 text-sm italic h-full">
            No Image
          </div>
        )}

        {/* ⭐ Rating Badge */}
        {product.rating && (
          <div className="absolute bottom-2 right-2 flex items-center bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full shadow-sm">
            <Star className="w-3.5 h-3.5 fill-[#1daa61] text-[#1daa61]" />
            <span className="ml-1 text-xs font-semibold text-gray-700">
              {product.rating}
            </span>
          </div>
        )}
      </div>

      {/* === Product Info === */}
      <div className="p-4 sm:p-5">
        {/* Category Label */}
        <button
          onClick={handleCategoryClick}
          className="relative text-xs sm:text-sm font-semibold text-[#1daa61] mb-1 group/category"
        >
          {displayCategory}
          <span
            className="absolute left-0 bottom-[-2px] w-0 h-[2px] bg-[#1daa61] 
                       transition-all duration-300 group-hover/category:w-full"
          ></span>
        </button>

        {/* Product Name */}
        <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-1 line-clamp-2 group-hover:text-[#1daa61] transition-colors">
          {product.name}
        </h3>

        {/* Price + Buy Button */}
        <div className="flex items-center justify-between mt-2">
          <span className="text-lg sm:text-xl font-bold text-[#1daa61]">
            ₹{product.price}
          </span>
          <button
            onClick={handleViewDetails}
            className="px-3 py-1.5 text-xs sm:text-sm font-semibold text-white bg-[#1daa61] rounded-full shadow-md 
                       hover:bg-[#189c57] hover:shadow-[0_4px_12px_rgba(29,170,97,0.3)] transition-all"
          >
            Buy
          </button>
        </div>
      </div>

      {/* 🏷️ Optional badge */}
      {product.badge && (
        <div className="absolute top-3 left-3 bg-[#1daa61]/10 text-[#1daa61] px-3 py-1 text-xs font-bold rounded-full shadow-sm">
          {product.badge}
        </div>
      )}
    </div>
  );
}
