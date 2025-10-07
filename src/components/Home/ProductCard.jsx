

"use client";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import Image from "next/image";

export default function ProductCard({ allprod, product }) {
  const router = useRouter();

  const handleViewDetails = (e) => {
    e.stopPropagation();
    const encoded = encodeURIComponent(JSON.stringify(product));
    router.push(`/product/${product.id}?data=${encoded}`);
  };

  const handleCategoryClick = (e) => {
    e.stopPropagation();
    const filteredProducts = allprod.filter(
      (p) => p.category.toLowerCase() === product.category.toLowerCase()
    );
    const encodedforcat = encodeURIComponent(JSON.stringify(filteredProducts));
    router.push(`/category/${product.category.toLowerCase()}?data=${encodedforcat}`);
  };

  return (
    <div
      onClick={handleViewDetails}
      className="relative bg-white rounded-2xl shadow-md overflow-hidden border border-[#e7f6ed]
                 cursor-pointer hover:shadow-[0_10px_25px_rgba(29,170,97,0.25)]
                  transition-all duration-300 group"
    >
      {/* === Product Image === */}
      <div className="relative h-36 sm:h-44 overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#f5fff9] to-white">
        <Image
          src={product.images[0]}
          alt={product.name}
          width={400}
          height={200}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />

        {/* Rating (bottom-right) */}
        <div className="absolute bottom-2 right-2 flex items-center bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full shadow-sm">
          <Star className="w-3.5 h-3.5 fill-[#1daa61] text-[#1daa61]" />
          <span className="ml-1 text-xs font-semibold text-gray-700">
            {product.rating}
          </span>
        </div>
      </div>

      {/* === Product Info === */}
      <div className="p-4 sm:p-5">
        {/* Category label with animated underline */}
        <button
          onClick={handleCategoryClick}
          className="relative text-xs sm:text-sm font-semibold text-[#1daa61] mb-1 group/category"
        >
          {product.category}
          <span
            className="absolute left-0 bottom-[-2px] w-0 h-[2px] bg-[#1daa61] 
                       transition-all duration-300 group-hover/category:w-full"
          ></span>
        </button>

        {/* Product name */}
        <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-1 line-clamp-2 group-hover:text-[#1daa61] transition-colors">
          {product.name}
        </h3>

        {/* Price + Buy */}
        <div className="flex items-center justify-between mt-2">
          <span className="text-lg sm:text-xl font-bold text-[#1daa61]">
            ${product.price}
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
    </div>
  );
}
