import { useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

interface CarouselProps<T> {
  title: string;
  data: T[];
  showArrows?: boolean;
  arrowPosition?: "header" | "sides"; // 👈 Control where arrows sit
  renderItem: (item: T) => React.ReactNode;
}

function Carousel<T>({
  title,
  data,
  showArrows = true,
  arrowPosition = "header",
  renderItem,
}: CarouselProps<T>) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  if (!data || data.length === 0) return null;

  // Simple scroll utility using the container's visible area
  const scrollByAmount = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Scroll by 80% of the visible container width for clean tracking
    const scrollAmount = container.clientWidth * 0.4;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className=" container-shop relative w-full py-6">
      {/* Header Layout */}
      <div className="flex flex-row items-center justify-between mb-6 lg:mb-10">
        <h2 className={`text-3xl font-black uppercase sm:text-4xl lg:text-[48px] ${!showArrows || arrowPosition === "sides" ? "w-full text-center " : ""
          }`}>
          {title}
        </h2>

        {/* Render arrows in header ONLY if requested */}
        {showArrows && arrowPosition === "header" && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollByAmount("left")}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-xl text-black transition duration-200 hover:bg-black hover:text-white active:scale-95"
              aria-label="Previous items"
            >
              <FaArrowLeft />
            </button>
            <button
              type="button"
              onClick={() => scrollByAmount("right")}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-xl text-black transition duration-200 hover:bg-black hover:text-white active:scale-95"
              aria-label="Next items"
            >
              <FaArrowRight />
            </button>
          </div>
        )}
      </div>

      {/* Main Container Wrapper for Side Arrows placement */}
      <div className="relative group">

        {/* Side Arrow: Left */}
        {showArrows && arrowPosition === "sides" && (
          <button
            type="button"
            onClick={() => scrollByAmount("left")}
            className="absolute left-0 top-1/2 z-10  -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white shadow-md text-xl text-black transition duration-200 hover:bg-black hover:text-white active:scale-95 flex h-12 w-12"
            aria-label="Previous items"
          >
            <FaArrowLeft />
          </button>
        )}

        {/* Scrollable Container (pure button control, no swipe) */}
        <div
          ref={scrollContainerRef}
          className="flex gap-5 overflow-x-hidden scroll-smooth snap-x snap-mandatory"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {data.map((item, index) => (
            <div key={index} className="shrink-0 snap-start">
              {renderItem(item)}
            </div>
          ))}
        </div>

        {/* Side Arrow: Right */}
        {showArrows && arrowPosition === "sides" && (
          <button
            type="button"
            onClick={() => scrollByAmount("right")}
            className="absolute right-0 top-1/2 z-10  -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white shadow-md text-xl text-black transition duration-200 hover:bg-black hover:text-white active:scale-95 flex h-12 w-12"
            aria-label="Next items"
          >
            <FaArrowRight />
          </button>
        )}
      </div>
    </section>
  );
}

export default Carousel;
