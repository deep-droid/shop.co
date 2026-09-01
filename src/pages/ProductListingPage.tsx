import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { products } from "../data/products";

import { ProductListingFilters } from "../components/product-listing/ProductListingFilters";
import { ProductListingHeader } from "../components/product-listing/ProductListingHeader";
import { ProductGrid } from "../components/product-listing/ProductGrid";
import { Pagination } from "../components/product-listing/Pagination";

const PRODUCTS_PER_PAGE = 9;

const MIN_PRICE = Math.min(...products.map((p) => p.price));
const MAX_PRICE = Math.max(...products.map((p) => p.price));

export default function ProductListingPage() {
  const { category } = useParams();

  const categoryName = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : "All Products";

  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("popular");

  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({
    min: MIN_PRICE,
    max: MAX_PRICE,
  });
  const [selectedDressStyle, setSelectedDressStyle] = useState("");

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const categories = useMemo(
    () =>
      Array.from(new Set(products.map((p) => p.category))).sort(),
    []
  );

  const handleClearFilters = () => {
    setSelectedColors([]);
    setSelectedSizes([]);
    setPriceRange({ min: MIN_PRICE, max: MAX_PRICE });
    setSelectedDressStyle("");
    setCurrentPage(1);
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Only filter by category if it's a real category (not "all", "on-sale", etc.)
    if (
      category &&
      category.toLowerCase() !== "all" &&
      category.toLowerCase() !== "on-sale" &&
      category.toLowerCase() !== "new-arrivals" &&
      category.toLowerCase() !== "brands"
    ) {
      result = result.filter(
        (product) =>
          product.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Price
    result = result.filter(
      (product) =>
        product.price >= priceRange.min &&
        product.price <= priceRange.max
    );

    // Colors
    if (selectedColors.length > 0) {
      result = result.filter((product) =>
        product.colors.some((color) => selectedColors.includes(color.value))
      );
    }

    // Sizes
    if (selectedSizes.length > 0) {
      result = result.filter((product) =>
        product.sizes.some((size) => selectedSizes.includes(size))
      );
    }

    // Dress style (optional extra filter)
    if (selectedDressStyle) {
      result = result.filter(
        (product) =>
          product.category.toLowerCase() === selectedDressStyle.toLowerCase()
      );
    }

    // Sorting
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [
    category,
    priceRange,
    selectedColors,
    selectedSizes,
    selectedDressStyle,
    sortBy,
  ]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const visibleProducts = filteredProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE
  );

  const shownStart = filteredProducts.length === 0 ? 0 : startIndex + 1;
  const shownEnd = Math.min(startIndex + PRODUCTS_PER_PAGE, filteredProducts.length);

  const toggleColor = (color: string) => {
    setCurrentPage(1);
    setSelectedColors((current) =>
      current.includes(color)
        ? current.filter((item) => item !== color)
        : [...current, color]
    );
  };

  const toggleSize = (size: string) => {
    setCurrentPage(1);
    setSelectedSizes((current) =>
      current.includes(size)
        ? current.filter((item) => item !== size)
        : [...current, size]
    );
  };

  return (
    <main className="container-shop px-4 py-6 sm:px-6 md:px-8 lg:py-8">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mb-5 flex items-center gap-2 font-satoshi text-sm text-black/50"
      >
        <Link to="/" className="transition hover:text-black">
          Home
        </Link>
        <span className="text-black/30">›</span>
        <span className="text-black">{categoryName}</span>
      </nav>

      {/* Mobile Heading
      <div className="flex items-center justify-between lg:hidden">
        <div className="flex items-center gap-3">
          <h1 className="heading-shop text-2xl font-black">{categoryName}</h1>
          <span className="font-satoshi text-xs text-black/50">
            Showing {shownStart}-{shownEnd} of {filteredProducts.length} Products
          </span>
        </div>

        <button
          type="button"
          onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F0F0F0]"
          aria-label="Open filters"
        >
          <FaSliders size={15} />
        </button>
      </div> */}

      {/* Desktop Layout */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[295px_minmax(0,1fr)] lg:gap-5">
        {/* Filter Sidebar */}
        <aside
          className={`${mobileFiltersOpen ? "block" : "hidden"} lg:block`}
        >
          <ProductListingFilters
            mobileFiltersOpen={mobileFiltersOpen}
            setMobileFiltersOpen={setMobileFiltersOpen}
            categories={categories}
            selectedColors={selectedColors}
            selectedSizes={selectedSizes}
            selectedDressStyle={selectedDressStyle}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            toggleColor={toggleColor}
            toggleSize={toggleSize}
            setSelectedDressStyle={setSelectedDressStyle}
            onClear={handleClearFilters}
          // onApply={handleApplyFilters}
          />
        </aside>

        {/* Products Section */}
        <section>
          <ProductListingHeader
            categoryName={categoryName}
            totalProducts={filteredProducts.length}
            shownStart={shownStart}
            shownEnd={shownEnd}
            sortBy={sortBy}
            setSortBy={setSortBy}
            setCurrentPage={setCurrentPage}
            setFiltersOpen={setMobileFiltersOpen}
          />

          {/* Mobile Sort */}
          {/* <div className="mb-5 flex items-center justify-end lg:hidden">
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setCurrentPage(1);
              }}
              className="rounded-full bg-[#F0F0F0] px-4 py-2 text-xs outline-none"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Rating</option>
              <option value="price-low">Price Low</option>
              <option value="price-high">Price High</option>
            </select>
          </div> */}

          <ProductGrid products={visibleProducts} />

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          )}
        </section>
      </div>
    </main>
  );
}