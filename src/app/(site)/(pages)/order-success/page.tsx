"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

export default function OrderSuccess() {
  const params = useSearchParams();
  const orderId = params.get("orderId");       // backend order id
  const paymentId = params.get("paymentId");   // razorpay payment id
  const router = useRouter();

  return (
    <div className="h-screen flex flex-col justify-center items-center px-6 text-center">
      <CheckCircle2 className="text-[#1daa61] w-16 h-16 mb-4" />

      <h1 className="text-3xl font-bold text-[#1daa61]">🎉 Order Successful!</h1>
      <p className="mt-2 text-gray-600">Thank you for shopping with us 💚</p>

      <div className="mt-6 bg-white shadow rounded-lg p-5 border border-gray-100 text-left w-full max-w-md">
        <p className="font-medium">Order ID:</p>
        <p className="font-mono text-sm text-gray-600">{orderId}</p>

        <p className="font-medium mt-4">Payment ID:</p>
        <p className="font-mono text-sm text-gray-600">{paymentId}</p>
      </div>

      <button
        onClick={() => router.push("/account")}
        className="mt-6 bg-[#1daa61] px-6 py-2 text-white rounded-full font-semibold"
      >
        Go to Orders
      </button>
    </div>
  );
}
