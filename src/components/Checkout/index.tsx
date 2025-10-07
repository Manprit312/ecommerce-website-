"use client";
import React, { useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ShoppingBag, CreditCard, MapPin, ArrowLeft } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalAmount, totalQuantity } = useAppSelector(
    (state) => state.cart
  );

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.address ||
      !form.city ||
      !form.pincode
    ) {
      alert("Please fill all the fields 🌿");
      return;
    }

    console.log("✅ Order Placed:", { ...form, items });
    alert("Your order has been placed successfully!");
    router.push("/profile");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5fff9] via-white to-[#e6fff1] py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center text-[#1daa61] hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Cart
          </button>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <ShoppingBag className="text-[#1daa61]" />
            Checkout
          </h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left: Shipping Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white shadow-xl rounded-2xl p-8 border border-[#1daa61]/10"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <MapPin className="text-[#1daa61]" /> Shipping Information
            </h2>

            <div className="space-y-4">
              {[
                { name: "name", label: "Full Name" },
                { name: "email", label: "Email Address" },
                { name: "phone", label: "Phone Number" },
                { name: "address", label: "Address" },
                { name: "city", label: "City" },
                { name: "pincode", label: "Pincode" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-gray-700 text-sm mb-1">
                    {field.label}
                  </label>
                  <input
                    type="text"
                    name={field.name}
                    value={(form as any)[field.name]}
                    onChange={handleChange}
                    placeholder={field.label}
                    className="w-full border border-gray-300 rounded-full px-4 py-2 text-gray-700 focus:ring-2 focus:ring-[#1daa61] focus:border-[#1daa61] outline-none"
                  />
                </div>
              ))}
            </div>

            <button
              onClick={handlePlaceOrder}
              className="mt-8 w-full bg-[#1daa61] text-white font-semibold py-3 rounded-full shadow-md hover:bg-[#179f55] transition-all duration-300"
            >
              Place Order
            </button>
          </motion.div>

          {/* Right: Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-white shadow-xl rounded-2xl p-8 border border-[#1daa61]/10"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <CreditCard className="text-[#1daa61]" /> Order Summary
            </h2>

            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
              {items.length === 0 ? (
                <p className="text-gray-500">Your cart is empty 🛍️</p>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center border-b border-gray-100 pb-3"
                  >
                    <div>
                      <p className="text-gray-800 font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="text-[#1daa61] font-semibold">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))
              )}
            </div>

            <div className="mt-6 border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between text-gray-700">
                <p>Subtotal</p>
                <p>₹{totalAmount.toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-gray-700">
                <p>Shipping</p>
                <p className="text-[#1daa61]">Free</p>
              </div>
              <div className="flex justify-between font-semibold text-lg text-gray-800">
                <p>Total</p>
                <p className="text-[#1daa61]">₹{totalAmount.toFixed(2)}</p>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="mt-6 w-full bg-[#1daa61] text-white font-semibold py-3 rounded-full shadow-md hover:bg-[#179f55] transition-all duration-300"
            >
              Confirm & Pay
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
