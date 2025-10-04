"use client";
import React, { useState, useEffect } from "react";
import Breadcrumb from "../Common/Breadcrumb";
import CustomSelect from "./CustomSelect";
import CategoryDropdown from "./CategoryDropdown";
import GenderDropdown from "./GenderDropdown";
import SizeDropdown from "./SizeDropdown";
import ColorsDropdwon from "./ColorsDropdwon";
import PriceDropdown from "./PriceDropdown";
import shopData from "../Shop/shopData";
import SingleGridItem from "../Shop/SingleGridItem";
import SingleListItem from "../Shop/SingleListItem";
import { motion } from "framer-motion";

const ShopWithSidebar = () => {
  const [productStyle, setProductStyle] = useState("grid");
  const [productSidebar, setProductSidebar] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);

  const handleStickyMenu = () => {
    setStickyMenu(window.scrollY >= 80);
  };

  const options = [
    { label: "Latest Products", value: "0" },
    { label: "Best Selling", value: "1" },
    { label: "Old Products", value: "2" },
  ];

  const categories = [
    { name: "Desktop", products: 10, isRefined: true },
    { name: "Laptop", products: 12, isRefined: false },
    { name: "Monitor", products: 30, isRefined: false },
    { name: "UPS", products: 23, isRefined: false },
    { name: "Phone", products: 10, isRefined: false },
    { name: "Watch", products: 13, isRefined: false },
  ];

  const genders = [
    { name: "Men", products: 10 },
    { name: "Women", products: 23 },
    { name: "Unisex", products: 8 },
  ];

  useEffect(() => {
    window.addEventListener("scroll", handleStickyMenu);

    function handleClickOutside(event: MouseEvent) {
      if (!(event.target as HTMLElement).closest(".sidebar-content")) {
        setProductSidebar(false);
      }
    }

    if (productSidebar) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [productSidebar]);

  return (
    <>
      <Breadcrumb
        title={"Explore All Products"}
        pages={["shop", "/", "shop with sidebar"]}
      />
      <section className="overflow-hidden relative pb-20 pt-5 lg:pt-20 xl:pt-28 
                          bg-gradient-to-br from-[#fff5f7] via-[#ffe6eb] to-[#fff]">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex gap-7.5">
            {/* Sidebar */}
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 120, damping: 15 }}
              className={`sidebar-content fixed xl:z-1 z-9999 left-0 top-0 
                          xl:translate-x-0 xl:static max-w-[310px] xl:max-w-[270px] w-full 
                          ease-out duration-200 backdrop-blur-md rounded-xl shadow-lg
                          ${productSidebar
                            ? "translate-x-0 bg-white/90 p-5 h-screen overflow-y-auto"
                            : "-translate-x-full"
                          }`}
            >
              <button
                onClick={() => setProductSidebar(!productSidebar)}
                className={`xl:hidden absolute -right-12.5 sm:-right-8 flex items-center 
                            justify-center w-8 h-8 rounded-md bg-white shadow-md`}
              >
                ✖
              </button>

              {/* Sidebar filters */}
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="flex flex-col gap-6">
                  {/* Filter Box */}
                  <div className="bg-gradient-to-r from-[#ec4972] to-[#ff758f] text-white shadow-md rounded-lg py-4 px-5">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">Filters</p>
                      <button className="text-white/80 hover:text-white">
                        Clear All
                      </button>
                    </div>
                  </div>

                  {/* Dropdowns */}
                  <CategoryDropdown categories={categories} />
                  <GenderDropdown genders={genders} />
                  <SizeDropdown />
                  <ColorsDropdwon />
                  <PriceDropdown />
                </div>
              </form>
            </motion.div>

            {/* Content */}
            <div className="xl:max-w-[870px] w-full">
              {/* Topbar */}
              <div className="rounded-lg bg-white/90 backdrop-blur-sm shadow-lg pl-3 pr-2.5 py-2.5 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap items-center gap-4">
                    <CustomSelect options={options} />
                    <p>
                      Showing <span className="text-[#ec4972]">9 of 50</span> Products
                    </p>
                  </div>

                  {/* Grid/List Switch */}
                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => setProductStyle("grid")}
                      className={`${
                        productStyle === "grid"
                          ? "bg-gradient-to-r from-[#ec4972] to-[#ff758f] text-white"
                          : "bg-gray-100 text-gray-600"
                      } flex items-center justify-center w-10.5 h-9 rounded-md shadow-md transition`}
                    >
                      ⬜
                    </button>
                    <button
                      onClick={() => setProductStyle("list")}
                      className={`${
                        productStyle === "list"
                          ? "bg-gradient-to-r from-[#ec4972] to-[#ff758f] text-white"
                          : "bg-gray-100 text-gray-600"
                      } flex items-center justify-center w-10.5 h-9 rounded-md shadow-md transition`}
                    >
                      ☰
                    </button>
                  </div>
                </div>
              </div>

              {/* Products */}
              <div
                className={`${
                  productStyle === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-7.5 gap-y-9"
                    : "flex flex-col gap-7.5"
                }`}
              >
                {shopData.map((item, key) =>
                  productStyle === "grid" ? (
                    <motion.div
                      key={key}
                      whileHover={{ rotateY: 10, rotateX: -5, scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 180, damping: 18 }}
                    >
                      <SingleGridItem item={item} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key={key}
                      whileHover={{ scale: 1.02, y: -5 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    >
                      <SingleListItem item={item} />
                    </motion.div>
                  )
                )}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-15">
                <div className="bg-white/90 backdrop-blur-md shadow-md rounded-md p-2">
                  <ul className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5, "...", 10].map((page, i) => (
                      <li key={i}>
                        <a
                          href="#"
                          className={`flex py-1.5 px-3.5 rounded-md transition
                            ${page === 1
                              ? "bg-gradient-to-r from-[#ec4972] to-[#ff758f] text-white"
                              : "hover:bg-gradient-to-r hover:from-[#ec4972] hover:to-[#ff758f] hover:text-white"
                            }`}
                        >
                          {page}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            {/* Content End */}
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopWithSidebar;
