import ProductCard from "./ProductCard";
import type { Product } from "../../data/products";

interface RelatedProductsProps {
  products: Product[];
}

function RelatedProducts({ products }: RelatedProductsProps) {
  // Gracefully filter down the dataset limit to show a maximum of 4 matching elements if needed
  const visibleProducts = products.slice(0, 4);

  return (
    <div className="w-full">

      {/* 1. Cross-Sell Synchronized Global Heading */}
      <h2 className="text-center text-3xl font-black uppercase  sm:text-4xl lg:text-[48px]">
        You Might Also Like
      </h2>

      {/* 2. Structured Product Feed Matrix Mapping */}
      {/* Handled with responsive grid definitions matching standard landing pages */}
      <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-x-5 lg:mt-14 lg:gap-x-7">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

    </div>
  );
}

export default RelatedProducts;
