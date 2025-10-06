// "use client";
// import React from "react";
// import { ShoppingCart, Star, Heart, ArrowLeft } from "lucide-react";
// import Image from "next/image";
// export default function ProductDetails({
//   product,
//   addToCart,
//   toggleFavorite,
//   favorites,
//   goBack,
//   cart,
// }) {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
//       {/* Header */}
//       <header className="bg-white/90 backdrop-blur-lg shadow-md sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center py-4">
//             <button
//               onClick={goBack}
//               className="flex items-center space-x-2 text-gray-700 hover:text-amber-600 transition-colors"
//             >
//               <ArrowLeft className="w-5 h-5" />
//               <span className="font-medium">Back to Shop</span>
//             </button>

//             <div className="flex items-center space-x-4">
//               <button className="relative p-2 hover:bg-amber-100 rounded-lg transition-colors">
//                 <ShoppingCart className="w-5 h-5 text-gray-700" />
//                 {cart.length > 0 && (
//                   <span className="absolute -top-1 -right-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
//                     {cart.length}
//                   </span>
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Product Detail Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
//           <div className="grid md:grid-cols-2 gap-8 p-8">
//             {/* Left: Product Image */}
//             <div>
//               <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl h-96 flex items-center justify-center text-9xl mb-6">
//             <Image src={product.images[0]} alt={product.name} width={400} height={400} className="object-contain h-full w-auto" />
//               </div>
//               {product.badge && (
//                 <span className="inline-block bg-gradient-to-r from-amber-500 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
//                   {product.badge}
//                 </span>
//               )}
//             </div>

//             {/* Right: Product Info */}
//             <div>
//               <h1 className="text-4xl font-bold text-gray-800 mb-4">{product.name}</h1>

//               <div className="flex items-center space-x-2 mb-6">
//                 <div className="flex items-center">
//                   {[...Array(5)].map((_, i) => (
//                     <Star
//                       key={i}
//                       className={`w-5 h-5 ${
//                         i < Math.floor(product.rating)
//                           ? "fill-yellow-400 text-yellow-400"
//                           : "text-gray-300"
//                       }`}
//                     />
//                   ))}
//                 </div>
//                 <span className="text-lg font-semibold text-gray-700">
//                   {product.rating}
//                 </span>
//                 <span className="text-gray-500">({product.reviews} reviews)</span>
//               </div>

//               <div className="mb-8">
//                 <span className="text-5xl font-bold text-amber-600">
//                   ${product.price}
//                 </span>
//                 {product.inStock && (
//                   <p className="text-lg text-green-600 font-medium mt-2">
//                     In Stock - Ready to Ship
//                   </p>
//                 )}
//               </div>

//               <p className="text-gray-600 text-lg mb-8 leading-relaxed">
//                 {product.description}
//               </p>

//               {/* Product Specifications */}
//               {product.specs && (
//                 <div className="bg-amber-50 rounded-2xl p-6 mb-8">
//                   <h3 className="font-bold text-xl mb-4 text-gray-800">
//                     Product Specifications
//                   </h3>
//                   <div className="space-y-3">
//                     {Object.entries(product.specs).map(([key, value]) => {
//                       if (key === "features") {
//                         return (
//                           <div key={key}>
//                             <span className="font-semibold capitalize text-gray-700">
//                               Features:
//                             </span>
//                             <div className="flex flex-wrap gap-2 mt-2">
//                               {value.map((f, i) => (
//                                 <span
//                                   key={i}
//                                   className="bg-white text-amber-700 px-4 py-2 rounded-lg text-sm font-medium shadow-sm border border-amber-200"
//                                 >
//                                   {f}
//                                 </span>
//                               ))}
//                             </div>
//                           </div>
//                         );
//                       }
//                       return (
//                         <div key={key} className="flex">
//                           <span className="font-semibold capitalize text-gray-700 min-w-[120px]">
//                             {key}:
//                           </span>
//                           <span className="text-gray-600">{value}</span>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}

//               {/* Action Buttons */}
//               <div className="space-y-4">
//                 <button
//                   onClick={() => addToCart(product)}
//                   className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-all flex items-center justify-center gap-2"
//                 >
//                   <ShoppingCart className="w-6 h-6" />
//                   Add to Cart
//                 </button>

