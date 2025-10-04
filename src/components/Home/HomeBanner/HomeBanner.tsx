"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const HeroBanner = () => {
  return (
    <section className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#ff4d6d] via-[#ff758f] to-[#ffe0e6] mt-19">
      {/* Animated gradient blobs */}
      <motion.div
        className="absolute top-10 left-10 w-72 h-72 rounded-full bg-white/20 blur-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-[#ff4d6d]/30 blur-3xl"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content Wrapper */}
      <div className="relative z-10 max-w-6xl w-full flex flex-col lg:flex-row items-center justify-between px-6 lg:px-20">
        {/* Left Content */}
        <motion.div
          className="text-center lg:text-left max-w-lg backdrop-blur-lg bg-white/20 p-8 rounded-2xl shadow-2xl"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg">
            Elevate Your Sound
          </h1>
          <p className="mt-6 text-lg text-white/90 leading-relaxed">
            Experience music like never before with our 3D immersive wireless
            headphones. Crystal clear, powerful, and built for you.
          </p>
          <motion.a
            href="#shop"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block mt-8 px-8 py-4 text-lg font-semibold text-white rounded-xl shadow-lg bg-gradient-to-r from-[#ff4d6d] to-[#ff758f] hover:shadow-2xl transition"
          >
            Shop Now
          </motion.a>
        </motion.div>

        {/* Right 3D Product */}
        <motion.div
          className="mt-12 lg:mt-0"
          animate={{ y: [0, -20, 0], rotateY: [0, 15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/images/hero/hero-01.png"
            alt="3D Headphone"
            width={450}
            height={450}
            className="drop-shadow-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroBanner;
