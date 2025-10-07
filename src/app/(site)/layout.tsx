"use client";
import { useState, useEffect } from "react";
import "../css/euclid-circular-a-font.css";
import "../css/style.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { ModalProvider } from "../context/QuickViewModalContext";
import { CartModalProvider } from "../context/CartSidebarModalContext";
import { ReduxProvider } from "@/redux/provider";
import { usePathname } from "next/navigation";
import { PreviewSliderProvider } from "../context/PreviewSliderContext";

import ScrollToTop from "@/components/Common/ScrollToTop";
import PreLoader from "@/components/Common/PreLoader";
export default function RootLayout({ children }: { children: React.ReactNode }) {
const pathname = usePathname(); // 🔍 Get current route path
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const cart: any[] = []; // Example placeholder

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // example preloader delay
    return () => clearTimeout(timer);
  }, []);

  // 🚫 Hide header & footer on /login or /signin routes
  const hideLayout =
    pathname === "/login" ||
    pathname === "/signin" ||
    pathname?.startsWith("/auth");

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        {loading ? (
          <PreLoader />
        ) : (
          <>
            <ReduxProvider>
              <CartModalProvider>
                <ModalProvider>
                  <PreviewSliderProvider>
                    {/* Only show Header & Footer if not on login */}
                    {!hideLayout && (
                      <Header
                        cart={cart}
                        menuOpen={menuOpen}
                        setMenuOpen={setMenuOpen}
                      />
                    )}

                    {/* Page content */}
                    {children}

                    {!hideLayout && <Footer />}
                  </PreviewSliderProvider>
                </ModalProvider>
              </CartModalProvider>
            </ReduxProvider>

            {!hideLayout && <ScrollToTop />}
          </>
        )}
      </body>
    </html>
  );
}