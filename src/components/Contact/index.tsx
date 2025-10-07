"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setStatus("success");
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setStatus("idle"), 3000);
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#f5fff9] via-white to-[#e8f9f1] py-10 relative overflow-hidden">
      {/* Background Glow Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-72 h-72 bg-[#1daa61]/15 rounded-full top-10 -left-20 blur-3xl"
          animate={{ y: [0, 25, -25, 0] }}
          transition={{ repeat: Infinity, duration: 10 }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-[#1daa61]/10 rounded-full bottom-0 right-0 blur-3xl"
          animate={{ y: [0, -20, 20, 0] }}
          transition={{ repeat: Infinity, duration: 12 }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-10"
        >
          Get in <span className="text-[#1daa61]">Touch</span> 💌
        </motion.h1>

        {/* Grid Layout */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-10">
          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/90 backdrop-blur-md border border-[#1daa61]/10 rounded-3xl shadow-lg p-6 sm:p-8 flex flex-col gap-5"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-1 text-center sm:text-left">
              Send us a Message ✍️
            </h2>
            <p className="text-gray-500 text-sm mb-2 text-center sm:text-left">
              We’ll get back to you within 24 hours.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1daa61] focus:ring-1 focus:ring-[#1daa61] outline-none text-gray-700 shadow-sm"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1daa61] focus:ring-1 focus:ring-[#1daa61] outline-none text-gray-700 shadow-sm"
              />
            </div>

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message..."
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1daa61] focus:ring-1 focus:ring-[#1daa61] outline-none text-gray-700 shadow-sm"
            ></textarea>

            <motion.button
              type="submit"
              whileTap={{ scale: 0.97 }}
              disabled={status === "loading"}
              className="w-full flex justify-center items-center gap-2 bg-[#1daa61] text-white py-3 rounded-xl font-semibold 
              hover:bg-[#189c57] shadow-[0_8px_20px_rgba(29,170,97,0.3)] transition-all text-sm sm:text-base"
            >
              {status === "loading" ? (
                <span className="animate-pulse">Sending...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Message
                </>
              )}
            </motion.button>

            {status === "success" && (
              <p className="text-green-600 text-center font-medium mt-2 animate-fade-in">
                ✅ Message sent successfully!
              </p>
            )}
            {status === "error" && (
              <p className="text-red-500 text-center font-medium mt-2 animate-fade-in">
                ⚠️ Please fill all the fields.
              </p>
            )}
          </motion.form>

          {/* Contact Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-[#f8fff9] to-white border border-[#1daa61]/10 rounded-3xl shadow-lg p-6 sm:p-8 text-center md:text-left flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Reach Us Directly 📍
              </h2>
              <div className="space-y-4 text-gray-700 text-sm sm:text-base">
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <Mail className="text-[#1daa61]" />
                  <span>aryaenterprises499@gmail.com</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <Phone className="text-[#1daa61]" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <MapPin className="text-[#1daa61]" />
                  <span>Plot No. 21, Industrial Area Phase 8, Mohali, India</span>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-2xl overflow-hidden border border-[#1daa61]/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3432.148975091242!2d76.69539271512797!3d30.704648981646665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390f9496bcb91b35%3A0xd97a42bcb03b6c64!2sMohali!5e0!3m2!1sen!2sin!4v1697025256652!5m2!1sen!2sin"
                width="100%"
                height="220"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
