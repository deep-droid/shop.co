import ProductCard from "../product/ProductCard";
import type { Product } from "../../data/products";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex min-h-[300px] items-center justify-center rounded-[20px] bg-[#F0EEED]">
        <p className="font-satoshi text-black/50">No products found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 md:gap-x-5 md:gap-y-10">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}