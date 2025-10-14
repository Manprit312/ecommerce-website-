"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface Blog {
  _id: string;
  title: string;
  content: string;
  image: string;
  author?: string;
  createdAt: string;
}

export default function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchBlog = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${id}`);
        if (!res.ok) throw new Error("Failed to fetch blog details");
        const data = await res.json();
        setBlog(data);
      } catch (error) {
        console.error("❌ Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading blog details...
      </div>
    );

  if (!blog)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Blog not found.
      </div>
    );

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-[#E8FFF3] to-[#D6FFE5] py-16 px-6 overflow-hidden">
      {/* Floating Gradient Orbs */}
      <motion.div
        className="absolute w-72 h-72 bg-[#1daa61]/10 rounded-full blur-3xl top-10 -left-16"
        animate={{ y: [0, 30, -30, 0] }}
        transition={{ repeat: Infinity, duration: 12 }}
      />
      <motion.div
        className="absolute w-96 h-96 bg-[#1daa61]/15 rounded-full blur-3xl bottom-0 right-0"
        animate={{ y: [0, -25, 25, 0] }}
        transition={{ repeat: Infinity, duration: 14 }}
      />

      <div className="relative z-10 max-w-4xl mx-auto  backdrop-blur-xl rounded-3xl shadow-xl border border-[#1daa61]/10 p-8 sm:p-12">
        {/* Image */}
        {blog.image && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative w-full h-80 rounded-2xl overflow-hidden mb-8"
          >
            <Image
              src={`${blog.image}`}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        )}

        {/* Metadata */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-4 mb-6 text-gray-600 text-sm"
        >
          <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
          <span>•</span>
          <span>{blog.author || "Admin"}</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl md:text-4xl font-bold text-gray-800 mb-6"
        >
          {blog.title}
        </motion.h1>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-700 leading-relaxed space-y-5"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Tags + Share */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap items-center justify-between gap-6 mt-10 border-t border-[#1daa61]/10 pt-6"
        >
          <div className="flex flex-wrap gap-3 items-center text-sm text-gray-600">
            <span>Tags:</span>
            <Link
              href="#"
              className="px-3 py-1.5 rounded-full border border-[#1daa61]/20 bg-white hover:bg-[#1daa61] hover:text-white transition-all"
            >
              Crypto
            </Link>
            <Link
              href="#"
              className="px-3 py-1.5 rounded-full border border-[#1daa61]/20 bg-white hover:bg-[#1daa61] hover:text-white transition-all"
            >
              Trading
            </Link>
          </div>

          {/* Social Icons */}
          <div className="flex gap-3">
            {[
              { href: "#", color: "#00ACEE", icon: "🐦" },
              { href: "#", color: "#1877F2", icon: "📘" },
              { href: "#", color: "#BD081C", icon: "📌" },
            ].map((item, i) => (
              <motion.a
                key={i}
                href={item.href}
                whileHover={{ scale: 1.1 }}
                className="flex items-center justify-center w-9 h-9 rounded-full text-white text-lg shadow-md"
                style={{ backgroundColor: item.color }}
              >
                {item.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
