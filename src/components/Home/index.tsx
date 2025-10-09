// "use client";
// import React, { useState } from "react";
// import Header from "../Header";
// import HomeBanner from "./HomeBanner/HomeBanner";
// import ProductsGrid from "./ProductsGrid";
// import ProductDetails from "./ProductDetails";
// import Categories from "../Categories";
// import { useRouter } from "next/navigation";
// import NetworkBackground from "../background";



// export default function EcommerceWebsite() {
//   const trendingProducts = products.filter(
//     (p) => p.category.toLowerCase() === "trending"
//   );
  
//   const [favorites, setFavorites] = useState([]);
 
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [filtered, setFiltered] = useState(trendingProducts);
//   const [currentCategory, setCurrentCategory] = useState("Trending");
// const router = useRouter();
//   const handleCategorySelect = (category: string) => {
//     const filteredProducts = products.filter(
//       (p) => p.category.toLowerCase() === category.toLowerCase()
//     );
//     setFiltered(filteredProducts);
//     setCurrentCategory(category);
//   };

//  const handleViewAll = () => {
//   const encoded = encodeURIComponent(JSON.stringify(filtered));
//   router.push(`/category/${currentCategory.toLowerCase()}?data=${encoded}`);
// };

  
//   const toggleFavorite = (id) =>
//     setFavorites(
//       favorites.includes(id)
//         ? favorites.filter((i) => i !== id)
//         : [...favorites, id]
//     );
//   const viewProductDetails = (p) => setSelectedProduct(p);

//   return selectedProduct ? (
//     <ProductDetails
//       product={selectedProduct}
//       // addToCart={addToCart}
//       toggleFavorite={toggleFavorite}
//       favorites={favorites}
//       goBack={() => setSelectedProduct(null)}
//       // cart={cart}
//     />
//   ) : (
//     <>
//       <HomeBanner />
      

//       <Categories onCategorySelect={handleCategorySelect} />

//       {/* --- Product Section --- */}
//       <div className="relative">
//         <ProductsGrid
//           products={filtered}
//           // addToCart={addToCart}
//           toggleFavorite={toggleFavorite}
//           favorites={favorites}
//           viewProductDetails={viewProductDetails}
//         />

//         {/* View All Button */}
//         <div className="flex justify-end px-6 mb-12">
//           <button
//             onClick={handleViewAll}
//             className="px-5 py-2 mt-4 text-sm font-semibold text-white bg-[#1daa61] rounded-full shadow-md hover:bg-[#17a055] transition-all duration-300"
//           >
//             View All 
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }

"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {  selectProduct, clearSelectedProduct } from "@/redux/features/productSlice";
// import { toggleFavorite } from "@/redux/slices/favoriteSlice";
import { useRouter } from "next/navigation";
import HomeBanner from "./HomeBanner/HomeBanner";
import Categories from "../Categories";
import ProductsGrid from "./ProductsGrid";
import ProductDetails from "./ProductDetails";
import type { RootState } from "@/redux/store"; // ✅ import the type

export default function EcommerceWebsite() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { filtered, currentCategory, selectedProduct } = useSelector(
    (state: RootState) => state.products // ✅ Type-safe access
  );
  // const favorites = useSelector((state) => state.favorites.ids);



  const handleViewAll = () => {
    const encoded = encodeURIComponent(JSON.stringify(filtered));
    router.push(`/category/${currentCategory.toLowerCase()}?data=${encoded}`);
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
      <HomeBanner />
      <Categories  />
      <div className="relative">
        <ProductsGrid
        
          // toggleFavorite={(id) => dispatch(toggleFavorite(id))}
          // favorites={favorites}
        
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
    </>
  );
}
