"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function SalePopup() {
  const [isOpen, setIsOpen] = useState(false);

  // Show popup when the homepage first renders
  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 1000); // delay 1s for smooth load
    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
      <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden max-w-md w-[90%] animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 text-white cursor-pointer bg-black/40 hover:bg-red-500 w-8 h-8 flex items-center justify-center rounded-full"
        >
          ✕
        </button>

        {/* Poster Image */}
        <Image
          src="/images/sale.png" // 👈 Replace this with your image path
          alt="Sale Poster"
          width={600}
          height={800}
          className="object-cover w-full h-auto"
        />

        {/* Text Overlay */}
        
      </div>
    </div>
  );
}
