"use client";
import React, { useState } from "react";
import Header from "../Header";
import HomeBanner from "./HomeBanner/HomeBanner";
import ProductsGrid from "./ProductsGrid";
import ProductDetails from "./ProductDetails";
import Categories from "../Categories";
import { useRouter } from "next/navigation";
import NetworkBackground from "../background";
export const products = [
  // 💚 Trending Category
  {
    id: 0,
    name: "Trending LED Combo Pack",
    price: 49.99,
    category: "Trending",
    rating: 4.9,
    reviews: 500,
    description:
      "Top trending LED decor pack featuring bestsellers from Arya Enterprises. A perfect gift for any occasion.",
    specs: {
      material: "Mixed Decor Set",
      power: "USB + Battery",
      features: ["Trending Picks", "Gift Ready", "Multi-color Light Glow"],
    },
    images: ["/images/product13.jpeg"],
    inStock: true,
    badge: "Trending",
  },
  {
    id: 1,
    name: "Swan Crystal LED Photo Frame",
    price: 45.99,
    category: "Trending",
    rating: 4.9,
    reviews: 234,
    description:
      "Elegant swan-shaped crystal LED lamp with wooden photo frame base. A perfect wedding or anniversary gift for couples.",
    specs: {
      material: "Crystal Swan + Wooden Base",
      dimensions: "28cm x 10cm x 23cm",
      weight: "488g",
      power: "USB Powered LED",
      features: [
        "LED Night Light",
        "Photo Frame",
        "Wooden Base",
        "Crystal Swan Design",
      ],
    },
    images: ["/images/product1.jpeg"],
    inStock: true,
    badge: "Bestseller",
  },
  {
    id: 2,
    name: "Crystal Heart Photo Frame",
    price: 42.99,
    category: "Romantic",
    rating: 4.9,
    reviews: 312,
    description:
      "Romantic heart-shaped crystal frame with LED backlighting. Perfect for couples to showcase their precious memories.",
    specs: {
      material: "Crystal + Metal Base",
      power: "Battery Powered LED",
      features: ["LED Backlight", "Heart Design", "Romantic Gift"],
    },
    images: ["/images/product4.jpeg"],
    inStock: true,
  },
  {
    id: 3,
    name: "Butterfly LED Frame",
    price: 39.99,
    category: "Decor",
    rating: 4.7,
    reviews: 198,
    description:
      "Elegant butterfly-themed LED frame with glowing accents. Ideal for enhancing bedroom or living room aesthetics.",
    specs: {
      material: "Metal + Crystal",
      power: "USB Powered",
      features: ["LED Accent", "Butterfly Design", "Photo Display"],
    },
    images: ["/images/product6.jpeg"],
    inStock: true,
  },
  {
    id: 4,
    name: "Wooden LED Table Lamp",
    price: 38.99,
    category: "Decor",
    rating: 4.7,
    reviews: 189,
    description:
      "Aesthetic wooden table lamp that complements any modern decor. Perfect for cozy corners and reading spaces.",
    specs: {
      material: "Natural Wood + LED",
      power: "USB Powered",
      features: ["Adjustable Brightness", "Modern Design", "Energy Efficient"],
    },
    images: ["/images/product3.jpeg"],
    inStock: true,
  },
  {
    id: 5,
    name: "Mushroom LED Night Light (Colorful)",
    price: 24.99,
    category: "Smart Lights",
    rating: 4.8,
    reviews: 456,
    description:
      "Smart mushroom-shaped LED night light with auto light sensor. Adds charm and functionality to your space.",
    specs: {
      material: "Plastic Leaf + Silicone Lampshade",
      sensor: "Auto Light Control",
      power: "Socket Plug-in",
      colors: "Multi-color LED",
      features: ["Auto Sensor", "Color Changing", "Energy Saving", "Decorative"],
    },
    images: ["/images/product2.jpeg"],
    inStock: true,
    badge: "Popular",
  },
  {
    id: 6,
    name: "Star Projector Night Light",
    price: 35.99,
    category: "Smart Lights",
    rating: 4.8,
    reviews: 421,
    description:
      "Transforms any room into a starry sky with rotating projection and soothing light effects.",
    specs: {
      material: "Plastic Housing",
      power: "AC Adapter",
      features: ["Star Projection", "Rotating", "Multiple Colors"],
    },
    images: ["/images/product7.jpeg"],
    inStock: true,
  },
  {
    id: 7,
    name: "Vintage Edison LED Lamp",
    price: 44.99,
    category: "Luxury",
    rating: 4.9,
    reviews: 356,
    description:
      "Classic Edison bulb design infused with LED technology. A luxurious touch to modern interiors.",
    specs: {
      material: "Glass + Wood Base",
      power: "AC Powered",
      features: ["Vintage Style", "LED Technology", "Dimmable"],
    },
    images: ["/images/product8.jpeg"],
    inStock: true,
  },
  {
    id: 8,
    name: "Golden Crystal Table Lamp",
    price: 59.99,
    category: "Luxury",
    rating: 5.0,
    reviews: 190,
    description:
      "Premium crystal lamp with gold accents. Designed for luxury interiors and sophisticated ambiances.",
    specs: {
      material: "Gold-Plated Metal + Crystal",
      power: "AC Powered",
      features: ["Golden Finish", "Soft Light Glow", "Premium Design"],
    },
    images: ["/images/product9.jpeg"],
    inStock: true,
    badge: "Exclusive",
  },
  {
    id: 9,
    name: "Moon LED Night Light",
    price: 32.99,
    category: "Festive",
    rating: 4.6,
    reviews: 278,
    description:
      "3D printed moon lamp with multiple colors — a perfect addition to your festive celebrations.",
    specs: {
      material: "3D Printed PLA",
      power: "Rechargeable Battery",
      features: ["Touch Control", "16 Colors", "Portable"],
    },
    images: ["/images/product5.jpeg"],
    inStock: true,
  },
  {
    id: 10,
    name: "Color Changing LED Gift Set",
    price: 49.99,
    category: "Festive",
    rating: 4.8,
    reviews: 250,
    description:
      "Festive-themed LED gift set that includes decorative lights and small accent pieces for celebrations.",
    specs: {
      material: "Mixed Decorative Set",
      power: "USB Powered",
      features: ["Gift Ready", "Multi-color", "Elegant Packaging"],
    },
    images: ["/images/product10.jpeg"],
    inStock: true,
  },
  {
    id: 11,
    name: "Minimalist LED Desk Lamp",
    price: 34.99,
    category: "Office",
    rating: 4.7,
    reviews: 310,
    description:
      "Sleek LED desk lamp with adjustable arm and touch controls, ideal for productive workspaces.",
    specs: {
      material: "Aluminum + Plastic",
      power: "USB Powered",
      features: ["Adjustable Arm", "Touch Control", "Eye Protection"],
    },
    images: ["/images/product11.jpeg"],
    inStock: true,
  },
  {
    id: 12,
    name: "Ambient Glow Office Decor Lamp",
    price: 36.99,
    category: "Office",
    rating: 4.8,
    reviews: 278,
    description:
      "Soft ambient LED desk light that enhances focus and adds warmth to office setups.",
    specs: {
      material: "Wood + Frosted Glass",
      power: "USB Powered",
      features: ["Ambient Lighting", "Minimalist Design", "Soft Glow"],
    },
    images: ["/images/product12.jpeg"],
    inStock: true,
  },
];

