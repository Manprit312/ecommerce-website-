"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./hero-swiper.css"; // Custom CSS for dot color

export default function HeroSection() {
  const slides = [
    {
      id: 1,
      title: "Illuminate Your Special Moments",
      subtitle: "Perfect Gift Ideas",
      description:
        "Elegant LED photo frames and warm lighting solutions to make every occasion memorable.",
      image: "/images/banner1.png",
      product: "Swan LED Photo Frame",
      tag: "Wedding Gift Special",
    },
    {
      id: 2,
      title: "Bring Magic to Your Home Decor",
      subtitle: "Handcrafted Designs",
      description:
        "Beautifully crafted LED lamps designed with simplicity, nature, and luxury in mind.",
      image: "/images/banner2.png",
      product: "Wooden LED Table Lamp",
      tag: "Minimal & Elegant",
    },
    {
      id: 3,
      title: "Light That Speaks Love",
      subtitle: "Romantic Lighting Gifts",
      description:
        "Gift moments of warmth and light with heart-shaped LED frames for your loved ones.",
      image: "/images/banner3.png",
      product: "Crystal Heart Frame",
      tag: "Best Seller",
    },
  ];

  return (
    <section
      className="relative  overflow-hidden bg-white text-gray-800"
      style={{
        backgroundImage: "url(/images/homebannerback.png)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className="w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative py-2 md:py-8 transition-all duration-700">
              <div className="absolute inset-0 bg-[#1daa61]/5"></div>

              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-10 items-center">
                  {/* Left Section */}
                  <div>
                    <div className="inline-block bg-[#1daa61]/10 backdrop-blur-sm px-3 py-1 rounded-full mb-3">
                      <span className="text-sm font-semibold text-[#1daa61]">
                        {slide.subtitle}
                      </span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-3 leading-tight text-gray-900">
                      {slide.title}
                    </h1>
                    <p className="text-base md:text-lg mb-5 text-gray-600 max-w-md">
                      {slide.description}
                    </p>
                    {/* <div className="flex gap-3">
                      <button className="bg-[#1daa61] text-white px-6 py-3 rounded-lg font-semibold text-base hover:bg-[#189c57] transform hover:scale-105 transition-all shadow-lg">
                        Shop Now
                      </button>
                      <button className="border-2 border-[#1daa61] text-[#1daa61] px-6 py-3 rounded-lg font-semibold text-base hover:bg-[#f5fff9] transition-all">
                        View Gifts
                      </button>
                    </div> */}
                  </div>

                  {/* Right Section with 3D Effect Image */}
                  <div className="hidden md:flex justify-center">
                    <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-[#1daa61]/20  flex flex-col items-center transform perspective-[1000px]">
                      <div className="relative w-70 h-54 md:w-96 md:h-72 mb-3 overflow-hidden rounded-xl transform-gpu transition-transform duration-700 ease-in-out hover:rotate-y-6 hover:scale-[1.05]">
                        <Image
                          src={slide.image}
                          alt={slide.product}
                          fill
                          className="object-contain transition-transform duration-[6000ms] ease-in-out"
                        />
                      </div>
                      <h3 className="text-xl font-bold mb-1 text-gray-800">
                        {slide.product}
                      </h3>
                      <p className="text-[#1daa61] font-medium text-sm">
                        {slide.tag}
                      </p>
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
