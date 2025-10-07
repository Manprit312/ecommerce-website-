"use client";
import React from "react";
import "./loader.css";

export default function ThreeDLoader() {
  return (
    <div className="loader-container">
      {/* SVG gradient definitions */}
      <svg height="0" width="0" viewBox="0 0 64 64" className="absolute">
        <defs>
          {/* Mint gradients */}
          <linearGradient id="a1" x1="0" y1="62" x2="0" y2="2" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1daa61" />
            <stop stopColor="#b4f2d6" offset="1" />
          </linearGradient>

          <linearGradient id="a2" x1="0" y1="64" x2="0" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1daa61" />
            <stop stopColor="#85e7b8" offset="1" />
            <animateTransform
              attributeName="gradientTransform"
              type="rotate"
              values="0 32 32;360 32 32"
              dur="3s"
              repeatCount="indefinite"
            />
          </linearGradient>

          <linearGradient id="a3" x1="0" y1="62" x2="0" y2="2" gradientUnits="userSpaceOnUse">
            <stop stopColor="#5ef7b0" />
            <stop stopColor="#1daa61" offset="1" />
          </linearGradient>

          <linearGradient id="a4" x1="0" y1="62" x2="0" y2="2" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1daa61" />
            <stop stopColor="#5ef7b0" offset="1" />
          </linearGradient>
        </defs>
      </svg>

      {/* ARYA Animated Letters */}
      <div className="flex items-center justify-center gap-3 relative drop-shadow-xl">
        {/* A */}
        <svg viewBox="0 0 64 64" height="64" width="64" className="inline-block">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="8"
            stroke="url(#a1)"
            d="M32 6 L12 58 H20 L26 42 H38 L44 58 H52 L32 6 Z M30 34 H34"
            className="dash"
            pathLength="360"
          />
        </svg>

        {/* R */}
        <svg viewBox="0 0 64 64" height="64" width="64" className="inline-block">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="8"
            stroke="url(#a2)"
            d="M12 58 V6 H36 C48 6 50 26 36 26 H12 M36 26 L52 58"
            className="dash"
            pathLength="360"
          />
        </svg>

        {/* Y */}
        <svg viewBox="0 0 64 64" height="64" width="64" className="inline-block spin-slow">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="8"
            stroke="url(#a3)"
            d="M6 6 L32 32 L58 6 M32 32 V58"
            className="dash"
            pathLength="360"
          />
        </svg>

        {/* A */}
        <svg viewBox="0 0 64 64" height="64" width="64" className="inline-block">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="8"
            stroke="url(#a4)"
            d="M32 6 L12 58 H20 L26 42 H38 L44 58 H52 L32 6 Z M30 34 H34"
            className="dash"
            pathLength="360"
          />
        </svg>
      </div>

      {/* ENTERPRISES text */}
      <p className="text-[#1daa61] font-bold mt-6 tracking-[0.3em] text-xl uppercase drop-shadow-md animate-fadeIn">
        ENTERPRISES
      </p>

      <p className="text-gray-500 font-medium mt-2 tracking-wide animate-pulse">
        Loading your experience...
      </p>
    </div>
  );
}
