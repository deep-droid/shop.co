import { useEffect, useRef, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { FaSliders, FaChevronDown } from "react-icons/fa6";

interface ProductListingHeaderProps {
  categoryName: string;
  totalProducts: number;
  shownStart: number;
  shownEnd: number;
  sortBy: string;
  setSortBy: (value: string) => void;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setFiltersOpen: Dispatch<SetStateAction<boolean>>;
}

const sortOptions = [
  {
    value: "popular",
    label: "Most Popular",
  },
  {
    value: "rating",
    label: "Rating",
  },
  {
    value: "price-low",
    label: "Price: Low to High",
  },
  {
    value: "price-high",
    label: "Price: High to Low",
  },
];

export function ProductListingHeader({
  categoryName,
  totalProducts,
  shownStart,
  shownEnd,
  sortBy,
  setSortBy,
  setCurrentPage,
  setFiltersOpen,
}: ProductListingHeaderProps) {
  const [sortOpen, setSortOpen] = useState(false);

  const sortRef = useRef<HTMLDivElement>(null);

  const selectedSort =
    sortOptions.find((option) => option.value === sortBy) ??
    sortOptions[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sortRef.current &&
        !sortRef.current.contains(event.target as Node)
      ) {
        setSortOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setCurrentPage(1);
    setSortOpen(false);
  };

  return (
    <div className="mb-6 flex gap-4 flex-row items-center justify-between">
      {/* Title */}
      <div className="flex   items-baseline ">
        <h1 className="heading-shop text-2xl font-black uppercase sm:text-3xl md:text-[32px]">
          {categoryName}
        </h1>
      </div>

      {/* Sorting Controls & Mobile Triggers */}
      <div className="flex  items-start gap-3 flex-row sm:items-center sm:justify-end">
        {/* Count + Sort */}
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
          {/* Product Count */}
          <span className="font-satoshi text-xs text-black/50">
            Showing {shownStart}-{shownEnd} of {totalProducts} Products
          </span>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-black/50">Sort by:</span>

            <div ref={sortRef} className="relative">
              {/* Selected Sort */}
              <button
                type="button"
                onClick={() => setSortOpen((prev) => !prev)}
                className="flex cursor-pointer items-center gap-2 text-xs font-medium text-black sm:text-sm"
                aria-haspopup="listbox"
                aria-expanded={sortOpen}
              >
                <span>{selectedSort.label}</span>

                <FaChevronDown
                  className={`text-[9px] transition-transform duration-200 ${sortOpen ? "rotate-180" : ""
                    }`}
                />
              </button>

              {/* Dropdown */}
              {sortOpen && (
                <div
                  className="absolute left-0 top-full z-50 mt-2 min-w-[155px] overflow-hidden rounded-lg border border-black/10 bg-white py-1 shadow-lg"
                  role="listbox"
                >
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleSortChange(option.value)}
                      className={`block w-full px-3 py-2 text-left text-xs transition-colors sm:text-sm ${sortBy === option.value
                        ? "bg-black text-white"
                        : "text-black hover:bg-black/5"
                        }`}
                      role="option"
                      aria-selected={sortBy === option.value}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Filter Button */}
        <button
          type="button"
          onClick={() => setFiltersOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F0F0F0] text-black transition hover:bg-black/5 active:scale-95 lg:hidden"
          aria-label="Open filter sorting drawer"
        >
          <FaSliders size={14} />
        </button>
      </div>
    </div>
  );
}