
"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {  selectProduct, clearSelectedProduct } from "@/redux/features/productSlice";
import ProductCard from "./ProductCard";
import NetworkBackground from "../background";
import { useRouter } from "next/navigation";
import HomeBanner from "./HomeBanner/HomeBanner";
import Categories from "../Categories";
import ProductsGrid from "./ProductsGrid";
import ProductDetails from "./ProductDetails";
import type { RootState } from "@/redux/store"; // ✅ import the type
import SalePopup from "./SalePopup";
import UncategorizedProducts from "./UncategorizedProducts";
export default function EcommerceWebsite() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { filtered, currentCategory, selectedProduct } = useSelector(
    (state: RootState) => state.products // ✅ Type-safe access
  );
  // const favorites = useSelector((state) => state.favorites.ids);



  const handleViewAll = () => {
    const encoded = encodeURIComponent(JSON.stringify(filtered));
    router.push(`/category/${currentCategory.toLowerCase()}`);
  };

  return selectedProduct ? (
    <ProductDetails
      product={selectedProduct}
      // toggleFavorite={(id) => dispatch(toggleFavorite(id))}
      // favorites={favorites}
      goBack={() => dispatch(clearSelectedProduct())}
    />
  ) : (
    <>
     <NetworkBackground />
     <SalePopup />
      <HomeBanner />
      <Categories  />
      <div className="relative">
        <ProductsGrid
        
         
        
        />

        <div className="flex justify-end px-6 mb-12">
          <button
            onClick={handleViewAll}
            className="px-5 py-2 mt-4 text-sm font-semibold text-white bg-[#1daa61] rounded-full shadow-md hover:bg-[#17a055] transition-all duration-300"
          >
            View All
          </button>
        </div>
      </div>
      <UncategorizedProducts/>
    </>
  );
}
