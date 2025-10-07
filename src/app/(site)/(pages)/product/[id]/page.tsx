"use client";
import React from "react";
import { useSearchParams, useParams, useRouter } from "next/navigation";
import ProductDetails from "@/components/Home/ProductDetails"; // adjust path

export default function ProductPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { id } = useParams();

  const encoded = searchParams.get("data");
  let product = null;

  try {
    product = encoded ? JSON.parse(decodeURIComponent(encoded)) : null;
  } catch (error) {
    console.error("Failed to decode product data:", error);
  }

  // fallback
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Product not found
        </h2>
        <button
          onClick={() => router.push("/")}
          className="px-5 py-2 bg-[#1daa61] text-white rounded-full font-semibold hover:bg-[#189c57] transition-all"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <ProductDetails
      product={product}
    //   toggleFavorite={() => {}}
    //   favorites={[]}
      goBack={() => router.back()}
      
    />
  );
}
