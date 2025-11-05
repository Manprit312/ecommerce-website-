"use client";
import React, { useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
  CreditCard,
  MapPin,
  ArrowLeft,
  CheckCircle2,
  X,
} from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalAmount } = useAppSelector((state) => state.cart);

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState<"error" | "success" | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const nextStep = () => {
    const emptyField = Object.entries(form).find(([_, v]) => !v.trim());
    if (emptyField) {
      setShowPopup("error");
      return;
    }
    setStep(2);
  };
const handlePlaceOrder = async () => {
  setLoading(true);

  // 1️⃣ Create Razorpay order
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payment/create-order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount: totalAmount }),
  });

  const data = await res.json();

  const options = {
    key: data.key,
    order_id: data.orderId,
    amount: data.amount,
    handler: async function (response: any) {
      // 2️⃣ Save order in DB
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items,
          subtotal: totalAmount,
          totalAmount,
          paymentStatus: "Paid",
    paymentMethod: "Razorpay",
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
        }),
      });

      router.push(
      `/order-success?orderId=${data.orderId}&paymentId=${response.razorpay_payment_id}`
    );
    },
  };

  const razorpay = new (window as any).Razorpay(options);
  razorpay.open();

  setLoading(false);
};





  const closePopup = () => {
    setShowPopup(null);
    if (showPopup === "success") router.push("/profile");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5fff9] via-white to-[#e6fff1] py-6 px-4 sm:py-10 sm:px-8 mt-2">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 sm:mb-10">
          <button
            onClick={() => (step === 1 ? router.back() : setStep(1))}
            className="flex items-center text-[#1daa61] hover:text-[#179f55] transition text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            <span className="hidden sm:inline">
              {step === 1 ? "Back to Cart" : "Back to Shipping"}
            </span>
            <span className="sm:hidden">Back</span>
          </button>

          <h1 className="text-xl sm:text-3xl font-bold text-gray-800 flex items-center gap-2">
            <ShoppingBag className="text-[#1daa61] w-5 h-5 sm:w-6 sm:h-6" />
            Checkout
          </h1>
        </div>

        {/* Step Progress Bar - Fixed for Mobile */}
        <div className="relative max-w-md mx-auto mb-10 sm:mb-12 px-4">
          <div className="relative flex justify-between items-center">
            {/* Background Line */}
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 mx-12" />
            
            {/* Active Progress Line */}
            <div
              className="absolute top-5 left-12 h-0.5 bg-[#1daa61] transition-all duration-600 ease-in-out"
              style={{
                width: step === 1 ? "0%" : "calc(100% - 6rem)",
              }}
            />

            {/* Step 1 */}
            <div className="relative flex flex-col items-center z-10">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold shadow-lg text-white transition-all duration-300 ${
                  step >= 1 ? "bg-[#1daa61] scale-110" : "bg-gray-300"
                }`}
              >
                {step > 1 ? <CheckCircle2 className="w-5 h-5" /> : "1"}
              </div>
              <p
                className={`mt-2 text-xs sm:text-sm font-medium ${
                  step >= 1 ? "text-[#1daa61]" : "text-gray-500"
                }`}
              >
                Shipping
              </p>
              
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-col items-center z-10">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold shadow-lg text-white transition-all duration-300 ${
                  step === 2 ? "bg-[#1daa61] scale-110" : "bg-gray-300"
                }`}
              >
                2
              </div>
              <p
                className={`mt-2 text-xs sm:text-sm font-medium whitespace-nowrap ${
                  step === 2 ? "text-[#1daa61]" : "text-gray-500"
                }`}
              >
                Review & Pay
              </p>
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="relative">
         {step === 1 ? (
  <div
    key="step1"
    className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 border border-[#1daa61]/10 animate-fadeIn"
  >
    <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
      <MapPin className="text-[#1daa61] w-5 h-5" /> Shipping Information
    </h2>

    {/* ---------------- Shipping Form ---------------- */}
    <div className="space-y-4">
      {[
        { name: "name", label: "Full Name", type: "text" },
        { name: "email", label: "Email Address", type: "email" },
        { name: "phone", label: "Phone Number", type: "tel" },
        { name: "address", label: "Address", type: "text" },
        { name: "city", label: "City", type: "text" },
        { name: "pincode", label: "Pincode", type: "text" },
      ].map((field) => (
        <div key={field.name}>
          <label className="block text-gray-700 text-sm mb-1.5 font-medium">
            {field.label}
          </label>
          <input
            type={field.type}
            name={field.name}
            value={(form as any)[field.name]}
            onChange={handleChange}
            placeholder={`Enter ${field.label.toLowerCase()}`}
            className="w-full border border-gray-300 rounded-lg sm:rounded-full px-4 py-2.5 text-gray-700 focus:ring-2 focus:ring-[#1daa61] focus:border-[#1daa61] outline-none transition"
          />
        </div>
      ))}
    </div>

    {/* ---------------- Cart Summary Inside Step-1 ---------------- */}
    <div className="mt-10 bg-[#f5fff9] rounded-xl border border-[#1daa61]/20 p-4">
      <h3 className="font-semibold text-gray-800 mb-4 text-sm sm:text-base flex items-center gap-2">
        <ShoppingBag className="text-[#1daa61] w-4 h-4" />
        Order Summary
      </h3>

      <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2">
        {items.map((item) => (
          <div
            key={item._id}
            className="flex justify-between items-center border-b border-gray-100 pb-3"
          >
            <div>
              <p className="text-gray-800 font-medium text-sm sm:text-base">
                {item.name}
              </p>
              <p className="text-xs sm:text-sm text-gray-500">Qty: {item.quantity}</p>
            </div>
            <p className="text-[#1daa61] font-semibold text-sm sm:text-base">
              ₹{(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-between font-semibold text-gray-800 text-base sm:text-lg mt-4">
        <p>Total</p>
        <p className="text-[#1daa61]">₹{totalAmount.toFixed(2)}</p>
      </div>
    </div>

    {/* ---------------- Next Button ---------------- */}
    <button
      onClick={nextStep}
      className="mt-8 w-full bg-[#1daa61] text-white font-semibold py-3 rounded-lg sm:rounded-full shadow-lg hover:bg-[#179f55] active:scale-98 transition-all duration-300"
    >
      Continue to Review
    </button>
  </div>
) : (
            <div
              key="step2"
              className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 border border-[#1daa61]/10 animate-fadeIn"
            >
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <CreditCard className="text-[#1daa61] w-5 h-5" /> Review Your
                Order
              </h2>

              <div className="mb-6 p-4 bg-[#f5fff9] rounded-xl border border-[#1daa61]/20">
                <h3 className="font-semibold text-gray-800 mb-3 text-sm sm:text-base">
                  Shipping Details
                </h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <p className="font-medium text-gray-800">{form.name}</p>
                  <p>{form.email}</p>
                  <p>{form.phone}</p>
                  <p>
                    {form.address}, {form.city}, {form.pincode}
                  </p>
                </div>
              </div>

              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                {items.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between items-center border-b border-gray-100 pb-3"
                  >
                    <div>
                      <p className="text-gray-800 font-medium text-sm sm:text-base">
                        {item.name}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="text-[#1daa61] font-semibold text-sm sm:text-base">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-gray-700 text-sm sm:text-base">
                  <p>Subtotal</p>
                  <p>₹{totalAmount.toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-gray-700 text-sm sm:text-base">
                  <p>Shipping</p>
                  <p className="text-[#1daa61] font-medium">Free</p>
                </div>
                <div className="flex justify-between font-semibold text-base sm:text-lg text-gray-800 pt-2">
                  <p>Total</p>
                  <p className="text-[#1daa61]">₹{totalAmount.toFixed(2)}</p>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={loading}
                className="mt-8 w-full bg-[#1daa61] text-white font-semibold py-3 rounded-lg sm:rounded-full shadow-lg hover:bg-[#179f55] active:scale-98 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="border-2 border-white border-t-transparent rounded-full w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" /> Confirm & Pay
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Popups */}
        {showPopup && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fadeIn"
            onClick={closePopup}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-sm relative animate-scaleIn"
            >
              <button
                onClick={closePopup}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
              >
                <X className="w-5 h-5" />
              </button>

              {showPopup === "error" ? (
                <>
                  <div className="text-5xl sm:text-6xl mb-4 text-center">
                    ⚠️
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 text-center mb-2">
                    Missing Fields
                  </h3>
                  <p className="text-gray-600 text-center mb-6 text-sm sm:text-base">
                    Please fill all shipping fields before continuing.
                  </p>
                  <button
                    onClick={closePopup}
                    className="w-full bg-[#1daa61] text-white rounded-lg sm:rounded-full py-2.5 font-semibold hover:bg-[#179f55] transition"
                  >
                    Got it
                  </button>
                </>
              ) : (
                <>
                  <div className="text-5xl sm:text-6xl mb-4 text-center">
                    🎉
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 text-center mb-2">
                    Order Placed Successfully!
                  </h3>
                  <p className="text-gray-600 text-center mb-6 text-sm sm:text-base">
                    Thank you for your purchase. Redirecting to your profile...
                  </p>
                  <button
                    onClick={closePopup}
                    className="w-full bg-[#1daa61] text-white rounded-lg sm:rounded-full py-2.5 font-semibold hover:bg-[#179f55] transition"
                  >
                    Continue
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .active-scale-98:active {
          transform: scale(0.98);
        }
      `}</style>
    </div>
  );
}