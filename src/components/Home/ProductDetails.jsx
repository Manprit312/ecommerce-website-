"use client";
import React from "react";
import { ShoppingCart, Star, Heart, ArrowLeft } from "lucide-react";
import Image from "next/image";
export default function ProductDetails({
  product,
  addToCart,
  toggleFavorite,
  favorites,
  goBack,
  cart,
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-lg shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <button
              onClick={goBack}
              className="flex items-center space-x-2 text-gray-700 hover:text-amber-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Shop</span>
            </button>

            <div className="flex items-center space-x-4">
              <button className="relative p-2 hover:bg-amber-100 rounded-lg transition-colors">
                <ShoppingCart className="w-5 h-5 text-gray-700" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {cart.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Product Detail Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Left: Product Image */}
            <div>
              <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl h-96 flex items-center justify-center text-9xl mb-6">
            <Image src={product.images[0]} alt={product.name} width={400} height={400} className="object-contain h-full w-auto" />
              </div>
              {product.badge && (
                <span className="inline-block bg-gradient-to-r from-amber-500 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Right: Product Info */}
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-4">{product.name}</h1>

              <div className="flex items-center space-x-2 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-semibold text-gray-700">
                  {product.rating}
                </span>
                <span className="text-gray-500">({product.reviews} reviews)</span>
              </div>

              <div className="mb-8">
                <span className="text-5xl font-bold text-amber-600">
                  ${product.price}
                </span>
                {product.inStock && (
                  <p className="text-lg text-green-600 font-medium mt-2">
                    In Stock - Ready to Ship
                  </p>
                )}
              </div>

              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                {product.description}
              </p>

              {/* Product Specifications */}
              {product.specs && (
                <div className="bg-amber-50 rounded-2xl p-6 mb-8">
                  <h3 className="font-bold text-xl mb-4 text-gray-800">
                    Product Specifications
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(product.specs).map(([key, value]) => {
                      if (key === "features") {
                        return (
                          <div key={key}>
                            <span className="font-semibold capitalize text-gray-700">
                              Features:
                            </span>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {value.map((f, i) => (
                                <span
                                  key={i}
                                  className="bg-white text-amber-700 px-4 py-2 rounded-lg text-sm font-medium shadow-sm border border-amber-200"
                                >
                                  {f}
                                </span>
                              ))}
                            </div>
                          </div>
                        );
                      }
                      return (
                        <div key={key} className="flex">
                          <span className="font-semibold capitalize text-gray-700 min-w-[120px]">
                            {key}:
                          </span>
                          <span className="text-gray-600">{value}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-4">
                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-6 h-6" />
                  Add to Cart
                </button>

                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="w-full border-2 border-amber-500 text-amber-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-amber-50 transition-all flex items-center justify-center gap-2"
                >
                  <Heart
                    className={`w-6 h-6 ${
                      favorites.includes(product.id) ? "fill-amber-600" : ""
                    }`}
                  />
                  {favorites.includes(product.id)
                    ? "Remove from Favorites"
                    : "Add to Favorites"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
