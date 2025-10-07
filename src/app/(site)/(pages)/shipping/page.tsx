"use client";
import React from "react";
import { motion } from "framer-motion";
import { Truck, Package, Clock, RefreshCw, ShieldCheck } from "lucide-react";

export default function ShippingPage() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-[#f5fff9] via-white to-[#e8f9f1] py-10 relative overflow-hidden">
      {/* 🌿 Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-72 h-72 bg-[#1daa61]/15 rounded-full -top-10 -left-10 blur-3xl"
          animate={{ y: [0, 25, -25, 0] }}
          transition={{ repeat: Infinity, duration: 12 }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-[#1daa61]/10 rounded-full bottom-0 right-0 blur-3xl"
          animate={{ y: [0, -20, 20, 0] }}
          transition={{ repeat: Infinity, duration: 14 }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto px-5 sm:px-8">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-10"
        >
          Shipping <span className="text-[#1daa61]">Information</span> 🚚
        </motion.h1>

        {/* Info Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: <Truck className="w-8 h-8 text-[#1daa61]" />,
              title: "Free Shipping",
              desc: "Enjoy free shipping on all orders above ₹999 across India.",
            },
            {
              icon: <Clock className="w-8 h-8 text-[#1daa61]" />,
              title: "Fast Delivery",
              desc: "We usually deliver within 3–7 business days depending on your location.",
            },
            {
              icon: <Package className="w-8 h-8 text-[#1daa61]" />,
              title: "Real-time Tracking",
              desc: "Track your orders with live courier updates once dispatched.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="bg-white/90 border border-[#1daa61]/10 shadow-md rounded-2xl p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <div className="flex justify-center mb-3">{item.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Policy Details */}
        <div className="bg-white/90 border border-[#1daa61]/10 shadow-lg rounded-3xl p-6 sm:p-8 space-y-6">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-semibold text-gray-800 flex items-center gap-2"
          >
            <ShieldCheck className="text-[#1daa61]" /> Our Shipping Policy
          </motion.h2>

          <div className="space-y-5 text-gray-700 text-sm sm:text-base leading-relaxed">
            <p>
              At <span className="font-semibold text-[#1daa61]">Arya Enterprises</span>, 
              we take pride in ensuring every order reaches you safely, securely, and on time.
            </p>

            <ul className="space-y-3 list-disc list-inside">
              <li>
                Orders are processed within <span className="font-medium">1–2 business days</span> after payment confirmation.
              </li>
              <li>
                We deliver pan-India using trusted courier partners such as <strong>BlueDart</strong>, <strong>Delhivery</strong>, and <strong>DTDC</strong>.
              </li>
              <li>
                Once shipped, you’ll receive an email or SMS with your <strong>tracking number</strong>.
              </li>
              <li>
                Deliveries may take longer during holidays, remote areas, or due to unforeseen delays.
              </li>
            </ul>
          </div>
        </div>

        {/* Returns & Refunds */}
        <div className="bg-gradient-to-br from-[#f8fff9] to-white border border-[#1daa61]/10 shadow-md rounded-3xl p-6 sm:p-8 mt-8 space-y-5">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-semibold text-gray-800 flex items-center gap-2"
          >
            <RefreshCw className="text-[#1daa61]" /> Returns & Replacements
          </motion.h2>

          <div className="text-gray-700 text-sm sm:text-base leading-relaxed">
            <p>
              We offer easy returns or replacements within{" "}
              <strong>7 days</strong> of delivery for eligible items. Please
              ensure the product is unused, in its original packaging, and has
              all accessories intact.
            </p>
            <p className="mt-3">
              To initiate a return, email us at{" "}
              <a
                href="mailto:aryaenterprises499@gmail.com"
                className="text-[#1daa61] underline font-medium"
              >
                aryaenterprises499@gmail.com
              </a>{" "}
              with your order details.
            </p>
          </div>
        </div>

        {/* Delivery FAQs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-10 bg-white/90 border border-[#1daa61]/10 shadow-lg rounded-3xl p-6 sm:p-8"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-5">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4 text-gray-700 text-sm sm:text-base">
            <div>
              <h4 className="font-semibold text-[#1daa61]">How can I track my order?</h4>
              <p>
                You’ll receive a tracking link via email or SMS once your order
                is shipped. You can also log in to your Arya account to check
                your order status.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-[#1daa61]">Do you offer international shipping?</h4>
              <p>
                Currently, we only ship within India. International shipping
                options will be available soon.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-[#1daa61]">
                Can I change my shipping address after ordering?
              </h4>
              <p>
                Yes! Contact our support team within 12 hours of placing your
                order to modify your shipping details.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Footer Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-600 mt-10 text-sm"
        >
          💚 Thank you for shopping with <span className="text-[#1daa61] font-medium">Arya Enterprises</span>.
          We appreciate your trust in our products and service.
        </motion.div>
      </div>
    </section>
  );
}
