import { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import { FaRegStar, FaCheck } from "react-icons/fa6";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import type { Product } from "../../data/products";
import { useAppDispatch } from "../../app/hooks";
import { addToCart } from "../../features/cart/cartSlice";

interface ProductInfoProps {
  product: Product;
}

function ProductInfo({ product }: ProductInfoProps) {
  const dispatch = useAppDispatch();

  const [selectedColor, setSelectedColor] = useState(
    product.colors[0]?.value ?? ""
  );

  const [selectedSize, setSelectedSize] = useState(
    product.sizes[0] ?? ""
  );

  const [quantity, setQuantity] = useState(1);

  const renderStars = (ratingNum: number) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      if (ratingNum >= i) {
        stars.push(
          <FaStar
            key={i}
            className="h-[14px] w-[14px] text-[#FFC633]"
          />
        );
      } else if (ratingNum >= i - 0.5) {
        stars.push(
          <FaStarHalfAlt
            key={i}
            className="h-[14px] w-[14px] text-[#FFC633]"
          />
        );
      } else {
        stars.push(
          <FaRegStar
            key={i}
            className="h-[14px] w-[14px] text-black/15"
          />
        );
      }
    }

    return stars;
  };

  const isLightColor = (hexcolor: string) => {
    const color = hexcolor.replace("#", "");

    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);

    const yiq = (r * 299 + g * 587 + b * 114) / 1000;

    return yiq >= 220;
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        product,
        selectedColor,
        selectedSize,
        quantity,
      })
    );
  };

  return (
    <div className="w-full font-satoshi">

      {/* Product Title */}
      <h1 className="max-w-[330px] text-[26px] font-black leading-[1.05] text-black sm:text-3xl lg:max-w-[600px] lg:text-[40px]">
        {product.name}
      </h1>

      {/* Rating */}
      <div className="mt-2 flex items-center gap-2">
        <div className="flex items-center gap-[1px]">
          {renderStars(product.rating)}
        </div>

        <span className="text-[11px] text-black/60 sm:text-sm">
          {product.rating}/5
        </span>

        {product.reviewCount && (
          <span className="hidden text-sm text-black/50 sm:inline">
            ({product.reviewCount} Reviews)
          </span>
        )}
      </div>

      {/* Price */}
      <div className="mt-2 flex items-center gap-2.5">
        <span className="text-[22px] font-bold leading-none text-black sm:text-3xl">
          ${product.price}
        </span>

        {product.oldPrice && (
          <span className="text-[20px] font-bold leading-none text-black/25 line-through sm:text-3xl">
            ${product.oldPrice}
          </span>
        )}

        {product.discount && (
          <span className="rounded-full bg-[#FF3333]/10 px-2.5 py-1 text-[10px] font-medium text-[#FF3333] sm:px-3 sm:py-1.5 sm:text-sm">
            -{product.discount}%
          </span>
        )}
      </div>

      {/* Description */}
      <p className="mt-3 max-w-[590px] text-[11px] leading-[1.5] text-black/55 sm:text-sm lg:text-base">
        {product.description}
      </p>

      {/* Divider */}
      <div className="my-3.5 border-t border-black/10 sm:my-6" />

      {/* Colors */}
      <div>
        <h3 className="text-[11px] text-black/55 sm:text-sm">
          Select Colors
        </h3>

        <div className="mt-2.5 flex items-center gap-2.5 sm:mt-3 sm:gap-3">
          {product.colors.map((color) => {
            const active = selectedColor === color.value;
            const isLight = isLightColor(color.value);

            return (
              <button
                key={color.name}
                type="button"
                onClick={() => setSelectedColor(color.value)}
                aria-label={`Select color ${color.name}`}
                aria-pressed={active}
                className={`flex h-[30px] w-[30px] items-center justify-center rounded-full transition-all duration-200 sm:h-9 sm:w-9 ${isLight ? "border border-black/10" : ""
                  } ${active
                    ? "ring-1 ring-black ring-offset-1"
                    : ""
                  }`}
                style={{ backgroundColor: color.value }}
              >
                {active && (
                  <FaCheck
                    size={11}
                    className={
                      isLight ? "text-black" : "text-white"
                    }
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Divider */}
      <div className="my-3.5 border-t border-black/10 sm:my-6" />

      {/* Sizes */}
      <div>
        <h3 className="text-[11px] text-black/55 sm:text-sm">
          Choose Size
        </h3>

        <div className="mt-2.5 flex flex-wrap gap-1.5 sm:mt-3 sm:gap-2.5">
          {product.sizes.map((size) => {
            const active = selectedSize === size;

            return (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                aria-pressed={active}
                className={`rounded-full px-4 py-2 text-[10px] transition-all duration-200 sm:px-5 sm:py-2.5 sm:text-sm ${active
                  ? "bg-black font-medium text-white"
                  : "bg-[#F0F0F0] text-black/55 hover:bg-[#E7E7E7]"
                  }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Divider */}
      <div className="my-3.5 border-t border-black/10 sm:my-6" />

      {/* Quantity + Add To Cart */}
      <div className="flex w-full items-center gap-3">

        {/* Quantity */}
        <div className="flex h-[35px] w-[84px] shrink-0 items-center justify-between rounded-full bg-[#F0F0F0] px-3 sm:h-[48px] sm:w-[130px] sm:px-5">
          <button
            type="button"
            onClick={() =>
              setQuantity((current) =>
                Math.max(1, current - 1)
              )
            }
            aria-label="Decrease quantity"
            className="flex items-center justify-center text-black transition hover:text-black/50 active:scale-90"
          >
            <FiMinus
              size={14}
              strokeWidth={2.5}
            />
          </button>

          <span className="text-[11px] font-medium text-black sm:text-sm">
            {quantity}
          </span>

          <button
            type="button"
            onClick={() =>
              setQuantity((current) => current + 1)
            }
            aria-label="Increase quantity"
            className="flex items-center justify-center text-black transition hover:text-black/50 active:scale-90"
          >
            <FiPlus
              size={14}
              strokeWidth={2.5}
            />
          </button>
        </div>

        {/* Add To Cart */}
        <button
          type="button"
          onClick={handleAddToCart}
          className="flex h-[35px] min-w-0 flex-1 items-center justify-center rounded-full bg-black px-4 text-[10px] font-medium text-white transition-all duration-200 hover:bg-black/85 active:scale-[0.99] sm:h-[48px] sm:text-sm"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductInfo;