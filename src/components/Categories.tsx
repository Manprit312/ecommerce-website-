"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAppDispatch } from "@/redux/hooks";
import { fetchProducts } from "@/redux/features/productSlice";
import NetworkBackground from "./background";
import { useRouter } from "next/navigation";
export default function Categories() {
  const dispatch = useAppDispatch();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Trending");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
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
  const orderedCategories = [
    ...categories.filter(c => c.name === "All"),       // first
    ...categories.filter(c => c.name !== "All" && c.name !== "New"),   // remove New
  ];
  return (
  <section className="relative w-full bg-gradient-to-b from-[#f5fff9] to-white shadow-inner  sm:py-1">

      <NetworkBackground />

      <div className="max-w-7xl mx-auto px-1 sm:px-0">
        <div
          className={`categories-scroll flex gap-1 sm:gap-2 overflow-x-auto w-full 
pt-1 pb-1 sm:pt-1 sm:pb-1 snap-x touch-pan-x`}

        >

          {orderedCategories.map((category, index) => (

            <button
              key={index}
              onClick={() => {
                if (category.name?.toLowerCase() === "all") {
                  router.push("/category/all");
                }
                handleClick(category.name);
              }}
              className={`snap-start flex flex-col items-center flex-shrink-0 
              w-12 sm:w-20 cursor-pointer rounded-xl transition-all duration-300 
              ${selectedCategory === category.name ? "scale-105" : "hover:bg-gray-50"}`}
            >
             <div
  className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 
              flex items-center justify-center mb-0.5 sm:mb-1 transition-colors duration-300 ${
                selectedCategory === category.name ? "border-[#1daa61]" : "border-white"
              }`}
>

                <Image
                  src={category.image}
                  alt={category.name}
                  width={36}
                  height={36}
                  className="object-contain sm:w-[50px] sm:h-[50px]"
                />
              </div>

              <span
                className={`text-[10px] sm:text-sm font-medium ${selectedCategory === category.name ? "text-[#1daa61]" : "text-gray-700"
                  }`}
              >
                {category.name.substring(0, 8)}
              </span>



            </button>
          ))}
        </div>
      </div>
      <style jsx>{`
  .categories-scroll {
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none; /* Firefox */
    overflow-x: auto;
    overflow-y: hidden;
    position: relative;
   
  }

  .categories-scroll::-webkit-scrollbar {
    width: 0 !important;
    height: 0 !important;
    display: none !important;
    background: transparent;
  }

  .categories-scroll::-webkit-scrollbar-track {
    background: transparent !important;
  }
`}</style>


    </section>
  );
}
