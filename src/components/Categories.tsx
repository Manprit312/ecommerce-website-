"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAppDispatch } from "@/redux/hooks";
import { fetchProducts } from "@/redux/features/productSlice";
import NetworkBackground from "./background";

export default function Categories() {
  const dispatch = useAppDispatch();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Trending");
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchCategories = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`);
      if (!res.ok) throw new Error("Failed to fetch categories");

      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error("❌ Error loading categories:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchCategories();
}, []);

  // ✅ Fetch products for default category
  useEffect(() => {
    if (selectedCategory) {
      dispatch(fetchProducts(selectedCategory));
    }
  }, [dispatch, selectedCategory]);

  // ✅ Handle click
  const handleClick = (name) => {
    setSelectedCategory(name);
    dispatch(fetchProducts(name));
  };

  if (loading)
    return (
      <section className="relative w-full bg-gradient-to-b from-[#f5fff9] to-white shadow-inner">
        <NetworkBackground />
        <div className="text-center py-6 text-gray-500">Loading categories...</div>
      </section>
    );

  return (
    <section className="relative w-full bg-gradient-to-b from-[#f5fff9] to-white shadow-inner">
      <NetworkBackground />

      <div className="max-w-7xl mx-auto">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide w-full pt-2">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleClick(category.name)}
              className={`flex flex-col items-center flex-shrink-0 w-18 cursor-pointer rounded-2xl transition-all duration-300 ${
                selectedCategory === category.name
                  ? "scale-105"
                  : "hover:bg-gray-50"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-full overflow-hidden border-2 flex items-center justify-center mb-2 transition-colors duration-300 ${
                  selectedCategory === category.name
                    ? "border-[#1daa61]"
                    : "border-gray-200"
                }`}
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  width={50}
                  height={50}
                  className="object-contain"
                />
              </div>
              <span
                className={`text-sm font-medium ${
                  selectedCategory === category.name
                    ? "text-[#1daa61]"
                    : "text-gray-700"
                }`}
              >
                {category.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
