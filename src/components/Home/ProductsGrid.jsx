
import ProductCard from "./ProductCard";
import NetworkBackground from "../background";
export default function ProductsGrid({ products, ...handlers }) {
  return (
    <>
    <NetworkBackground/>
       <section
      className="relative w-full py-6 overflow-hidden"
     
    >
      
      {/* Optional: 3D background effect */}
      {/* <ProductsBackground /> */}

      {/* Overlay for subtle visual depth */}
      <div className="absolute inset-0   pointer-events-none"></div>

      {/* Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
       

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} {...handlers} allprod={products} />
          ))}
        </div>
      </div>
    </section></>
 
  );
}
