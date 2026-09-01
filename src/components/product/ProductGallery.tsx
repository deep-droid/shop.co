import { useEffect, useState } from "react";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Reset indices smoothly when transitioning between custom detail screens
  useEffect(() => {
    setSelectedIndex(0);
  }, [images]);

  if (!images || images.length === 0) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-[20px] bg-[#F0EEED] font-satoshi text-sm text-black/40">
        No images available
      </div>
    );
  }

  return (
    <div className="flex flex-col-reverse gap-3.5 lg:flex-row lg:gap-3.5">

      {/* 1. Dynamic Thumbnail Row & Column Wrapper */}
      {/* Stacks horizontally beneath the main frame on mobile, transforms to a vertical column on desktop */}
      <div className="flex flex-row gap-3.5 overflow-x-auto no-scrollbar lg:w-[152px] lg:flex-col lg:overflow-x-visible">
        {images.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            onClick={() => setSelectedIndex(index)}
            aria-label={`View ${productName} image ${index + 1}`}
            className={`aspect-[111/106] w-[111px] shrink-0 overflow-hidden rounded-[13px] bg-[#F0EEED] transition duration-200 outline-none md:rounded-[20px] lg:w-full lg:aspect-[152px] ${selectedIndex === index
              ? "ring-1 ring-black"
              : "hover:ring-1 hover:ring-black/40"
              }`}
          >
            <img
              src={image}
              alt={`${productName} thumbnail ${index + 1}`}
              className="h-full w-full object-cover object-top"
            />
          </button>
        ))}
      </div>

      {/* 2. Main Selected Image Viewer */}
      {/* Follows exact mobile proportions before updating to deep vertical desktop structures */}
      <div className="relative aspect-[358/290] flex-1 overflow-hidden rounded-[20px] bg-[#F0EEED] sm:aspect-video lg:aspect-[444/530]">
        <img
          src={images[selectedIndex]}
          alt={productName}
          className="h-full w-full object-cover object-top transition-all duration-300 ease-in-out"
        />
      </div>

    </div>
  );
}

export default ProductGallery;
