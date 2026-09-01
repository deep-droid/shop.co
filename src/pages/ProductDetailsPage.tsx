import { Link, useParams } from "react-router-dom";
import ProductGallery from "../components/product/ProductGallery";
import ProductInfo from "../components/product/ProductInfo";
import ProductTabs from "../components/product/ProductTabs";
// import Reviews from "../components/product/Reviews";
import RelatedProducts from "../components/product/RelatedProducts";
import { products } from "../data/products";

function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return (
      <main className="container-shop py-20 text-center font-satoshi">
        <h1 className="mb-4 text-2xl font-bold text-black">Product not found</h1>
        <Link to="/products" className="text-sm font-medium text-black/60 underline hover:text-black">
          Back to shop
        </Link>
      </main>
    );
  }

  const relatedProducts = products.filter(
    (item) => item.category === product.category && item.id !== product.id
  );

  return (
    <div className="min-h-screen bg-white pb-16 lg:pb-24">

      {/* 1. Breadcrumbs Row (Matching mobile & desktop alignments) */}
      <nav aria-label="Breadcrumb" className="border-t border-black/10">
        <div className="container-shop md:pt-6 md:pb-9 py-5">
          <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap font-satoshi text-sm text-black/60 no-scrollbar sm:gap-2">
            <Link to="/" className="transition hover:text-black">Home</Link>
            <span className="text-black/40 text-xs">›</span>

            <Link to="/products" className="transition hover:text-black">Shop</Link>
            <span className="text-black/40 text-xs">›</span>

            <span className="capitalize">{product.gender}</span>
            <span className="text-black/40 text-xs">›</span>

            <span className="capitalize">{product.category}</span>
            <span className="text-black/40 text-xs">›</span>

            <span className="font-medium text-black truncate max-w-[140px] sm:max-w-none">
              {product.name}
            </span>
          </div>
        </div>
      </nav>

      {/* 2. Main Showroom Section (Side-by-Side Gallery & Info Grid) */}
      <main className="container-shop ">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-[40px] items-start pb-12 lg:pb-16">
          <ProductGallery
            images={product.images}
            productName={product.name}
          />

          <ProductInfo product={product} />
        </div>
      </main>

      {/* 3. Review Tab Content Cluster (Directly mirroring figma flow layout) */}
      <section className="container-shop mt-4 lg:mt-8">
        {/* The Tabs line bar */}
        <ProductTabs product={product} />

        {/* The active review panel component sits tightly integrated right below */}
        {/* <div className="mt-6 lg:mt-8">
          <Reviews product={product} />
        </div> */}
      </section>

      {/* 4. Recommendation Footprint Block */}
      <section className="container-shop pt-8 ">
        <RelatedProducts products={relatedProducts} />
      </section>

    </div>
  );
}

export default ProductDetailsPage;
