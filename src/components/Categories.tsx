"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useDispatch } from "react-redux";
import { fetchProducts } from "@/redux/features/productSlice";
import NetworkBackground from "./background";

const categories = [
  { name: "Trending", image: "/images/trending.png" },
  { name: "Romantic", image: "/images/romantic.png" },
  { name: "Decor", image: "/images/decor.png" },
  { name: "Smart Lights", image: "/images/lights.png" },
  { name: "Luxury", image: "/images/luxury.png" },
  { name: "Festive", image: "/images/festive.png" },
  { name: "Office", image: "/images/office.png" },
  { name: "Electronics", image: "/images/electronics.png" },
  { name: "Fashion", image: "/images/fashion.png" },
  { name: "Brands", image: "/images/brands.png" },
  { name: "Collections", image: "/images/gifts.png" },
  { name: "Home & Kitchen", image: "/images/kitchen.png" },
  { name: "Gifts", image: "/images/gifts.png" },
];

export default function Categories() {
  const dispatch = useAppDispatch();
  const [selectedCategory, setSelectedCategory] = useState("Trending");

  // ✅ Fetch "Trending" by default when component loads
  useEffect(() => {
    dispatch(fetchProducts("Trending"));
  }, [dispatch]);

  // ✅ Handle click and trigger API fetch
  const handleClick = (name) => {
    setSelectedCategory(name);
    dispatch(fetchProducts(name));
  };

  return (
    <section className="relative w-full bg-gradient-to-b from-[#f5fff9] to-white  shadow-inner">
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
