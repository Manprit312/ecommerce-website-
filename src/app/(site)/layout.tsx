"use client";
import "../css/euclid-circular-a-font.css";
import "../css/style.css";
import { ReduxProvider } from "@/redux/provider";
import LayoutContent from "./LayoutContent"; // 👈 create a child component for actual logic

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <ReduxProvider>
          {/* 👇 ReduxProvider now wraps everything */}
          <LayoutContent>{children}</LayoutContent>
        </ReduxProvider>
      </body>
    </html>
  );
}
