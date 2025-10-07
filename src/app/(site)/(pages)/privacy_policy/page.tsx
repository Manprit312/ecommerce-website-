"use client";
import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, Eye, Mail, Database } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-[#f5fff9] via-white to-[#e8f9f1] py-10 relative overflow-hidden">
      {/* 🌿 Floating Background */}
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
          Privacy <span className="text-[#1daa61]">Policy</span> 🔒
        </motion.h1>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 border border-[#1daa61]/10 shadow-lg rounded-3xl p-6 sm:p-8 mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="text-[#1daa61]" />
            <h2 className="text-2xl font-semibold text-gray-800">
              Our Commitment to Your Privacy
            </h2>
          </div>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            At <span className="font-semibold text-[#1daa61]">Arya Enterprises</span>, 
            we value your trust and respect your privacy. This policy explains how we collect, use, and protect your personal data when you shop with us.
          </p>
        </motion.div>

        {/* Data Collection Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-[#f8fff9] to-white border border-[#1daa61]/10 shadow-md rounded-3xl p-6 sm:p-8 mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <Database className="text-[#1daa61]" />
            <h2 className="text-2xl font-semibold text-gray-800">
              Information We Collect
            </h2>
          </div>

          <ul className="list-disc list-inside text-gray-700 text-sm sm:text-base leading-relaxed space-y-3">
            <li>🪪 Personal details such as your name, email, phone number, and shipping address.</li>
            <li>💳 Payment details (processed securely via trusted third-party gateways).</li>
            <li>🛒 Order history and preferences to improve your shopping experience.</li>
            <li>📈 Usage data including pages visited, time spent, and clicks (via analytics tools).</li>
          </ul>
        </motion.div>

        {/* Data Usage Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/90 border border-[#1daa61]/10 shadow-lg rounded-3xl p-6 sm:p-8 mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <Eye className="text-[#1daa61]" />
            <h2 className="text-2xl font-semibold text-gray-800">
              How We Use Your Data
            </h2>
          </div>

          <ul className="list-disc list-inside text-gray-700 text-sm sm:text-base space-y-3 leading-relaxed">
            <li>To process your orders and deliver products efficiently.</li>
            <li>To send order updates, offers, or support-related communication.</li>
            <li>To personalize your browsing and shopping experience.</li>
            <li>To analyze website performance and enhance usability.</li>
          </ul>
        </motion.div>

        {/* Data Protection Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-[#f8fff9] to-white border border-[#1daa61]/10 shadow-md rounded-3xl p-6 sm:p-8 mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <Lock className="text-[#1daa61]" />
            <h2 className="text-2xl font-semibold text-gray-800">
              Protecting Your Information
            </h2>
          </div>

          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            We implement advanced security measures including encryption, firewalls, 
            and secure servers to ensure your data remains confidential.  
            Your payment information is handled by secure third-party processors compliant with 
            <strong> PCI-DSS standards</strong>.
          </p>
        </motion.div>

        {/* Data Sharing Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white/90 border border-[#1daa61]/10 shadow-lg rounded-3xl p-6 sm:p-8 mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <Mail className="text-[#1daa61]" />
            <h2 className="text-2xl font-semibold text-gray-800">
              Data Sharing & Third Parties
            </h2>
          </div>

          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            We never sell or trade your data. We may share limited information with trusted partners such as shipping providers or payment gateways, strictly to fulfill your orders.  
            These partners are obligated to keep your data secure and confidential.
          </p>
        </motion.div>

        {/* Your Rights Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="bg-gradient-to-br from-[#f8fff9] to-white border border-[#1daa61]/10 shadow-md rounded-3xl p-6 sm:p-8 mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="text-[#1daa61]" />
            <h2 className="text-2xl font-semibold text-gray-800">
              Your Rights
            </h2>
          </div>

          <ul className="list-disc list-inside text-gray-700 text-sm sm:text-base space-y-3 leading-relaxed">
            <li>🔍 Request a copy of your stored data.</li>
            <li>🧹 Request correction or deletion of inaccurate data.</li>
            <li>🚫 Opt out of promotional emails anytime by clicking “Unsubscribe.”</li>
          </ul>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="bg-white/90 border border-[#1daa61]/10 shadow-lg rounded-3xl p-6 sm:p-8 text-center"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Have Questions About Your Privacy?
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mb-4">
            Feel free to contact us with any concerns or requests regarding your personal information.
          </p>
          <a
            href="mailto:aryaenterprises499@gmail.com"
            className="inline-block px-6 py-3 bg-[#1daa61] text-white rounded-xl font-medium shadow-md hover:bg-[#189c57] hover:shadow-lg transition-all"
          >
            Contact Privacy Team
          </a>
        </motion.div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-600 mt-10 text-sm"
        >
          💚 Last updated: January 2025 | Arya Enterprises — Committed to protecting your privacy.
        </motion.p>
      </div>
    </section>
  );
}
