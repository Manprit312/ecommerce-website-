
import ProductCard from "./ProductCard";
import NetworkBackground from "../background";
export default function ProductsGrid({ products, ...handlers }) {
  return (
    <section
      className="relative w-full py-16 overflow-hidden"
     
    >
      <NetworkBackground/>
      {/* Optional: 3D background effect */}
      {/* <ProductsBackground /> */}

      {/* Overlay for subtle visual depth */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px] pointer-events-none"></div>

      {/* Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-3">
            Our Products
          </h2>
          <p className="text-gray-600 text-lg">
            Handpicked collection of our best-selling LED decor
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} {...handlers} />
          ))}
        </div>
      </div>
    </section>
  );
}
