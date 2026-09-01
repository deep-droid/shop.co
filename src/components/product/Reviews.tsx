import { FiMoreHorizontal, FiSliders, FiChevronDown } from "react-icons/fi";
import { FaCheck } from "react-icons/fa6";
import type { Product } from "../../data/products";
import type { Review } from "../../data/review"; // Import your typescript interface 
import StarRating from "../common/StarRating";

// Import your raw reviews array list from its project data path
import reviewsData from "../../data/reviews.json";

interface ReviewsProps {
  product: Product;
}

function Reviews({ product }: ReviewsProps) {

  // 1. Dynamic Filtering: Isolate comments matching this exact product footprint
  const filteredReviews = (reviewsData as Review[]).filter(
    (review) => review.productId === product.id
  );

  // 2. Local Helper formatting plain ISO date tokens "YYYY-MM-DD" -> "Month DD, YYYY"
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="w-full">

      {/* 1. Dynamic Control Action Filter Toolbar Header Row */}
      <div className="flex gap-4 flex-row justify-between">
        <h2 className="font-satoshi text-xl font-bold text-black lg:text-[24px]">
          All Reviews{" "}
          <span className="font-normal text-sm text-black/40 lg:text-base">
            ({filteredReviews.length})
          </span>
        </h2>

        {/* Filter Selection Elements Wrapper */}
        <div className="flex items-center justify-end gap-2.5 self-end sm:self-auto">
          {/* Settings Config Filter Trigger Pill */}
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F0F0F0] text-lg text-black transition hover:bg-black/5"
            aria-label="Filter reviews dropdown menu"
          >
            <FiSliders />
          </button>

          {/* Sort Selection Action Pill Button */}
          <button
            type="button"
            className="hidden h-12 items-center gap-5 rounded-full bg-[#F0F0F0] px-5 font-satoshi text-sm font-medium text-black transition hover:bg-black/5 sm:flex"
          >
            Latest <FiChevronDown className="text-lg opacity-60" />
          </button>

          {/* Primary CTA Write Review Action Trigger Element */}
          <button
            type="button"
            className="h-10 rounded-full bg-black px-4 font-satoshi text-xs font-medium text-white transition hover:bg-black/90 sm:h-12 sm:px-6 sm:text-sm"
          >
            Write a Review
          </button>
        </div>
      </div>

      {/* 2. Structured Feed Grid Framework Map Layout */}
      {filteredReviews.length === 0 ? (
        <div className="mt-8 py-16 text-center font-satoshi text-black/40 border border-dashed border-black/10 rounded-[20px]">
          No verified user feedback logged for this item yet.
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:mt-7 lg:gap-5">
          {filteredReviews.map((review) => (
            <article
              key={review.id}
              className="rounded-[20px] border border-black/10 bg-white p-6 lg:p-8 flex flex-col justify-between"
            >
              <div>
                {/* Card Upper Metric Header Area Row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-0.5">
                    {/* FIXED: Passed individual review metric numbers instead of general product scores */}
                    <StarRating rating={review.rating} size={16} />
                  </div>

                  <button
                    type="button"
                    className="text-black/40 hover:text-black transition"
                    aria-label="More review options"
                  >
                    <FiMoreHorizontal size={24} />
                  </button>
                </div>

                {/* Account Metadata Verification Stack Header Block */}
                <div className="mt-3 flex items-center gap-1.5 lg:mt-4">
                  <h3 className="font-satoshi text-base font-bold text-black lg:text-xl">
                    {review.userName}
                  </h3>
                  {review.verified && (
                    <span className="flex h-[15px] w-[15px] items-center justify-center rounded-full bg-[#01AB31] text-[7px] text-white">
                      <FaCheck strokeWidth={3} />
                    </span>
                  )}
                </div>

                {/* Core Body Paragraph Review Description Block */}
                <p className="mt-2 font-satoshi text-sm leading-[1.6] text-black/60 lg:mt-3 lg:text-base">
                  "{review.comment}"
                </p>
              </div>

              {/* Time Stamp Postmark Bottom Bar Element */}
              <p className="mt-5 font-satoshi text-sm font-medium text-black/40 lg:mt-6">
                Posted on {formatDate(review.date)}
              </p>
            </article>
          ))}
        </div>
      )}

      {/* 3. Paginated Load More Footprint Button Trigger element */}
      {filteredReviews.length > 0 && (
        <div className="mt-6 flex justify-center lg:mt-9">
          <button
            type="button"
            className="w-full rounded-full border border-black/10 py-3.5 px-9 font-satoshi text-sm font-medium text-black transition hover:bg-black hover:text-white sm:w-auto lg:py-4 lg:px-14 lg:text-base"
          >
            Load More Reviews
          </button>
        </div>
      )}

    </div>
  );
}

export default Reviews;
