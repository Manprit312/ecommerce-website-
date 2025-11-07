"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

export default function SalePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [bannerUrl, setBannerUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sale-banner`);
        const data = await res.json();

        if (data?.banner?.isActive && data.banner.imageUrl) {
          setBannerUrl(data.banner.imageUrl);
          setTimeout(() => setIsOpen(true), 800);
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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[9999] animate-fadeIn">

      {/* ✅ Auto-size container, no fixed width/height */}
      <div className="relative rounded-3xl overflow-hidden">

        {/* ❌ No fixed w/h here — image decides the size */}

        {/* ✅ Close button stays on top */}
        <button
      onClick={() => setIsOpen(false)}
      className="absolute top-2 right-2 z-[10000] bg-green text-white hover:bg-red-600
                 w-10 h-10 flex items-center justify-center rounded-full transition
                 font-bold text-xl shadow-lg"
    >
      <X size={20} />
    </button>

        {/* ✅ Image keeps its natural size */}
        <Image
          src={bannerUrl}
          alt="Sale Banner"
          width={0}
          height={0}
          sizes="100vw"
          className="w-auto h-auto max-w-[95vw] max-h-[90vh] rounded-3xl object-contain"
          priority
        />
      </div>
    </div>
  );
}
