
import { useNavigate } from "react-router-dom";
import StarRating from "../common/StarRating";
import type { Product } from "../../data/products";

interface ProductCardProps {
  product: Product;
}

function ProductCard({
  product
}: ProductCardProps) {

  const navigate = useNavigate();

  return (
    <article
      onClick={() => navigate(`/product/${product.id}`)}
      className="group cursor-pointer min-w-0">

      {/* Product Image Container */}
      <div className="aspect-square overflow-hidden rounded-[13px] bg-[#F0EEED] md:rounded-[20px]">
        {product.images ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center font-satoshi text-xs text-black/40">
            No Image Provided
          </div>
        )}
      </div>

      {/* Information Header Block */}
      <h3 className="mt-3 truncate font-satoshi text-base font-bold text-black lg:mt-4 lg:text-xl">
        {product.name}
      </h3>

      {/* Rating Row Block */}
      <div className="mt-1 flex items-center gap-1.5 lg:mt-2">
        <div className="flex items-center gap-0.5 text-xs lg:text-sm">
          <StarRating rating={product.rating} size={16} />
        </div>
        <span className="font-satoshi text-xs text-black/60 lg:text-sm">
          {product.rating}/<span className="text-black/30">5</span>
        </span>
      </div>

      {/* Financial Matrix Pricing Block */}
      <div className="mt-1.5 flex flex-wrap items-center gap-2.5 lg:mt-2">
        <span className="font-satoshi text-xl font-bold text-black lg:text-2xl">
          ${product.price}
        </span>

        {product.oldPrice && (
          <span className="font-satoshi text-xl font-bold text-black/30 line-through lg:text-2xl">
            ${product.oldPrice}
          </span>
        )}

        {product.discount && (
          <span className="rounded-full bg-[#FF3333]/10 px-2.5 py-1 font-satoshi text-xs font-medium text-[#FF3333] lg:text-sm">
            -{product.discount}%
          </span>
        )}
      </div>

    </article>
  );
}

export default ProductCard;
