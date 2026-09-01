import Hero from "../components/home/Hero";
import BrandStrip from "../components/home/BrandStrip";
import ProductSection from "../components/home/ProductSection";
import DressStyleSection from "../components/home/DressStyleSection";
import CustomerReviews from "../components/home/CustomerReviews";

function HomePage() {
  return (
    <>
      <Hero />

      <BrandStrip />

      <ProductSection title="New Arrivals" />

      <div className="container-shop border-t border-gray-200" />

      <ProductSection title="Top Selling" />

      <DressStyleSection />

      <CustomerReviews />
    </>
  );
}

export default HomePage;