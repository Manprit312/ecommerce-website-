"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { ModalProvider } from "../context/QuickViewModalContext";
import { CartModalProvider } from "../context/CartSidebarModalContext";
import { PreviewSliderProvider } from "../context/PreviewSliderContext";
import { Toaster } from "react-hot-toast";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { setUser, clearUser } from "@/redux/features/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/config";
import ThreeDLoader from "@/components/Loader";

export default function LayoutContent({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false);
    const cart: any[] = [];

    // 🔥 Redux
    const user = useAppSelector((state) => state.user.user);
    const dispatch = useAppDispatch();

    // ✅ Keep Redux user in sync with Firebase
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                const userData = {
                    uid: firebaseUser.uid,
                    displayName: firebaseUser.displayName || "",
                    email: firebaseUser.email || "",
                    photoURL: firebaseUser.photoURL || "",
                };
                dispatch(setUser(userData));
                localStorage.setItem("user", JSON.stringify(userData));
            } else {
                dispatch(clearUser());
                localStorage.removeItem("user");
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [dispatch]);

    // 🔒 Route protection and redirection logic
    // useEffect(() => {
    //     if (loading) return;

    //     const protectedRoutes = ["/account", "/","/privacy_policy","/contact","/refund&return","/shipping"];
    //     const authRoutes = [ "/signin"];

    //     const isProtected = protectedRoutes.some((route) =>
    //         pathname.startsWith(route)
    //     );
    //     const isAuthPage = authRoutes.some((route) =>
    //         pathname.startsWith(route)
    //     );

    //     // 🚫 Redirect unauthenticated users from protected pages
    //     if (!user && isProtected) {
    //         router.push("/signin");
    //     } console.log(user)
    //     // ✅ Redirect logged-in users away from auth pages
    //     if (user && isAuthPage) {
    //         router.push("/");
    //     }

    //     // ✅ Default logged-in users to "/" if they hit root
    //     if (user && pathname === "/") {
    //         router.push("/");
    //     }
    // }, [pathname, user, router, loading]);

    // 🚫 Hide layout on auth pages
    const hideLayout =
        pathname === "/login" ||
        pathname === "/signin" ||
        pathname?.startsWith("/auth");

    if (loading) return <><ThreeDLoader/></>; // or your preloader

    return (
        <CartModalProvider>
            <ModalProvider>
                <PreviewSliderProvider>
                    {!hideLayout && (
                        <Header
                            cart={cart}
                            menuOpen={menuOpen}
                            setMenuOpen={setMenuOpen}
                        />
                    )}

                    {children}
  <Toaster position="top-right" toastOptions={{ duration: 2000 }} />
                    {!hideLayout && <Footer />}
                </PreviewSliderProvider>
            </ModalProvider>
        </CartModalProvider>
    );
}
