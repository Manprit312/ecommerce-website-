"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { LogIn } from "lucide-react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/firebase/config";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/userSlice";
import type { AppDispatch } from "@/redux/store";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);

const handleGoogleLogin = async () => {
  try {
    setLoading(true);
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    const userData = {
      uid: user.uid,
      displayName: user.displayName || "",
      email: user.email || "",
      photoURL: user.photoURL || "",
    };

    // ✅ Save in Redux & localStorage
    dispatch(setUser(userData));
    localStorage.setItem("user", JSON.stringify(userData));

    // ✅ Send to backend to track user
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    console.log("✅ Google Login Success:", userData.displayName);
    router.push("/");
  } catch (error) {
    console.error("❌ Login failed:", error);
    alert("Login failed, please try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5fff9] via-white to-[#e6fff1] relative overflow-hidden">
      {/* Mint glow */}
      <motion.div
        className="absolute w-64 h-64 bg-[#1daa61]/20 rounded-full blur-3xl top-20 left-10"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-72 h-72 bg-[#1daa61]/25 rounded-full blur-3xl bottom-20 right-10"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl px-10 py-14 w-[90%] max-w-md border border-[#1daa61]/10 text-center"
      >
        <div className="mx-auto mb-6 flex justify-center items-center w-16 h-16 rounded-full bg-[#1daa61]/10">
          <LogIn className="text-[#1daa61] w-8 h-8" />
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Welcome to Arya Enterprises
        </h1>
        <p className="text-gray-500 text-sm mb-8">
          Sign in with Google to continue 🌿
        </p>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 py-3 rounded-full border border-gray-200 shadow-sm bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-[2px]"
        >
          {loading ? (
            <span className="text-gray-500 text-sm">Signing in...</span>
          ) : (
            <>
              {/* Google Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.7 1.22 9.21 3.61l6.85-6.85C36.67 2.63 30.83 0 24 0 14.62 0 6.33 5.34 2.45 13.11l7.98 6.2C12.2 13.51 17.64 9.5 24 9.5z"
                />
                <path
                  fill="#34A853"
                  d="M46.98 24.55c0-1.6-.14-3.14-.39-4.65H24v9.02h12.94c-.56 2.9-2.23 5.36-4.73 7.02l7.27 5.66c4.24-3.92 6.5-9.69 6.5-17.05z"
                />
                <path
                  fill="#4A90E2"
                  d="M10.43 28.81c-.59-1.76-.92-3.63-.92-5.56 0-1.93.33-3.8.92-5.56l-7.98-6.2C.88 15.9 0 19.86 0 24s.88 8.1 2.45 12.51l7.98-6.2z"
                />
                <path
                  fill="#FBBC05"
                  d="M24 48c6.48 0 11.91-2.13 15.88-5.81l-7.27-5.66c-2.01 1.35-4.59 2.13-8.61 2.13-6.36 0-11.8-4.01-13.57-9.81l-7.98 6.2C6.33 42.66 14.62 48 24 48z"
                />
              </svg>
              <span className="text-gray-700 font-medium">
                Continue with Google
              </span>
            </>
          )}
        </button>

        <p className="text-xs text-gray-400 mt-8">
          By continuing, you agree to our{" "}
          <span className="text-[#1daa61] font-medium hover:underline cursor-pointer">
            Terms
          </span>{" "}
          and{" "}
          <span className="text-[#1daa61] font-medium hover:underline cursor-pointer">
            Privacy Policy
          </span>.
        </p>
      </motion.div>
    </div>
  );
}
