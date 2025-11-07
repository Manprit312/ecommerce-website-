"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
// import Header from "@/";
import ProductsGrid from "@/components/Home/ProductsGrid";
const apiUrl = process.env.NEXT_PUBLIC_API_URL
export default function CategoryPage() {
  const { category } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);

  

  return (
    <>

      <div className="max-w-7xl mx-auto  mt-25 px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-xl md:text-3xl font-bold text-gray-800 capitalize">
            {category} Category Products
          </h1>

          <button
            onClick={() => router.back()}
            className="px-4 py-2 text-xs md:text-sm font-medium text-[#1daa61] border border-[#1daa61] rounded-full hover:bg-[#1daa61] hover:text-white transition-all"
          >
            ← Back
          </button>
        </div>

       
          <ProductsGrid/>
       
      </div>
    </>
  );
}
