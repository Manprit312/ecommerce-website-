"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  LogOut,
  Package,
  Calendar,
  UserRound,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "@/redux/features/userSlice";
import { auth } from "@/firebase/config";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: any) => state.user.user);
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
const [showModal, setShowModal] = useState(false);
const [loadingDetails, setLoadingDetails] = useState(false);
const handleViewDetails = async (orderId: string) => {
  setLoadingDetails(true);
  setShowModal(true);
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/orders/details/${orderId}`
    );
    const data = await res.json();
    if (data.success) {
      setSelectedOrder(data.order);
    } else {
      console.error("Error fetching order:", data.message);
    }
  } catch (err) {
    console.error("Error fetching order details:", err);
  } finally {
    setLoadingDetails(false);
  }
};
  // 🔐 Logout
  const handleLogout = async () => {
    await signOut(auth);
    dispatch(clearUser());
    localStorage.removeItem("user");
    router.push("/signin");
  };

  // 🧠 Fetch user orders
  useEffect(() => {
    if (user?.email) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
            setOrders(data.orders);
          
        })
        .catch((err) => console.error("Error fetching orders:", err))
        .finally(() => setLoadingOrders(false));
    }
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
        Loading user data...
      </div>
    );
  }
console.log(orders)
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5fff9] via-white to-[#e6fff1] py-16 px-4 md:px-8" >
      <div className="max-w-5xl mx-auto" onClick={(e) => e.target === e.currentTarget && setShowModal(false)}>
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
          {/* Logout */}
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
            <div className="relative">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || "User Avatar"}
                  className="w-32 h-32 rounded-full border-4 border-[#1daa61]/30 object-cover"
                />
              ) : (
                <UserRound width={120} height={120} className="text-gray-400" />
              )}
            </div>

            <div className="mt-6 md:mt-0 text-center md:text-left space-y-3">
              <h2 className="text-2xl font-semibold text-gray-800">
                {user.displayName || "Guest User"}
              </h2>
              {user.email && (
                <div className="flex items-center justify-center md:justify-start gap-2 text-gray-600">
                  <Mail size={16} /> <span>{user.email}</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Orders */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <Package className="text-[#1daa61]" size={20} /> Order History
          </h3>

          {loadingOrders ? (
            <p className="text-gray-500">Fetching your orders...</p>
          ) : orders.length === 0 ? (
            <p className="text-gray-500">No orders found.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {orders.map((order) => (
                <motion.div
                  key={order._id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white border border-[#1daa61]/10 rounded-2xl shadow-sm p-6 hover:shadow-lg transition"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-semibold text-gray-800">
                      {order._id.slice(-6).toUpperCase()}
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
                      {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                    <span>{order.items.length} items</span>
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <p className="font-semibold text-[#1daa61]">
                      ₹{order.totalAmount}
                    </p>
                    <button
  onClick={() => handleViewDetails(order._id)}
  className="text-sm font-medium text-[#1daa61] hover:underline"
>
  View Details
</button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
      {showModal && (
  <motion.div
    className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <motion.div
      className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 relative"
      initial={{ scale: 0.9, y: 30 }}
      animate={{ scale: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Close button */}
      <button
        onClick={() => {
          setShowModal(false);
          setSelectedOrder(null);
        }}
        className="absolute top-3 right-4 text-gray-500 hover:text-black text-2xl leading-none"
      >
        ×
      </button>

      {loadingDetails ? (
        <p className="text-center text-gray-500 py-10">Loading order details...</p>
      ) : selectedOrder ? (
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Order #{selectedOrder._id.slice(-6).toUpperCase()}
          </h3>

          <div className="mb-4 space-y-1 text-gray-600 text-sm">
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`px-2 py-1 rounded-full ${
                  selectedOrder.status === "Delivered"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {selectedOrder.status}
              </span>
            </p>
            <p>
              <strong>Payment Method:</strong> {selectedOrder.paymentMethod}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(selectedOrder.createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* Address */}
          <div className="bg-gray-50 p-3 rounded-lg mb-4 text-sm text-gray-700">
            <p>
              <strong>Shipping Address:</strong>
            </p>
            <p>
              {selectedOrder.address}, {selectedOrder.city} -{" "}
              {selectedOrder.pincode}
            </p>
          </div>

          {/* Items */}
          <h4 className="text-lg font-semibold text-gray-800 mb-2">
            Ordered Items
          </h4>
          <div className="divide-y divide-gray-200 mb-4">
            {selectedOrder.items.map((item: any, index: number) => (
              <div
                key={index}
                className="flex justify-between py-2 text-sm text-gray-700"
              >
                <div className="flex items-center gap-3">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 rounded object-cover"
                    />
                  )}
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                </div>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between font-semibold text-gray-800 text-lg">
            <span>Total:</span>
            <span>₹{selectedOrder.totalAmount}</span>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 py-10">No order data available.</p>
      )}
    </motion.div>
  </motion.div>
)}

    </div>
  );
}
