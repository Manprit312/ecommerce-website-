"use client";
import { useRouter } from "next/navigation";
import { Heart, Star } from "lucide-react";
import Image from "next/image";

export default function ProductCard({
  allprod,
  product,
  toggleFavorite,
  favorites,
}) {
  const router = useRouter();

  const handleViewDetails = (e) => {
    e.stopPropagation();

    // Encode product data in URL
    const encoded = encodeURIComponent(JSON.stringify(product));
    router.push(`/product/${product.id}?data=${encoded}`);
  };

  return (
    <div
      onClick={handleViewDetails}
      className="relative bg-white rounded-2xl shadow-md overflow-hidden border border-[#e7f6ed]
                 cursor-pointer hover:shadow-[0_10px_30px_rgba(29,170,97,0.25)]
                 hover:-translate-y-2 transition-all duration-300 group"
    >
      {/* Product Image */}
      <div className="relative h-48 sm:h-56 overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#f5fff9] to-white">
        <Image
          src={product.images[0]}
          alt={product.name}
          width={300}
          height={300}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
        />

        {/* Category Tag */}
        <button
          onClick={(e) => {

            e.stopPropagation();
            const filteredProducts = allprod.filter(
              (p) => p.category.toLowerCase() === product.category.toLowerCase()
            );
            const encodedforcat = encodeURIComponent(JSON.stringify(filteredProducts));
            router.push(`/category/${product.category.toLowerCase()}?data=${encodedforcat}`);
          }}
          className="absolute top-3 left-3 bg-white/80 backdrop-blur-md text-[#1daa61] border border-[#1daa61]/30
                     text-xs font-semibold px-2 py-1 rounded-full shadow-sm hover:bg-[#1daa61] hover:text-white
                     transition-all"
        >
          {product.category}
        </button>

        {/* Rating */}
        <div className="absolute top-3 right-3 flex items-center bg-white/90 backdrop-blur-md px-2 py-1 rounded-full shadow-sm">
          <Star className="w-3.5 h-3.5 fill-[#1daa61] text-[#1daa61]" />
          <span className="ml-1 text-xs font-semibold text-gray-700">{product.rating}</span>
        </div>

        {/* Favorite */}
        {/* <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(product.id);
          }}
          className="absolute bottom-3 right-3 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform border border-gray-100"
        >
          <Heart
            className={`w-4 h-4 ${
              favorites.includes(product.id)
                ? "fill-[#1daa61] text-[#1daa61]"
                : "text-gray-400"
            }`}
          />
        </button> */}
      </div>

      {/* Product Info */}
      <div className="p-4 sm:p-5">
        <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-[#1daa61] transition-colors">
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
