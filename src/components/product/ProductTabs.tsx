import { useState } from "react";
import type { Product } from "../../data/products";

// Ensure you import your existing Reviews block component to mount it inside the Tab Window space
import Reviews from "./Reviews";

interface ProductTabsProps {
  product: Product;
}

const tabs = [
  "Product Details",
  "Rating & Reviews",
  "FAQs",
];

function ProductTabs({ product }: ProductTabsProps) {
  // Set default view tab index directly onto Rating & Reviews to align with standard landing parameters
  const [activeTab, setActiveTab] = useState("Rating & Reviews");

  return (
    <div className="w-full">

      {/* 1. Global Navigation Tab Action Headers Container */}
      <div className="grid grid-cols-3 border-b border-black/10 text-center">
        {tabs.map((tab) => {
          const isSelected = activeTab === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`relative pb-4 pt-2 font-satoshi text-sm transition-all duration-200 outline-none sm:text-base md:pb-6 lg:text-xl ${isSelected
                ? "font-medium text-black"
                : "font-regular text-black/40 hover:text-black/70"
                }`}
            >
              {tab}

              {/* Bold Active Bottom Border Indicator */}
              {isSelected && (
                <span className="absolute bottom-0 left-0 h-[2px] w-full bg-black animate-fade-in" />
              )}
            </button>
          );
        })}
      </div>

      {/* 2. Context Window Panel View Switcher */}
      <div className="py-6 lg:py-8">

        {/* --- TAB A: PRODUCT STRUCTURAL PARAMETERS --- */}
        {activeTab === "Product Details" && (
          <div className="max-w-[800px] font-satoshi animate-fade-in">
            <h2 className="text-lg font-bold text-black lg:text-xl">
              Product Overview Specifications
            </h2>
            <p className="mt-3 text-sm leading-[1.6] text-black/60 lg:text-base">
              {product.description}
            </p>

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <h3 className="text-base font-bold text-black">Features</h3>
                <ul className="mt-2 list-disc pl-5 space-y-1.5 text-sm text-black/60">
                  <li>Premium structural matrix fabrics</li>
                  <li>Comfortable optimized custom cut profiles</li>
                  <li>Deep saturated double dye washes</li>
                  <li>Easy washing and quick-dry mechanics</li>
                </ul>
              </div>
              <div>
                <h3 className="text-base font-bold text-black">Material & Care</h3>
                <p className="mt-2 text-sm leading-[1.6] text-black/60">
                  100% Ring-spun premium cotton fabrics. Machine wash cold with similar structural colors. Tumble dry on standard low settings.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* --- TAB B: FULL REVIEW DASHBOARD GRID (FIGMA COMPLIANT) --- */}
        {activeTab === "Rating & Reviews" && (
          <div className="animate-fade-in">
            <Reviews product={product} />
          </div>
        )}

        {/* --- TAB C: CUSTOMER SUPPORT FAQ EXPANSION TILES --- */}
        {activeTab === "FAQs" && (
          <div className="max-w-[700px] font-satoshi space-y-6 animate-fade-in">
            <div>
              <h3 className="text-base font-bold text-black lg:text-lg">
                What are the measurement rules like for this piece?
              </h3>
              <p className="mt-1.5 text-sm leading-[1.6] text-black/60">
                This item adheres perfectly to standard western structural charts. We suggest picking your typical measurement for a relaxed aesthetic profile.
              </p>
            </div>
            <div>
              <h3 className="text-base font-bold text-black lg:text-lg">
                How should I handle wash-cycles over time?
              </h3>
              <p className="mt-1.5 text-sm leading-[1.6] text-black/60">
                Turn the items completely inside out prior to spinning. Utilize moderate liquid detergents while skipping heavy abrasive fabric softeners.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default ProductTabs;
