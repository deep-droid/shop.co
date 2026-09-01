import Carousel from "../common/Carousel";
import ProductCard from "../product/ProductCard";
import products from "../../data/products.json";
import type { Product } from "../../data/products";

interface ProductSectionProps {
  title: string;
}

function ProductSection({ title }: ProductSectionProps) {
  const typedProducts = products as Product[];
  return (
    <section className="border-b border-black/10 py-4">
      <Carousel
        title={title}
        data={typedProducts.slice(0, 8)}
        showArrows={true}
        arrowPosition="sides"
        renderItem={(product: Product) => (
          <div className="w-[200px] md:w-[290px]">
            <ProductCard key={product.id} product={product} />
          </div>
        )}
      />

      {/* View All Operational Footer Button */}
      <div className="container-shop px-4 pb-10 flex justify-center sm:px-6 md:px-8 md:pb-16">
        <button
          type="button"
          className="w-full rounded-full border border-black/10 px-14 py-4 font-satoshi text-base font-medium text-black transition hover:bg-black hover:text-white sm:w-auto"
        >
          View All
        </button>
      </div>
    </section>
  );
}

export default ProductSection;  