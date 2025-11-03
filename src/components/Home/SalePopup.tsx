"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function SalePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [bannerUrl, setBannerUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // 🧠 Fetch active sale banner from backend
  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sale-banner`);
        const data = await res.json();

        if (data?.banner?.isActive && data.banner.imageUrl) {
          setBannerUrl(data.banner.imageUrl);
          setTimeout(() => setIsOpen(true), 800); // Smooth popup delay
        }
      } catch (err) {
        console.error("❌ Failed to fetch sale banner:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBanner();
  }, []);

  if (loading || !isOpen || !bannerUrl) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999] animate-fadeIn">
      <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden max-w-md w-[90%]">
        {/* ✕ Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 bg-black/40 text-white hover:bg-red-500 w-8 h-8 flex items-center justify-center rounded-full transition"
          aria-label="Close sale popup"
        >
          ✕
        </button>

        {/* 🖼️ Sale Banner Image */}
        <Image
          src={bannerUrl}
          alt="Sale Banner"
          width={600}
          height={800}
          className="object-cover w-full h-auto"
        />
      </div>
    </div>
  );
}
