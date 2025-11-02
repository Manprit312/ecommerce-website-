"use client";
import React,{useEffect, useState} from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
// import Header from "@/";
import ProductsGrid from "@/components/Home/ProductsGrid";
const apiUrl=process.env.NEXT_PUBLIC_API_URL
export default function CategoryPage() {
  const { category } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      // 👇 Correct API endpoint for category
      const res = await fetch(`${apiUrl}/api/products`);
      if (!res.ok) throw new Error("Failed to fetch products");

      const data = await res.json();
      setProducts(data);
    } catch (err) {
      const errObj = err as Error;
      setError(errObj.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(()=>{
    fetchProducts()
    console.log(products)
  },[])

  return (
    <>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 capitalize">
          All  Category Products
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
