"use client";

import { motion } from "framer-motion";

export default function DisclaimerPage() {
  return (
    <div className="bg-white text-gray-800">
      {/* HEADER SECTION */}
      <section className="bg-gradient-to-br from-[#e6fff3] to-white py-16 px-6 text-center mt-24">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-5xl font-bold text-[#1daa61]"
        >
          Disclaimer
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 text-gray-600 max-w-2xl mx-auto text-sm sm:text-lg"
        >
          Last updated on <span className="font-semibold">01 Jan 2025</span>
        </motion.p>
      </section>

      {/* CONTENT SECTION */}
      <section className="max-w-5xl mx-auto py-16 px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#f5fff9] border border-[#1daa61]/20 shadow-lg rounded-2xl p-6 sm:p-10"
        >
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#1daa61] mb-4">
            General Information
          </h2>
          <p className="text-gray-700 leading-[1.7] mb-6 text-sm sm:text-base">
            The information provided on this website is for general informational
            and educational purposes only. While we strive to provide accurate and
            up-to-date details, we make no guarantees regarding the accuracy,
            reliability, or completeness of any information.
          </p>

          <h2 className="text-xl sm:text-2xl font-semibold text-[#1daa61] mb-3">
            Product Accuracy
          </h2>
          <p className="text-gray-700 leading-[1.7] mb-6 text-sm sm:text-base">
            Product images, descriptions, and specifications displayed on the 
            website are for illustrative purposes only. Actual product colors and 
            materials may vary slightly depending on screen settings and lighting.
          </p>

          <h2 className="text-xl sm:text-2xl font-semibold text-[#1daa61] mb-3">
            External Links Disclaimer
          </h2>
          <p className="text-gray-700 leading-[1.7] mb-6 text-sm sm:text-base">
            Our website may contain links to third-party websites. These are
            provided for convenience and do not imply endorsement. We are not
            responsible for any external site content, security, or privacy
            practices.
          </p>

          <h2 className="text-xl sm:text-2xl font-semibold text-[#1daa61] mb-3">
            No Liability
          </h2>
          <p className="text-gray-700 leading-[1.7] mb-6 text-sm sm:text-base">
            We are not liable for any damages, losses, or consequences that occur
            from using this website or purchasing/using products from it. All
            purchases are made at your own discretion.
          </p>

          <h2 className="text-xl sm:text-2xl font-semibold text-[#1daa61] mb-3">
            Contact Us
          </h2>
          <p className="text-gray-700 leading-[1.7] text-sm sm:text-base">
            If you have questions regarding this disclaimer, you may contact us at:
            <br />
            <span className="font-semibold text-[#1daa61]">
              support@aryaenterprises.com
            </span>
          </p>
        </motion.div>
      </section>

      {/* CTA SECTION */}
      <section className="text-center bg-gradient-to-r from-[#d9ffe8] to-[#f1fff7] py-14 px-6">
        <motion.button
          whileHover={{ scale: 1.07 }}
          className="px-8 py-3 bg-[#1daa61] text-white rounded-full font-semibold shadow-lg text-sm sm:text-lg hover:bg-[#179d56] transition"
          onClick={() => (window.location.href = "/")}
        >
          Return to Home →
        </motion.button>
      </section>
    </div>
  );
}
