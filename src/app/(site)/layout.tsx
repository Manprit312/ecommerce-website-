"use client";
import "../css/euclid-circular-a-font.css";
import "../css/style.css";
import { ReduxProvider } from "@/redux/provider";
import LayoutContent from "./LayoutContent"; // 👈 create a child component for actual logic
import Script from "next/script";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
     <head>
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive" // ✅ prevents blocking render
        />
      </head>
      <body>
        <ReduxProvider>
          {/* 👇 ReduxProvider now wraps everything */}
          <LayoutContent>{children}</LayoutContent>
        </ReduxProvider>
      </body>
    </html>
  );
}
