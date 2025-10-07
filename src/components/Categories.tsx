"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
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
export default function Categories({
  onCategorySelect,
}: {
  onCategorySelect: (name: string) => void;
}) {
  // 👇 Set default to "Trending"
  const [selectedCategory, setSelectedCategory] = useState<string>("Trending");


  const handleClick = (name: string) => {
    setSelectedCategory(name);
    onCategorySelect(name);
    console.log(name);
  };

  return (
    
    <section className="w-full bg-gradient-to-b from-[#f5fff9] to-white py-4 shadow-inner">
        <NetworkBackground/>
      <div className="max-w-7xl mx-auto">
        

        <div className="flex gap-4 overflow-x-auto scrollbar-hide w-full">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleClick(category.name)}
              className={`flex flex-col items-center flex-shrink-0 w-18 cursor-pointer rounded-2xl  transition-all duration-300 `}
            >
              <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-100 flex items-center justify-center mb-2">
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