//                 <button
//                   onClick={() => toggleFavorite(product.id)}
//                   className="w-full border-2 border-amber-500 text-amber-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-amber-50 transition-all flex items-center justify-center gap-2"
//                 >
//                   <Heart
//                     className={`w-6 h-6 ${
//                       favorites.includes(product.id) ? "fill-amber-600" : ""
//                     }`}
//                   />
//                   {favorites.includes(product.id)
//                     ? "Remove from Favorites"
//                     : "Add to Favorites"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Star, Heart, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function ProductDetails({
  product,
  addToCart,
  toggleFavorite,
  favorites = [],
  goBack,
  cart = [],
  related = [], // optional related products
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || "");
  const [quantity, setQuantity] = useState(1);
  const isFav = favorites.includes(product?.id);

  const total = useMemo(() => (product?.price || 0) * quantity, [product, quantity]);

  const images = product?.images?.length ? product.images : ["/placeholder.png"];

  const inc = () => setQuantity((q) => Math.min(q + 1, 99));
  const dec = () => setQuantity((q) => Math.max(1, q - 1));

  const goPrev = () => setActiveIndex((i) => (i - 1 + images.length) % images.length);
  const goNext = () => setActiveIndex((i) => (i + 1) % images.length);

  const [tab, setTab] = useState("description");

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 "    style={{backgroundImage: 'url(/images/productsback.png)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'
    }} >
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-lg shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <button
              onClick={goBack}
              className="flex items-center space-x-2 text-gray-700 hover:text-amber-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 " />
              <span className="font-medium text-[#1daa61]">Back to Shop</span>
            </button>

            <div className="flex items-center space-x-4">
              <button className="relative p-2 hover:bg-amber-100 rounded-lg transition-colors">
                <ShoppingCart className="w-5 h-5 text-gray-700" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {cart.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Product Detail Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="backdrop-blur-lg rounded-3xl  overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8">
            {/* Left: Gallery + Thumbs */}
            <div>
              <div className="relative rounded-2xl overflow-hidden bg-amber-100 p-6">
                <AnimatePresence initial={false} mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.35 }}
                    className="w-full h-96 flex items-center justify-center"
                  >
                    <Image
                      src={images[activeIndex]}
                      alt={`${product?.name} ${activeIndex + 1}`}
                      width={600}
                      height={600}
                      className="object-contain max-h-[360px]"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Arrows */}
                <button
                  onClick={goPrev}
                  aria-label="previous"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:scale-105"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={goNext}
                  aria-label="next"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:scale-105"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Thumbnail strip */}
                <div className="mt-4 flex items-center gap-3 overflow-x-auto pb-2">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      className={`rounded-lg overflow-hidden border-2 ${
                        i === activeIndex ? "border-amber-400" : "border-transparent"
                      }`}>
                      <Image src={img} alt={`thumb-${i}`} width={80} height={80} className="object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Badge */}
              {product?.badge && (
                <div className="mt-4">
                  <span className="inline-block bg-gradient-to-r from-amber-500 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    {product.badge}
                  </span>
                </div>
              )}
            </div>

            {/* Right: Info + Actions */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{product?.name}</h1>

              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product?.rating || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <div className="text-sm text-gray-600">{product?.rating} ({product?.reviews} reviews)</div>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-4">
                  <div className="text-4xl font-bold text-amber-600">${product?.price}</div>
                  {product?.originalPrice && (
                    <div className="text-gray-400 line-through">${product.originalPrice}</div>
                  )}
                </div>
                {product?.inStock && <p className="text-green-600 font-medium mt-2">In Stock - Ready to Ship</p>}
              </div>

              <p className="text-gray-600 text-lg mb-6 leading-relaxed">{product?.shortDescription || product?.description}</p>

              {/* Color selection */}
              {product?.colors?.length > 0 && (
                <div className="mb-6">
                  <div className="font-medium text-gray-700 mb-2">Color</div>
                  <div className="flex items-center gap-3">
                    {product.colors.map((c) => (
                      <button
                        key={c}
                        onClick={() => setSelectedColor(c)}
                        className={`px-3 py-2 rounded-md border-2 font-medium transition ${selectedColor === c ? "border-amber-500 bg-amber-50" : "border-gray-200"}`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity + Total */}
              <div className="mb-6 flex items-center gap-6">
                <div className="flex items-center border rounded-lg overflow-hidden">
                  <button onClick={dec} className="px-4 py-2 text-lg">–</button>
                  <div className="px-6 py-2 font-semibold">{quantity}</div>
                  <button onClick={inc} className="px-4 py-2 text-lg">+</button>
                </div>

                <div className="text-lg">
                  <div className="text-sm text-gray-500">Total</div>
                  <div className="font-bold text-2xl text-amber-600">${total.toFixed(2)}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => addToCart({ ...product, selectedColor, quantity })}
                  className="w-full  bg-[#1daa61] text-whitepy-2 rounded-lg font-semibold 
                       hover:bg-[#189c57] hover:shadow-[0_8px_20px_rgba(29,170,97,0.3)] transform hover:scale-[1.03] 
                       transition-all text-sm flex items-center justify-center gap-2 text-white
                  px-6 py-3 rounded-xl font-bold text-lg hover:shadow-lg transform hover:scale-102 transition-all"
                >
                  <ShoppingCart className="w-5 h-5" /> Add to Cart
                </button>

                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="w-full border-2 border-amber-500 text-amber-600 px-6 py-3 rounded-xl font-bold text-lg hover:bg-amber-50 transition-all flex items-center justify-center gap-3"
                >
                  <Heart className={`w-5 h-5 ${isFav ? "fill-amber-600" : ""}`} />
                  {isFav ? "Remove from Favorites" : "Add to Favorites"}
                </button>

                <div className="flex items-center justify-between text-sm text-gray-600 mt-2">
                  <div>Free Shipping</div>
                  <div>Easy Returns</div>
                  <div>1 Year Warranty</div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs: Description / Specifications / Reviews */}
          <div className="border-t">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex items-center gap-6 border-b pb-4">
                <button onClick={() => setTab("description")} className={`pb-2 ${tab === "description" ? "border-b-2 border-amber-500 font-semibold text-amber-600" : "text-gray-600"}`}>Description</button>
                <button onClick={() => setTab("specs")} className={`pb-2 ${tab === "specs" ? "border-b-2 border-amber-500 font-semibold text-amber-600" : "text-gray-600"}`}>Specifications</button>
                <button onClick={() => setTab("reviews")} className={`pb-2 ${tab === "reviews" ? "border-b-2 border-amber-500 font-semibold text-amber-600" : "text-gray-600"}`}>Reviews</button>
              </div>

              <div className="py-6">
                <AnimatePresence exitBeforeEnter>
                  {tab === "description" && (
                    <motion.div key="desc" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                      <div className="grid md:grid-cols-2 gap-6 items-start">
                        <div>
                          <div className="rounded-lg overflow-hidden h-44 mb-4">
                            <Image src={images[0]} alt="product hero" width={1200} height={300} className="object-cover w-full h-full" />
                          </div>
                          <h3 className="font-bold text-lg mb-2">Product Description</h3>
                          <p className="text-gray-600">{product?.description || "Premium product with elegant design and high-quality materials."}</p>

                          <ul className="mt-4 space-y-2 text-gray-700">
                            {(product?.keyFeatures || product?.specs?.features || []).map((f, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="mt-1 text-amber-500">•</span>
                                <span>{f}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-bold mb-2">You Might Also Like</h4>
                          <div className="flex gap-4 overflow-x-auto py-2">
                            {(related?.length ? related : new Array(4).fill(product)).map((r, i) => (
                              <div key={i} className="min-w-[180px] bg-white rounded-lg shadow p-3 border">
                                <div className="h-28 mb-3 rounded overflow-hidden flex items-center justify-center">
                                  <Image src={r.images?.[0] || images[0]} alt={r.name || "related"} width={160} height={160} className="object-contain" />
                                </div>
                                <div className="text-sm font-medium">{r.name || product.name}</div>
                                <div className="text-amber-600 font-bold mt-1">${r.price || product.price}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {tab === "specs" && (
                    <motion.div key="specs" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-bold mb-3">Specifications</h4>
                          <div className="space-y-3 text-gray-700">
                            {product?.specs ? (
                              Object.entries(product.specs).map(([k, v]) => (
                                <div key={k} className="flex">
                                  <div className="min-w-[140px] font-semibold capitalize">{k.replace(/_/g, " ")}:</div>
                                  <div>{Array.isArray(v) ? v.join(", ") : v}</div>
                                </div>
                              ))
                            ) : (
                              <div className="text-gray-500">No specifications available.</div>
                            )}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-bold mb-3">Shipping & Returns</h4>
                          <div className="text-gray-600">
                            <p>Shipping: {product?.shipping || "₹99"}</p>
                            <p>Warranty: {product?.warranty || "1 year"}</p>
                            <p>Returnable: {product?.returnable === false ? "No" : "Within 30 days"}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {tab === "reviews" && (
                    <motion.div key="reviews" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                      <div className="space-y-4">
                        {(product?.reviewsList || []).length === 0 && (
                          <div className="text-gray-500">No reviews yet. Be the first to review this product.</div>
                        )}

                        {(product?.reviewsList || []).map((rv, i) => (
                          <div key={i} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">{(rv.name || "U").charAt(0)}</div>
                                <div>
                                  <div className="font-semibold">{rv.name}</div>
                                  <div className="text-xs text-gray-500">{rv.date}</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, s) => (
                                  <Star key={s} className={`w-4 h-4 ${s < rv.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                                ))}
                              </div>
                            </div>
                            <div className="text-gray-700">{rv.comment}</div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
