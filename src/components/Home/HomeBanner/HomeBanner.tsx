"use client";
import React,{
  useEffect,useState
} from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./hero-swiper.css"; // Keep your styling

export default function HeroSection() {
  // const slides = [
  //   {
  //     id: 1,
  //     title: "Illuminate Your Special Moments",
  //     subtitle: "Perfect Gift Ideas",
  //     description:
  //       "Elegant LED photo frames and warm lighting solutions to make every occasion memorable.",
  //     image: "/images/banner1.png",
  //     product: "Swan LED Photo Frame",
  //     tag: "Wedding Gift Special",
  //   },
  //   {
  //     id: 2,
  //     title: "Bring Magic to Your Home Decor",
  //     subtitle: "Handcrafted Designs",
  //     description:
  //       "Beautifully crafted LED lamps designed with simplicity, nature, and luxury in mind.",
  //     image: "/images/banner2.png",
  //     product: "Wooden LED Table Lamp",
  //     tag: "Minimal & Elegant",
  //   },
  //   {
  //     id: 3,
  //     title: "Light That Speaks Love",
  //     subtitle: "Romantic Lighting Gifts",
  //     description:
  //       "Gift moments of warmth and light with heart-shaped LED frames for your loved ones.",
  //     image: "/images/banner3.png",
  //     product: "Crystal Heart Frame",
  //     tag: "Best Seller",
  //   },
  // ];
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
    <section
      className="relative overflow-hidden bg-white text-gray-800"
      style={{
        backgroundImage: "url(/images/homebannerback.png)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <Swiper
        modules={[Autoplay, Navigation]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        loop
        className="w-full "
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
          <div className="relative pt-2 md:py-10 transition-all duration-700">
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
                  </div>

                  {/* Right Section */}
                  <div className="hidden md:flex justify-center">
                    <div className="relative bg-grey/80 backdrop-blur-3xl rounded-2xl p-6 border border-[#1daa61]/20 flex flex-col items-center transform perspective-[1000px]">
                      <div className="relative  md:w-96 md:h-72 mb-3 overflow-hidden rounded-xl transform-gpu transition-transform duration-700 ease-in-out hover:rotate-y-6 hover:scale-[1.05]">
                        <Image
                          src={slide.image}
                          alt={slide.product}
                          fill
                          className="object-cover rounded-2xl transition-transform duration-[6000ms] ease-in-out"
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

        {/* Custom Navigation Buttons */}
        <div className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-[#1daa61] text-[#1daa61] hover:text-white p-2 rounded-full shadow-md transition-all cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </div>

        <div className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-[#1daa61] text-[#1daa61] hover:text-white p-2 rounded-full shadow-md transition-all cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </Swiper>
    </section>
  );
}
