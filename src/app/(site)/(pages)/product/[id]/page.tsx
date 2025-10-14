"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ProductDetails from "@/components/Home/ProductDetails"; // ✅ your original styled component
import ThreeDLoader from "@/components/Loader"; // ✅ your mint 3D loader

export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch single product dynamically from your backend
  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // 🌀 Loading state with mint theme
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5fff9] to-white">
        <ThreeDLoader />
      </div>
    );

  // ⚠️ Error or not found
  if (error || !product)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          {error ? "Failed to load product." : "Product not found."}
        </h2>
        <button
          onClick={() => router.push("/")}
          className="px-5 py-2 bg-[#1daa61] text-white rounded-full font-semibold hover:bg-[#189c57] transition-all"
        >
          Back to Home
        </button>
      </div>
    );

  // ✅ Render the original styled ProductDetails with backend data
  return (
    <ProductDetails
      product={product}
      goBack={() => router.back()}
     
      favorites={[]}
    />
  );
}
