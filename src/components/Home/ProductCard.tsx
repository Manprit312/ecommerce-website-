"use client";
import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";






interface Product {
  _id: string;
  name: string;
  price: number;
  modelUrl?: string;
  images?: string[];
  model3D?: string;
    offer?: string; 
}

export default function ProductCard({ product }: { product: Product }) {
  useEffect(() => {
  if (typeof window !== "undefined") {
    import("@google/model-viewer"); // <--- This line runs in the browser to define the tag
  }
}, []);


  const router = useRouter();
const handleViewDetails = (e: React.MouseEvent<HTMLElement>) => {
  e.stopPropagation();
  if (!product?._id) return;
  router.push(`/product/${product._id}`);
};


const is3D =
  product.model3D &&
    (product.model3D.endsWith(".glb") || product.model3D.endsWith(".gltf"));
console.log(product.model3D, is3D);
  return (
     <div
      className="relative bg-white rounded-2xl shadow-md overflow-hidden border border-[#e7f6ed]
                 hover:shadow-[0_10px_25px_rgba(29,170,97,0.25)]
                 hover:scale-[1.02] transition-all duration-300"
    >
       {product.offer && (
        <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-[#1daa61] to-[#17c66c] text-white text-[10px] sm:text-xs font-semibold px-3 py-1 rounded-full shadow-lg uppercase tracking-wide">
          {product.offer}
        </div>
      )}
      {/* === 3D Viewer or Fallback === */}
      {is3D ? (
        <model-viewer
          src={product.model3D}
          alt={product.name}
          camera-controls
          auto-rotate
          style={{
            width: "100%",
            height: "220px",
            background: "#f5fff9",
            borderBottom: "1px solid #e7f6ed",
          }}
        ></model-viewer>
       ) : product.images?.length ? (
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-[220px] object-cover border-b border-[#e7f6ed]"
        />
      ) : (
        <div className="aspect-[4/3] flex items-center justify-center text-gray-400 text-sm italic bg-[#f5fff9]">
          No Image
        </div>
      )} 

      {/* === Product Info === */}
      <div className="p-4 sm:p-5">
        <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-1">
          {product.name}
        </h3>
        <div className="flex items-center justify-between mt-2">
          <span className="text-lg sm:text-xl font-bold text-[#1daa61]">
            ₹{product.price}
          </span>
         <button
           onClick={handleViewDetails}
            className="px-3 py-1.5 text-xs sm:text-sm font-semibold text-white bg-[#1daa61] rounded-full shadow-md 
                       hover:bg-[#189c57] hover:shadow-[0_4px_12px_rgba(29,170,97,0.3)] transition-all"
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
}