export default function EcommerceWebsite() {
  const trendingProducts = products.filter(
    (p) => p.category.toLowerCase() === "trending"
  );
  
  const [favorites, setFavorites] = useState([]);
 
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filtered, setFiltered] = useState(trendingProducts);
  const [currentCategory, setCurrentCategory] = useState("Trending");
const router = useRouter();
  const handleCategorySelect = (category: string) => {
    const filteredProducts = products.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
    setFiltered(filteredProducts);
    setCurrentCategory(category);
  };

 const handleViewAll = () => {
  const encoded = encodeURIComponent(JSON.stringify(filtered));
  router.push(`/category/${currentCategory.toLowerCase()}?data=${encoded}`);
};

  
  const toggleFavorite = (id) =>
    setFavorites(
      favorites.includes(id)
        ? favorites.filter((i) => i !== id)
        : [...favorites, id]
    );
  const viewProductDetails = (p) => setSelectedProduct(p);

  return selectedProduct ? (
    <ProductDetails
      product={selectedProduct}
      // addToCart={addToCart}
      toggleFavorite={toggleFavorite}
      favorites={favorites}
      goBack={() => setSelectedProduct(null)}
      // cart={cart}
    />
  ) : (
    <>
      <HomeBanner />
      

      <Categories onCategorySelect={handleCategorySelect} />

      {/* --- Product Section --- */}
      <div className="relative">
        <ProductsGrid
          products={filtered}
          // addToCart={addToCart}
          toggleFavorite={toggleFavorite}
          favorites={favorites}
          viewProductDetails={viewProductDetails}
        />

        {/* View All Button */}
        <div className="flex justify-end px-6 mb-12">
          <button
            onClick={handleViewAll}
            className="px-5 py-2 mt-4 text-sm font-semibold text-white bg-[#1daa61] rounded-full shadow-md hover:bg-[#17a055] transition-all duration-300"
          >
            View All 
          </button>
        </div>
      </div>
    </>
  );
}
