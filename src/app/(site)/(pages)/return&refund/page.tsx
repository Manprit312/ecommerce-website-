"use client";
import React from "react";
import { motion } from "framer-motion";
import { RefreshCw, ShieldCheck, Package, Mail, Clock } from "lucide-react";

export default function ReturnsPage() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-[#f5fff9] via-white to-[#e8f9f1] py-10 relative overflow-hidden">
      {/* 🌿 Floating Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-72 h-72 bg-[#1daa61]/15 rounded-full top-0 -left-10 blur-3xl"
          animate={{ y: [0, 25, -25, 0] }}
          transition={{ repeat: Infinity, duration: 10 }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-[#1daa61]/10 rounded-full bottom-0 right-0 blur-3xl"
          animate={{ y: [0, -20, 20, 0] }}
          transition={{ repeat: Infinity, duration: 14 }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto px-5 sm:px-8">
        {/* Page Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-10"
        >
          Returns & <span className="text-[#1daa61]">Refund Policy</span> ♻️
        </motion.h1>

        {/* Overview Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 border border-[#1daa61]/10 shadow-lg rounded-3xl p-6 sm:p-8 mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="text-[#1daa61]" />
            <h2 className="text-2xl font-semibold text-gray-800">
              Our Promise
            </h2>
          </div>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            At <span className="font-semibold text-[#1daa61]">Arya Enterprises</span>,
            we aim to deliver products you’ll love! If something doesn’t meet
            your expectations, we offer a simple, worry-free return and refund
            process.
          </p>
        </motion.div>

        {/* Return Policy Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-[#f8fff9] to-white border border-[#1daa61]/10 shadow-md rounded-3xl p-6 sm:p-8 mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <RefreshCw className="text-[#1daa61]" />
            <h2 className="text-2xl font-semibold text-gray-800">
              Return Policy
            </h2>
          </div>

          <ul className="space-y-4 text-gray-700 text-sm sm:text-base leading-relaxed">
            <li>
              🕒 Returns are accepted within{" "}
              <strong>7 days of delivery</strong> for most items.
            </li>
            <li>
              📦 Items must be{" "}
              <strong>unused, undamaged, and in their original packaging</strong>{" "}
              with all accessories.
            </li>
            <li>
              🚫 Products damaged due to misuse or handling issues will not be
              eligible for return.
            </li>
            <li>
              💳 Customized, clearance, or discounted products are{" "}
              <strong>non-returnable</strong> unless received defective.
            </li>
          </ul>
        </motion.div>

        {/* Refund Process Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/90 border border-[#1daa61]/10 shadow-lg rounded-3xl p-6 sm:p-8 mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <Clock className="text-[#1daa61]" />
            <h2 className="text-2xl font-semibold text-gray-800">
              Refund Process
            </h2>
          </div>

          <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">
            Once your returned item is received and inspected, we will notify
            you of the approval or rejection of your refund.
          </p>

          <ul className="space-y-3 text-gray-700 text-sm sm:text-base">
            <li>
              ✅ Approved refunds will be processed within{" "}
              <strong>5–7 business days</strong> to your original payment method.
            </li>
            <li>
              💸 If your refund is delayed beyond 7 days, please contact our
              support team.
            </li>
            <li>
              🔁 If your product is defective, you can also request a{" "}
              <strong>replacement</strong> instead of a refund.
            </li>
          </ul>
        </motion.div>

        {/* How to Request a Return */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-[#f8fff9] to-white border border-[#1daa61]/10 shadow-md rounded-3xl p-6 sm:p-8 mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <Package className="text-[#1daa61]" />
            <h2 className="text-2xl font-semibold text-gray-800">
              How to Request a Return
            </h2>
          </div>

          <ol className="list-decimal list-inside text-gray-700 text-sm sm:text-base space-y-3 leading-relaxed">
            <li>
              Email us at{" "}
              <a
                href="mailto:aryaenterprises499@gmail.com"
                className="text-[#1daa61] underline font-medium"
              >
                support@aryaenterprises.com
              </a>{" "}
              with your order number and reason for return.
            </li>
            <li>
              Our support team will guide you through packaging and courier
              instructions.
            </li>
            <li>
              Once we receive the product, we’ll inspect it and process your
              refund or replacement.
            </li>
          </ol>
        </motion.div>

        {/* Customer Support Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white/90 border border-[#1daa61]/10 shadow-md rounded-3xl p-6 sm:p-8 text-center"
        >
          <Mail className="w-8 h-8 text-[#1daa61] mx-auto mb-3" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Need Assistance?
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mb-4">
            We’re here to help! Reach out for any refund, return, or delivery
            issue.
          </p>
          <a
            href="mailto:support@aryaenterprises.com"
            className="inline-block px-6 py-3 bg-[#1daa61] text-white rounded-xl font-medium shadow-md hover:bg-[#189c57] hover:shadow-lg transition-all"
          >
            Contact Support
          </a>
        </motion.div>

        {/* Footer Message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-600 mt-10 text-sm"
        >
          💚 Thank you for trusting{" "}
          <span className="text-[#1daa61] font-medium">Arya Enterprises</span>.
          We value your satisfaction above all else.
        </motion.p>
      </div>
    </section>
  );
}
