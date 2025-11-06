"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./hero-swiper.css";

export default function HeroSection() {
  const [slides, setSlides] = useState<any[]>([]);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sliders`);
        if (!res.ok) throw new Error("Failed to fetch slides");
        const data = await res.json();
        setSlides(data);
      } catch (error) {
        console.error("❌ Failed to load slides:", error);
      }
    };

    fetchSlides();
  }, []);

  return (
    <>
      {/* 🎬 Fullscreen video section */}
      {/* <section className="relative w-full h-screen overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="https://fortunemattresses.com/public/uploads/all/mattresses-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
 <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Illuminate Your Moments
          </h1>
          <p className="text-lg md:text-xl max-w-2xl">
            Elegant LED photo frames and lighting solutions to make every occasion special.
          </p>
        </div>
      </section> */}

      {/* 🖼️ Swiper Section (scrolls after video) */}

      <section
        className="relative pt-[135px] sm:pt-[120px] md:pt-[120px] overflow-hidden text-gray-800 bg-white"

        // style={{
        //   backgroundImage: "url(/images/homebannerback.png)",
        //   backgroundSize: "cover",
        //   backgroundRepeat: "no-repeat",
        //   backgroundPosition: "center",
        // }}
      >
        <div className="absolute inset-0 bg-black/10 z-[1]" />

      <Swiper
  modules={[Autoplay, Navigation]}
  autoplay={{ delay: 4000, disableOnInteraction: false }}
  navigation={{
    nextEl: ".swiper-button-next-custom",
    prevEl: ".swiper-button-prev-custom",
  }}
  loop
  className="w-full h-[140px] sm:h-[350px] md:h-[520px] relative"
>
  {slides.map((slide) => (
    <SwiperSlide key={slide.id}>
      <div className="relative w-full h-full overflow-hidden">
        <Image
          src={slide.image}
          alt={slide.product}
          fill
          priority
          className="object-cover w-full h-full"
        />
      </div>
    </SwiperSlide>
  ))}

  {/* Arrows */}
  <div className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-50 bg-white/80 hover:bg-[#1daa61] text-[#1daa61] hover:text-white p-2 rounded-full shadow-md transition-all cursor-pointer">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
    </svg>
  </div>

  <div className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-50 bg-white/80 hover:bg-[#1daa61] text-[#1daa61] hover:text-white p-2 rounded-full shadow-md transition-all cursor-pointer">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
    </svg>
  </div>
</Swiper>

      </section>
    </>
  );
}
