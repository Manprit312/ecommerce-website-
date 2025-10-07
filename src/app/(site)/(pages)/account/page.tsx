"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  MapPin,
  Phone,
  Edit3,
  Package,
  Calendar,
  LogOut,
  UserRound
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();

  const [user] = useState({
    name: "Manprit Kaur",
    email: "manprit@example.com",
    phone: "+91 98765 43210",
    address: "Mohali, Punjab, India",
    avatar: "/images/avatar.jpg",
  });

  const orders = [
    {
      id: "ORD-1243",
      date: "Oct 1, 2025",
      total: "₹2,499",
      status: "Delivered",
      items: 2,
    },
    {
      id: "ORD-1242",
      date: "Sep 23, 2025",
      total: "₹1,299",
      status: "In Transit",
      items: 1,
    },
  ];

  // 🔐 Handle logout logic
  const handleLogout = () => {
    // Example logout flow:
    // - Clear user session (localStorage, Redux, Firebase signOut)
    // - Redirect to /login
    localStorage.removeItem("user");
    console.log("User logged out");
    router.push("/signin");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5fff9] via-white to-[#e6fff1] py-16 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            My Profile
          </h1>
          <p className="text-gray-500 mt-2">
            Manage your personal information and orders
          </p>
        </div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white shadow-xl rounded-2xl p-8 border border-[#1daa61]/10 mb-10 relative"
        >
          {/* Logout button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="absolute top-5 right-5 flex items-center gap-2 text-sm font-medium text-[#1daa61] hover:text-white hover:bg-[#1daa61] border border-[#1daa61] px-3 py-1.5 rounded-full transition-all duration-300 shadow-sm"
          >
            <LogOut size={16} />
            Logout
          </motion.button>

          <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-10">
            {/* Avatar */}
            <div className="relative h-50">
                <UserRound width={120} height={120}/>
              {/* <Image
                src={user.avatar}
                alt={user.name}
                width={120}
                height={120}
                className="rounded-full border-4 border-[#1daa61]/30 object-cover"
              /> */}
              {/* <button className="absolute bottom-2 right-2 bg-[#1daa61] text-white p-1.5 rounded-full shadow-md hover:bg-[#179e56] transition">
                <Edit3 size={16} />
              </button> */}
            </div>

            {/* Info */}
            <div className="mt-6 md:mt-0 text-center md:text-left space-y-3">
              <h2 className="text-2xl font-semibold text-gray-800">
                {user.name}
              </h2>
              <div className="flex items-center justify-center md:justify-start gap-2 text-gray-600">
                <Mail size={16} /> <span>{user.email}</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2 text-gray-600">
                <Phone size={16} /> <span>{user.phone}</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2 text-gray-600">
                <MapPin size={16} /> <span>{user.address}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Order History */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <Package className="text-[#1daa61]" size={20} /> Order History
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            {orders.map((order) => (
              <motion.div
                key={order.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white border border-[#1daa61]/10 rounded-2xl shadow-sm p-6 hover:shadow-lg transition"
              >
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-semibold text-gray-800">
                    {order.id}
                  </h4>
                  <span
                    className={`text-sm font-medium px-3 py-1 rounded-full ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    {order.date}
                  </div>
                  <span>{order.items} items</span>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <p className="font-semibold text-[#1daa61]">{order.total}</p>
                  <button className="text-sm font-medium text-[#1daa61] hover:underline">
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
