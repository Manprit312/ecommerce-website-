"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
  return (
    <div className="bg-white text-gray-800">

    
     

      {/* ✅ MISSION — Mint background */}
      <section className="bg-[#e6fff3] py-12 sm:py-20 px-4 mt-27 sm:px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl font-bold text-[#1daa61]"
        >
          🎯 Our Mission
        </motion.h2>

        <p className="text-gray-700 max-w-2xl mx-auto mt-3 sm:mt-4 leading-[1.7] text-sm sm:text-base">
          To bring design-focused, carefully curated products that improve everyday living.
        </p>
      </section>

      {/* ✅ WHY CHOOSE US */}
      <section className="max-w-6xl mx-auto py-12 sm:py-20 px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { title: "Fast Delivery", icon: "🚚", text: "Shipped within 24–48 hours" },
          { title: "Secure Payments", icon: "💳", text: "Encrypted transactions" },
          { title: "Quality Checked", icon: "✅", text: "Every product is inspected" },
        ].map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="bg-white border border-[#1daa61]/20 shadow-md rounded-2xl p-6 sm:p-8 text-center"
          >
            <div className="text-4xl sm:text-5xl">{item.icon}</div>
            <h3 className="font-semibold text-lg sm:text-xl mt-3 text-[#1daa61]">{item.title}</h3>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">{item.text}</p>
          </motion.div>
        ))}
      </section>

      {/* ✅ VALUES */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20 text-center">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-2xl sm:text-3xl font-bold text-[#1daa61]"
        >
          💚 Our Values
        </motion.h2>

        <p className="text-gray-700 max-w-xl mx-auto mt-3 sm:mt-4 text-sm sm:text-base">
          Customer-first mindset • Honest pricing • Sustainable packaging • Innovation
        </p>
      </section>

      {/* ✅ CTA */}
      <section className="text-center bg-gradient-to-r from-[#d9ffe8] to-[#f1fff7] py-14 sm:py-16 px-4">
        <motion.button
          whileHover={{ scale: 1.08 }}
          className="px-6 sm:px-8 py-3 text-base sm:text-lg bg-[#1daa61] rounded-full text-white font-semibold shadow-lg hover:bg-[#179d56] transition"
          onClick={() => window.location.href = "/category/all"}
        >
          Explore Products →
        </motion.button>
      </section>
    </div>
  );
}
