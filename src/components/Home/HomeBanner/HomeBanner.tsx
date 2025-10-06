"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function HeroSection() {
  const slides = [
    {
      id: 1,
      title: "Illuminate Your Special Moments",
      subtitle: "Perfect Gift Ideas",
      description:
        "Elegant LED photo frames and warm lighting solutions to make every occasion memorable.",
      emoji: "🦢",
      product: "Swan LED Photo Frame",
      tag: "Wedding Gift Special",
      gradient: "from-[#e9f9f0] via-white to-[#f8fdfb]",
    },
    {
      id: 2,
      title: "Bring Magic to Your Home Decor",
      subtitle: "Handcrafted Designs",
      description:
        "Beautifully crafted LED lamps designed with simplicity, nature, and luxury in mind.",
      emoji: "💡",
      product: "Wooden LED Table Lamp",
      tag: "Minimal & Elegant",
      gradient: "from-white via-[#f5fff9] to-[#e9f9f0]",
    },
    {
      id: 3,
      title: "Light That Speaks Love",
      subtitle: "Romantic Lighting Gifts",
      description:
        "Gift moments of warmth and light with heart-shaped LED frames for your loved ones.",
      emoji: "❤️📷",
      product: "Crystal Heart Frame",
      tag: "Best Seller",
      gradient: "from-[#f8fdfb] via-white to-[#e9f9f0]",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white text-gray-800"
     style={{backgroundImage: 'url(/images/homebannerback.png)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'
      
     }}>
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className="w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className={`relative py-20 md:py-28 transition-all duration-700`}
            >
              <div className="absolute inset-0 bg-[#1daa61]/5"></div>

              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  {/* Left Section */}
                  <div>
                    <div className="inline-block bg-[#1daa61]/10 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                      <span className="text-sm font-semibold text-[#1daa61]">
                        {slide.subtitle}
                      </span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-gray-900">
                      {slide.title}
                    </h1>
                    <p className="text-lg mb-8 text-gray-600 max-w-lg">
                      {slide.description}
                    </p>
                    <div className="flex gap-4">
                      <button className="bg-[#1daa61] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#189c57] transform hover:scale-105 transition-all shadow-lg">
                        Shop Now
                      </button>
                      <button className="border-2 border-[#1daa61] text-[#1daa61] px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#f5fff9] transition-all">
                        View Gifts
                      </button>
                    </div>
                  </div>

                  {/* Right Section */}
                  <div className="hidden md:block">
                    <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 border border-[#1daa61]/20 text-center shadow-xl">
                      <div className="text-6xl mb-4">{slide.emoji}</div>
                      <h3 className="text-2xl font-bold mb-2 text-gray-800">
                        {slide.product}
                      </h3>
                      <p className="text-[#1daa61] font-medium">{slide.tag}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
