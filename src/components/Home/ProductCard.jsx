import { Heart, Star, ShoppingCart } from "lucide-react";
import Image from "next/image";

export default function ProductCard({
  product,
  toggleFavorite,
  favorites,
  addToCart,
  viewProductDetails,
}) {
  return (
    <div
      className="bg-white rounded-2xl shadow-lg overflow-hidden border border-[#eaf5ee]
                 transform hover:-translate-y-2 hover:shadow-[0_10px_25px_rgba(29,170,97,0.25)]
                 transition-all duration-300"
    >
      {/* Product Image Section */}
     {/* Product Image Section */}
<div className="relative overflow-hidden rounded-t-2xl bg-gradient-to-br from-[#f5fff9] to-white h-64 flex items-center justify-center">
  <Image
    src={product.images[0]}
    alt={product.name}
    width={300}
    height={300}
    className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
  />

  {/* Badge */}
  {product.badge && (
    <span className="absolute top-4 left-4 bg-[#1daa61] text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
      {product.badge}
    </span>
  )}

  {/* Favorite Button */}
  <button
    onClick={() => toggleFavorite(product.id)}
    className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform border border-gray-100"
  >
    <Heart
      className={`w-5 h-5 ${
        favorites.includes(product.id)
          ? "fill-[#1daa61] text-[#1daa61]"
          : "text-gray-400"
      }`}
    />
  </button>
</div>


      {/* Product Info Section */}
      <div className="p-5">
        <h3 className="text-base font-semibold text-gray-800 mb-2 line-clamp-2 hover:text-[#1daa61] transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center space-x-1 mb-3">
          <Star className="w-4 h-4 fill-[#1daa61] text-[#1daa61]" />
          <span className="text-sm font-semibold text-gray-700">
            {product.rating}
          </span>
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="mb-4">
          <span className="text-xl font-bold text-[#1daa61]">
            ${product.price}
          </span>
        </div>

        {/* Buttons */}
        <div className="space-y-2">
          {/* Add to Cart */}
          <button
            onClick={() => addToCart(product)}
            className="w-full bg-[#1daa61] text-white px-4 py-2 rounded-lg font-semibold 
                       hover:bg-[#189c57] hover:shadow-[0_8px_20px_rgba(29,170,97,0.3)] transform hover:scale-[1.03] 
                       transition-all text-sm flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>

          {/* View Details */}
          <button
            onClick={() => viewProductDetails(product)}
            className="w-full border-2 border-[#1daa61] text-[#1daa61] px-4 py-2 rounded-lg font-semibold 
                       hover:bg-[#f0fdf4] transition-all text-sm"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
