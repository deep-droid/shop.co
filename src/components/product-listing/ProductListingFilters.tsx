import { Link } from "react-router-dom";
import { FaSliders, FaXmark, FaCheck } from "react-icons/fa6";
import { FilterSection } from "./FilterSection";

const MIN_PRICE = 50;
const MAX_PRICE = 500;

interface ProductListingFiltersProps {
  filtersOpen: boolean;
  setFiltersOpen: React.Dispatch<React.SetStateAction<boolean>>;

  // New: specifically for mobile drawer
  mobileFiltersOpen: boolean;
  setMobileFiltersOpen: React.Dispatch<React.SetStateAction<boolean>>;

  categories: string[];
  selectedColors: string[];
  selectedSizes: string[];
  selectedDressStyle: string;
  priceRange: { min: number; max: number };
  setPriceRange: React.Dispatch<
    React.SetStateAction<{ min: number; max: number }>
  >;
  toggleColor: (color: string) => void;
  toggleSize: (size: string) => void;
  setSelectedDressStyle: React.Dispatch<React.SetStateAction<string>>;
  onClear: () => void;
  onApply?: () => void;
}

export function ProductListingFilters({
  filtersOpen,
  setFiltersOpen,
  mobileFiltersOpen,
  setMobileFiltersOpen,
  categories,
  selectedColors,
  selectedSizes,
  selectedDressStyle,
  priceRange,
  setPriceRange,
  toggleColor,
  toggleSize,
  setSelectedDressStyle,
  onClear,
  onApply,
}: ProductListingFiltersProps) {
  const colors = [
    "#00C12B", "#F50606", "#F5DD00", "#F57900", "#00C2EE",
    "#2F45FF", "#7D00FF", "#F000A8", "#FFFFFF", "#000000",
  ];

  const sizes = [
    "XX-Small", "X-Small", "Small", "Medium", "Large",
    "X-Large", "XX-Large", "3X-Large", "4X-Large",
  ];

  const dressStyles = ["Casual", "Formal", "Party", "Gym"];

  // Calculate percentage fill for input track visuals
  const leftPercent = ((priceRange.min - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100;
  const rightPercent = 100 - ((priceRange.max - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100;

  const handleMinSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.min(Number(e.target.value), priceRange.max - 10);
    setPriceRange((prev) => ({ ...prev, min: val }));
  };

  const handleMaxSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.max(Number(e.target.value), priceRange.min + 10);
    setPriceRange((prev) => ({ ...prev, max: val }));
  };

  const innerContent = (
    <div className="flex flex-col ">
      {/* Categories */}
      <div className="border-b border-black/10 pb-5">
        <FilterSection title="Categories">
          <div className="mt-4 flex flex-col gap-3">
            {categories.map((item) => (
              <Link
                key={item}
                to={`/category/${item.toLowerCase()}`}
                className="flex items-center justify-between text-base font-normal text-black/60 transition hover:text-black"
              >
                <span>{item}</span>
                <span className="text-xl text-black/40">›</span>
              </Link>
            ))}
          </div>
        </FilterSection>
      </div>

      {/* Price with Dual Range Controls */}
      <div className="border-b border-black/10 pb-5">
        {/* Price Section */}
        <FilterSection title="Price">
          <div className="mt-4 px-2 pb-2">
            {/* Track Graphic container */}
            <div className="relative h-1 w-full rounded-full bg-[#F0F0F0]">
              {/* Active black track highlight line */}
              <div
                className="absolute h-1 rounded-full bg-black"
                style={{ left: `${leftPercent}%`, right: `${rightPercent}%` }}
              />
            </div>

            {/* Stacked Native Range Input Sliders */}
            <div className="relative pointer-events-none h-0 w-full z-10">
              <input
                type="range"
                min={MIN_PRICE}
                max={MAX_PRICE}
                value={priceRange.min}
                onChange={handleMinSlider}
                className="absolute pointer-events-auto top-[-5px] left-0 w-full appearance-none bg-transparent cursor-pointer"
                style={{ transform: 'translateY(-25%)' }}
              />
              <input
                type="range"
                min={MIN_PRICE}
                max={MAX_PRICE}
                value={priceRange.max}
                onChange={handleMaxSlider}
                className="absolute pointer-events-auto top-[-5px] left-0 w-full appearance-none bg-transparent cursor-pointer"
                style={{ transform: 'translateY(-25%)' }}
              />
            </div>

            {/* Dynamic Value Displays positioned perfectly below the thumbs */}
            <div className="relative mt-5 h-5 text-sm font-medium font-satoshi text-black">
              <span
                className="absolute -translate-x-1/2 whitespace-nowrap"
                style={{ left: `${leftPercent}%` }}
              >
                ${priceRange.min}
              </span>
              <span
                className="absolute -translate-x-1/2 whitespace-nowrap"
                style={{ left: `${100 - rightPercent}%` }}
              >
                ${priceRange.max}
              </span>
            </div>
          </div>
        </FilterSection>

      </div>

      {/* Colors Section */}
      <div className="border-b border-black/10 pb-5">
        <FilterSection title="Colors">
          <div className="mt-4 grid grid-cols-5 gap-3">
            {colors.map((color) => {
              const active = selectedColors.includes(color);
              const isWhite = color === "#FFFFFF";
              return (
                <button
                  key={color}
                  type="button"
                  onClick={() => toggleColor(color)}
                  className={`relative flex h-9 w-9 items-center justify-center rounded-full border transition active:scale-95 ${isWhite ? "border-black/10 shadow-sm" : "border-transparent"
                    }`}
                  style={{ backgroundColor: color }}
                  aria-label={`Select color ${color}`}
                >
                  {active && (
                    <FaCheck
                      size={12}
                      className={isWhite ? "text-black" : "text-white"}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </FilterSection>
      </div>

      {/* Size Section */}
      <div className="border-b border-black/10 pb-5">
        <FilterSection title="Size">
          <div className="mt-4 flex flex-wrap gap-2.5">
            {sizes.map((size) => {
              const active = selectedSizes.includes(size);
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => toggleSize(size)}
                  className={`rounded-full px-5 py-2.5 text-sm font-medium transition active:scale-95 ${active
                    ? "bg-black text-white"
                    : "bg-[#F0F0F0] text-black/60 hover:bg-black/5"
                    }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </FilterSection>
      </div>

      {/* Dress Style Section */}
      <div className="border-b border-black/10 pb-5">
        <FilterSection title="Dress Style">
          <div className="mt-4 flex flex-col gap-3">
            {dressStyles.map((style) => (
              <button
                key={style}
                type="button"
                onClick={() =>
                  setSelectedDressStyle(selectedDressStyle === style ? "" : style)
                }
                className={`flex w-full items-center justify-between text-base transition ${selectedDressStyle === style
                  ? "font-medium text-black"
                  : "text-black/60 hover:text-black"
                  }`}
              >
                <span>{style}</span>
                <span className="text-xl text-black/40">›</span>
              </button>
            ))}
          </div>
        </FilterSection>
      </div>

      {/* Primary Action Buttons */}
      <div className="mt-2 flex flex-col gap-2.5">
        <button
          type="button"
          onClick={onApply}
          className="h-12 w-full rounded-full bg-black text-sm font-medium text-white transition hover:bg-black/90 active:scale-[0.99]"
        >
          Apply Filter
        </button>
        <button
          type="button"
          onClick={onClear}
          className="text-center text-xs font-medium text-black/40 underline transition hover:text-black/80"
        >
          Clear All
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* 🖥️ Desktop Sidebar View (Always Visible on Large Screens) */}
      <aside className="hidden shrink-0 rounded-[20px] border border-black/10 bg-white px-6 py-5 md:block">
        <div className="flex items-center justify-between border-b border-black/10 pb-6">
          <h3 className="font-satoshi text-xl font-bold text-black">Filters</h3>
        </div>
        {innerContent}
      </aside>

      {/* 📱 Mobile Drawer Overlay (Triggered by mobileFiltersOpen) */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white p-5 md:hidden overflow-y-auto">
          <div className="mb-6 flex items-center justify-between border-b border-black/10 pb-4">
            <h2 className="font-satoshi text-xl font-bold text-black">Filters</h2>
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(false)}
              className="text-black"
              aria-label="Close filters"
            >
              <FaXmark size={22} />
            </button>
          </div>
          {innerContent}
        </div>
      )}
    </>
  );
}
