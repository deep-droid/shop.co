import Carousel from "../common/Carousel";
import StarRating from "../common/StarRating";
import { FaCheck } from "react-icons/fa6";
import type { Review } from "../../data/review";
import reviewsData from "../../data/reviews.json";

function CustomerReviews() {
  const topReviews = (reviewsData as Review[]).filter((r) => r.rating >= 4);

  return (
    <Carousel
      title="Our Happy Customers"
      data={topReviews}
      showArrows={true}
      arrowPosition="header"
      renderItem={(review) => (
        <article className="w-[340px] md:w-[400px] rounded-[20px] border border-black/10 bg-white p-6 md:p-8 flex flex-col justify-between h-full">
          <div>
            <StarRating rating={review.rating} size={20} />
            <div className="mt-3 flex items-center gap-1.5 md:mt-4">
              <h3 className="font-satoshi text-base font-bold text-black md:text-xl">
                {review.userName}
              </h3>
              {review.verified && (
                <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#01AB31] text-[7px] text-white">
                  <FaCheck strokeWidth={3} />
                </span>
              )}
            </div>
            <p className="mt-2 font-satoshi text-sm leading-[1.6] text-black/60 md:mt-3 md:text-base line-clamp-4">
              "{review.comment}"
            </p>
          </div>
        </article>
      )}
    />
  );
}

export default CustomerReviews;
