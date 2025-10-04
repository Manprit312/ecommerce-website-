"use client";
import React from "react";
import Image from "next/image";
import { Product } from "@/types/product";
import { useModalContext } from "@/app/context/QuickViewModalContext";
import { updateQuickView } from "@/redux/features/quickView-slice";
import { addItemToCart } from "@/redux/features/cart-slice";
import { addItemToWishlist } from "@/redux/features/wishlist-slice";
import { updateproductDetails } from "@/redux/features/product-details";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import Link from "next/link";
import { motion } from "framer-motion";

const ProductItem = ({ item }: { item: Product }) => {
  const { openModal } = useModalContext();
  const dispatch = useDispatch<AppDispatch>();

  const handleQuickViewUpdate = () => dispatch(updateQuickView({ ...item }));
  const handleAddToCart = () => dispatch(addItemToCart({ ...item, quantity: 1 }));
  const handleItemToWishList = () =>
    dispatch(addItemToWishlist({ ...item, status: "available", quantity: 1 }));
  const handleProductDetails = () => dispatch(updateproductDetails({ ...item }));

  return (
    <div className="perspective-1000">
      <motion.div
        className="group bg-white rounded-2xl p-5 shadow-xl cursor-pointer transition-all duration-300 mb-4 relative overflow-hidden"
        whileHover={{
          rotateY: 15,
          rotateX: -8,
          scale: 1.08,
          boxShadow: "0 25px 40px rgba(0,0,0,0.25)",
        }}
        transition={{ type: "spring", stiffness: 180, damping: 18 }}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Glow background */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-white to-pink-50 opacity-60 group-hover:opacity-80 blur-2xl transition-all"></div>

        {/* Product Image */}
        <div className="relative overflow-visible flex items-center justify-center rounded-lg min-h-[270px] mb-4">
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10"
            style={{ transform: "translateZ(40px)" }} // makes image pop out
          >
            <Image
              src={item.imgs.previews[0]}
              alt=""
              width={220}
              height={220}
              className="drop-shadow-2xl"
            />
            {/* Glow ring */}
            <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-[#ec4972] to-[#ff758f] opacity-20 blur-2xl"></div>
          </motion.div>

          {/* Hover Action Buttons */}
          <div
            className="absolute left-0 bottom-0 translate-y-full w-full flex items-center justify-center gap-2.5 pb-5 
            ease-linear duration-300 group-hover:translate-y-0 z-20"
            style={{ transform: "translateZ(60px)" }}
          >
            <button
              onClick={() => {
                openModal();
                handleQuickViewUpdate();
              }}
              aria-label="Quick view"
              className="flex items-center justify-center w-9 h-9 rounded-md shadow-md bg-white text-dark hover:text-[#ec4972] transition"
            >
           <svg
              className="fill-current"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.99992 5.49996C6.61921 5.49996 5.49992 6.61925 5.49992 7.99996C5.49992 9.38067 6.61921 10.5 7.99992 10.5C9.38063 10.5 10.4999 9.38067 10.4999 7.99996C10.4999 6.61925 9.38063 5.49996 7.99992 5.49996ZM6.49992 7.99996C6.49992 7.17153 7.17149 6.49996 7.99992 6.49996C8.82835 6.49996 9.49992 7.17153 9.49992 7.99996C9.49992 8.82839 8.82835 9.49996 7.99992 9.49996C7.17149 9.49996 6.49992 8.82839 6.49992 7.99996Z"
                fill=""
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.99992 2.16663C4.9905 2.16663 2.96345 3.96942 1.78696 5.49787L1.76575 5.52543C1.49968 5.87098 1.25463 6.18924 1.08838 6.56556C0.910348 6.96854 0.833252 7.40775 0.833252 7.99996C0.833252 8.59217 0.910348 9.03138 1.08838 9.43436C1.25463 9.81068 1.49968 10.1289 1.76575 10.4745L1.78696 10.5021C2.96345 12.0305 4.9905 13.8333 7.99992 13.8333C11.0093 13.8333 13.0364 12.0305 14.2129 10.5021L14.2341 10.4745C14.5002 10.1289 14.7452 9.81069 14.9115 9.43436C15.0895 9.03138 15.1666 8.59217 15.1666 7.99996C15.1666 7.40775 15.0895 6.96854 14.9115 6.56556C14.7452 6.18923 14.5002 5.87097 14.2341 5.52541L14.2129 5.49787C13.0364 3.96942 11.0093 2.16663 7.99992 2.16663ZM2.5794 6.10783C3.66568 4.69657 5.43349 3.16663 7.99992 3.16663C10.5663 3.16663 12.3342 4.69657 13.4204 6.10783C13.7128 6.48769 13.8841 6.71466 13.9967 6.96966C14.102 7.20797 14.1666 7.49925 14.1666 7.99996C14.1666 8.50067 14.102 8.79195 13.9967 9.03026C13.8841 9.28526 13.7128 9.51223 13.4204 9.89209C12.3342 11.3033 10.5663 12.8333 7.99992 12.8333C5.43349 12.8333 3.66568 11.3033 2.5794 9.89209C2.28701 9.51223 2.11574 9.28525 2.00309 9.03026C1.89781 8.79195 1.83325 8.50067 1.83325 7.99996C1.83325 7.49925 1.89781 7.20797 2.00309 6.96966C2.11574 6.71466 2.28701 6.48769 2.5794 6.10783Z"
                fill=""
              />
            </svg>
            </button>

            <button
              onClick={handleAddToCart}
              className="px-5 py-[7px] rounded-md bg-gradient-to-r from-[#ec4972] to-[#ff758f] text-white font-medium text-sm shadow-md hover:shadow-xl hover:scale-[1.05] transition"
            >
              Add to cart
            </button>

            <button
              onClick={handleItemToWishList}
              aria-label="Add to Wishlist"
              className="flex items-center justify-center w-9 h-9 rounded-md shadow-md bg-white text-dark hover:text-[#ec4972] transition"
            >
         <svg
              className="fill-current"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.74949 2.94946C2.6435 3.45502 1.83325 4.65749 1.83325 6.0914C1.83325 7.55633 2.43273 8.68549 3.29211 9.65318C4.0004 10.4507 4.85781 11.1118 5.694 11.7564C5.89261 11.9095 6.09002 12.0617 6.28395 12.2146C6.63464 12.491 6.94747 12.7337 7.24899 12.9099C7.55068 13.0862 7.79352 13.1667 7.99992 13.1667C8.20632 13.1667 8.44916 13.0862 8.75085 12.9099C9.05237 12.7337 9.3652 12.491 9.71589 12.2146C9.90982 12.0617 10.1072 11.9095 10.3058 11.7564C11.142 11.1118 11.9994 10.4507 12.7077 9.65318C13.5671 8.68549 14.1666 7.55633 14.1666 6.0914C14.1666 4.65749 13.3563 3.45502 12.2503 2.94946C11.1759 2.45832 9.73214 2.58839 8.36016 4.01382C8.2659 4.11175 8.13584 4.16709 7.99992 4.16709C7.864 4.16709 7.73393 4.11175 7.63967 4.01382C6.26769 2.58839 4.82396 2.45832 3.74949 2.94946ZM7.99992 2.97255C6.45855 1.5935 4.73256 1.40058 3.33376 2.03998C1.85639 2.71528 0.833252 4.28336 0.833252 6.0914C0.833252 7.86842 1.57358 9.22404 2.5444 10.3172C3.32183 11.1926 4.2734 11.9253 5.1138 12.5724C5.30431 12.7191 5.48911 12.8614 5.66486 12.9999C6.00636 13.2691 6.37295 13.5562 6.74447 13.7733C7.11582 13.9903 7.53965 14.1667 7.99992 14.1667C8.46018 14.1667 8.88401 13.9903 9.25537 13.7733C9.62689 13.5562 9.99348 13.2691 10.335 12.9999C10.5107 12.8614 10.6955 12.7191 10.886 12.5724C11.7264 11.9253 12.678 11.1926 13.4554 10.3172C14.4263 9.22404 15.1666 7.86842 15.1666 6.0914C15.1666 4.28336 14.1434 2.71528 12.6661 2.03998C11.2673 1.40058 9.54129 1.5935 7.99992 2.97255Z"
                fill=""
              />
            </svg>
            </button>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2.5 mb-2 z-10 relative" style={{ transform: "translateZ(30px)" }}>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Image
                key={i}
                src="/images/icons/icon-star.svg"
                alt="star"
                width={14}
                height={14}
                className={i < 4 ? "opacity-100" : "opacity-30"}
              />
            ))}
          </div>
          <p className="text-sm text-gray-500">({item.reviews})</p>
        </div>

        {/* Title */}
        <h3
          className="font-semibold text-gray-800 hover:text-[#ec4972] transition-colors duration-200 mb-1.5 relative z-10"
          onClick={handleProductDetails}
          style={{ transform: "translateZ(35px)" }}
        >
          <Link href="/shop-details">{item.title}</Link>
        </h3>

        {/* Price */}
        <span
          className="flex items-center gap-2 font-medium text-lg relative z-10"
          style={{ transform: "translateZ(35px)" }}
        >
          <span className="text-[#ec4972]">${item.discountedPrice}</span>
          <span className="text-gray-400 line-through">${item.price}</span>
        </span>
      </motion.div>
    </div>
  );
};

export default ProductItem;
