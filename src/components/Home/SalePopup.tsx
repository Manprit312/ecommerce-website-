"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
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
   
  <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-[9999] animate-fadeIn">
      {/* ✅ Responsive rectangle popup */}
      <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden
                      w-[90%] max-w-[420px] h-[600px] 
                      md:max-w-[900px] md:h-[450px]">

        {/* ✅ Close Button always on top */}
       <button
  onClick={() => setIsOpen(false)}
  className="absolute top-3 right-3 z-50 bg-black/70 text-white hover:bg-red-600
             w-10 h-10 flex items-center justify-center rounded-full transition
             font-bold text-xl shadow-lg backdrop-blur-sm"
>
  <X size={20} />
</button>

        {/* ✅ Sale Banner Image */}
        <Image
          src={bannerUrl}
          alt="Sale Banner"
          fill
          className="object-cover w-full h-full rounded-3xl"
        />
      </div>
    </div>

  );
}
