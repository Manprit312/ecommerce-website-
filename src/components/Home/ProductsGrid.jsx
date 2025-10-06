import ProductsBackground from "../ProductsBack";
import ProductCard from "./ProductCard";
export default function ProductsGrid({ products, ...handlers }) {
  return (

    <section className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-16"   >
        <ProductsBackground/>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Products</h2>
        <p className="text-gray-870 text-lg">Handpicked collection of our best-selling LED decor</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} {...handlers} />
        ))}
      </div>
    </section>
  );
}
