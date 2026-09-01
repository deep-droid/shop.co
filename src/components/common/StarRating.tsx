import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

interface StarRatingProps {
  rating: number;
  size?: number;
  className?: string;
}

function StarRating({
  rating,
  size = 16,
  className = "",
}: StarRatingProps) {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(
        <FaStar
          key={i}
          size={size}
          className={`text-[#FFC633] ${className}`}
        />
      );
    } else if (rating >= i - 0.5) {
      stars.push(
        <FaStarHalfAlt
          key={i}
          size={size}
          className={`text-[#FFC633] ${className}`}
        />
      );
    } else {
      stars.push(
        <FaRegStar
          key={i}
          size={size}
          className={`text-black/10 ${className}`}
        />
      );
    }
  }

  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`${rating} out of 5 stars`}
    >
      {stars}
    </div>
  );
}

export default StarRating;