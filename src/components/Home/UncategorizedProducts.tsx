"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import toast from "react-hot-toast";

interface Product {
  _id: string;
  name: string;
  price: number;
  modelUrl?: string;
  images?: string[];
  model3D?: string;
  offer?: string;
  categories?: string[]; // 👈 this is used to filter
}

export default function UncategorizedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/products`;

  useEffect(() => {
    const fetchUncategorizedProducts = async () => {
      try {
        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error("Failed to fetch products");

        const data: Product[] = await res.json();

        // ✅ Filter products that have no categories
        const uncategorized = data.filter(
          (p) =>
            !p.categories ||
            !Array.isArray(p.categories) ||
            p.categories.length === 0
        );

        setProducts(uncategorized);
        if (uncategorized.length === 0)
          toast("No uncategorized products found.");
      } catch (err: any) {
        toast.error("❌ " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUncategorizedProducts();
  }, [apiUrl]);

  if (loading)
    return (
      <div className="flex items-center justify-center py-16 text-gray-500">
        Loading uncategorized products...
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* ✅ Page Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
         Have a look 
        </h2>
        <p className="text-sm text-gray-500">
          Showing {products.length} product{products.length !== 1 && "s"}
        </p>
      </div>

      {/* ✅ Product Grid */}
      {products.length === 0 ? (
        <p className="text-gray-500 text-center py-12">
          No products without categories.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
