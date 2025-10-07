"use client";
import React from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
// import Header from "@/";
import ProductsGrid from "@/components/Home/ProductsGrid";

export default function CategoryPage() {
  const { category } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Decode products from URL
  const data = searchParams.get("data");
  const products = data ? JSON.parse(decodeURIComponent(data)) : [];

  return (
    <>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 capitalize">
            {category} Products
          </h1>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 text-sm font-medium text-[#1daa61] border border-[#1daa61] rounded-full hover:bg-[#1daa61] hover:text-white transition-all"
          >
            ← Back
          </button>
        </div>

        {products.length > 0 ? (
          <ProductsGrid
            products={products}
            addToCart={() => {}}
            toggleFavorite={() => {}}
            favorites={[]}
            viewProductDetails={() => {}}
          />
        ) : (
          <p className="text-gray-600 text-center py-10">
            No products found for this category.
          </p>
        )}
      </div>
    </>
  );
}
