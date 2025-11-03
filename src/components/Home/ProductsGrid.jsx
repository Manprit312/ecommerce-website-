"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "./ProductCard";

import { fetchProducts } from "@/redux/features/productSlice";
import ThreeDLoader from "../Loader";

export default function ProductsGrid() {
  const dispatch = useDispatch();
  const { filtered, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading)
    return (
      
        <ThreeDLoader />
     
    );

  if (error)
    return (
      <div className="text-center text-red-600 font-medium mt-10">
        Failed to load products: {error}
      </div>
    );

  if (!filtered || filtered.length === 0)
    return (
      <div className="text-center text-gray-500 font-medium mt-10">
        No products available.
      </div>
    );

  return (
    <>
     
      <section className="relative w-full py-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/20 pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {filtered.map((product) => (
              <ProductCard
                key={product._id || product.id}
                product={product}
                allprod={filtered}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
