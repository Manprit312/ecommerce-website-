"use client";
import React, { useEffect, useState } from "react";
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

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs`);
        const data = await res.json();
        setBlogs(data);
      } catch (error) {
        console.error("❌ Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#E8FFF3] to-[#D6FFE5] py-20 px-6 overflow-hidden">
      {/* Background floating shapes */}
      <motion.div
        className="absolute w-72 h-72 bg-[#1daa61]/10 rounded-full blur-3xl top-20 -left-20"
        animate={{ y: [0, 30, -30, 0] }}
        transition={{ repeat: Infinity, duration: 12 }}
      />
      <motion.div
        className="absolute w-96 h-96 bg-[#1daa61]/15 rounded-full blur-3xl bottom-0 right-0"
        animate={{ y: [0, -20, 20, 0] }}
        transition={{ repeat: Infinity, duration: 15 }}
      />

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Page Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
        >
          Explore Our <span className="text-[#1daa61]">Blogs</span> 🌱
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 max-w-2xl mx-auto mb-16"
        >
          Stay updated with the latest insights, market analysis, and crypto trading
          tips from the Klypto team.
        </motion.p>

        {/* Blogs Grid */}
        {loading ? (
          <p className="text-gray-500 text-center">Loading blogs...</p>
        ) : blogs.length === 0 ? (
          <p className="text-gray-500 text-center">No blogs available.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {blogs.map((blog, index) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.04 }}
                className="bg-white rounded-3xl overflow-hidden shadow-lg border border-[#1daa61]/10 hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Blog Image */}
                {blog.image && (
                  <div className="relative h-52 w-full">
                    <Image
                      src={`${blog.image}`}
                      alt={blog.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Blog Content */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {blog.content.length > 120
                        ? blog.content.slice(0, 120) + "..."
                        : blog.content}
                    </p>
                  </div>

                  <div className="flex justify-between items-center text-sm text-gray-500 mt-auto">
                    <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                    <Link
                      href={`/blogs/${blog._id}`}
                      className="text-[#1daa61] font-semibold hover:underline"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
