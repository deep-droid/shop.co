import { FaMinus, FaPlus, FaTrash } from "react-icons/fa6";
import { FiTag } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";


import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  selectCartItems,
  removeFromCart,
  updateQuantity,
} from "../features/cart/cartSlice";
import getColorName from "../components/utils/getColorName";
import { toast } from "react-hot-toast";

function CartPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const discount = subtotal * 0.2;
  const deliveryFee = subtotal > 0 ? 15 : 0;
  const total = subtotal - discount + deliveryFee;

  const handleIncrease = (item: (typeof items)[0]) => {
    dispatch(
      updateQuantity({
        productId: item.product.id,
        selectedColor: item.selectedColor,
        selectedSize: item.selectedSize,
        quantity: item.quantity + 1,
      })
    );
  };

  const handleDecrease = (item: (typeof items)[0]) => {
    const newQty = item.quantity - 1;

    if (newQty <= 0) {
      dispatch(
        removeFromCart({
          productId: item.product.id,
          selectedColor: item.selectedColor,
          selectedSize: item.selectedSize,
        })
      );
    } else {
      dispatch(
        updateQuantity({
          productId: item.product.id,
          selectedColor: item.selectedColor,
          selectedSize: item.selectedSize,
          quantity: newQty,
        })
      );
    }
  };

  const handleRemove = (item: (typeof items)[0]) => {
    dispatch(
      removeFromCart({
        productId: item.product.id,
        selectedColor: item.selectedColor,
        selectedSize: item.selectedSize,
      })
    );
    toast.error(`${item.product.name} removed from cart`);
  };

  return (
    <main className="container-shop px-4 py-6 sm:px-6 md:px-8 lg:py-10">

      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mb-5 flex items-center gap-2 font-satoshi text-sm text-black/60"
      >
        <Link
          to="/"
          className="transition hover:text-black"
        >
          Home
        </Link>

        <span className="text-xs text-black/40">
          ›
        </span>

        <span className="font-medium text-black">
          Cart
        </span>
      </nav>

      {/* Page Heading */}
      <h1 className="heading-shop text-3xl font-black uppercase sm:text-4xl lg:text-[48px]">
        Your Cart
      </h1>

      {/* Main Layout */}
      <div className="mt-6 grid grid-cols-1 items-start gap-5 lg:grid-cols-[1.4fr_0.95fr] lg:gap-6">

        {/* Cart Items */}
        <div className="rounded-[20px] border border-black/10 bg-white p-4 sm:p-6">

          {items.length === 0 ? (
            <div className="py-16 text-center font-satoshi">

              <p className="text-base text-black/50">
                Your shopping cart is currently empty.
              </p>

              <Link
                to="/category/all"
                className="mt-4 inline-block rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-black/90"
              >
                Continue Shopping
              </Link>

            </div>
          ) : (
            items.map((item, index) => {
              const { product } = item;

              return (
                <div
                  key={`${product.id}-${item.selectedColor}-${item.selectedSize}`}
                  className={`flex gap-3 py-6 first:pt-2 last:pb-2 sm:gap-4 ${index !== items.length - 1
                    ? "border-b border-black/10"
                    : ""
                    }`}
                >

                  {/* Product Image */}
                  <div className="h-[100px] w-[100px] shrink-0 overflow-hidden rounded-[13px] bg-[#F0EEED] sm:h-[124px] sm:w-[124px]">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="h-full w-full object-cover object-top"
                    />
                  </div>

                  {/* Product Information */}
                  <div className="flex min-w-0 flex-1 flex-col">

                    <div className="flex items-start justify-between gap-3">

                      <div className="min-w-0">

                        <h2 className="truncate font-satoshi text-base font-bold text-black sm:text-xl">
                          {product.name}
                        </h2>

                        <p className="mt-1 font-satoshi text-xs text-black/60 sm:text-sm">
                          Size:{" "}
                          <span className="text-black/80">
                            {item.selectedSize}
                          </span>
                        </p>

                        <p className="mt-0.5 font-satoshi text-xs text-black/60 sm:text-sm">
                          Color:{" "}
                          <span className="text-black/80">
                            {getColorName(item.selectedColor)}
                          </span>
                        </p>

                      </div>

                      {/* Remove */}
                      <button
                        type="button"
                        onClick={() => handleRemove(item)}
                        className="shrink-0 p-1 text-[#FF3333] transition hover:text-[#FF3333]/80 active:scale-90"
                        aria-label={`Remove ${product.name} from cart`}
                      >
                        <FaTrash size={18} />
                      </button>

                    </div>

                    {/* Price + Quantity */}
                    <div className="mt-auto flex items-end justify-between gap-3 pt-2">

                      <span className="font-satoshi text-xl font-bold text-black sm:text-2xl">
                        ${product.price}
                      </span>

                      {/* Quantity */}
                      <div className="flex h-9 w-[105px] items-center justify-between rounded-full bg-[#F0F0F0] px-3.5 sm:h-11 sm:w-[120px]">

                        <button
                          type="button"
                          onClick={() => handleDecrease(item)}
                          className="p-1 text-black transition hover:text-black/60 active:scale-90"
                          aria-label="Decrease quantity"
                        >
                          <FaMinus size={12} />
                        </button>

                        <span className="font-satoshi text-sm font-medium text-black">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() => handleIncrease(item)}
                          className="p-1 text-black transition hover:text-black/60 active:scale-90"
                          aria-label="Increase quantity"
                        >
                          <FaPlus size={12} />
                        </button>

                      </div>

                    </div>

                  </div>
                </div>
              );
            })
          )}

        </div>

        {/* Order Summary */}
        <div className="rounded-[20px] border border-black/10 bg-white p-5 sm:p-6">

          <h2 className="font-satoshi text-xl font-bold text-black sm:text-2xl">
            Order Summary
          </h2>

          {/* Subtotal */}
          <div className="mt-5 flex items-center justify-between font-satoshi text-base lg:mt-6">
            <span className="text-black/60">
              Subtotal
            </span>

            <span className="font-bold text-black">
              ${subtotal.toFixed(2)}
            </span>
          </div>

          {/* Discount */}
          <div className="mt-5 flex items-center justify-between font-satoshi text-base">
            <span className="text-black/60">
              Discount (-20%)
            </span>

            <span className="font-bold text-[#FF3333]">
              -${discount.toFixed(2)}
            </span>
          </div>

          {/* Delivery */}
          <div className="mt-5 flex items-center justify-between font-satoshi text-base">
            <span className="text-black/60">
              Delivery Fee
            </span>

            <span className="font-bold text-black">
              ${deliveryFee.toFixed(2)}
            </span>
          </div>

          <div className="my-5 border-t border-black/10" />

          {/* Total */}
          <div className="flex items-center justify-between font-satoshi">

            <span className="text-base text-black">
              Total
            </span>

            <span className="text-2xl font-bold text-black">
              ${total.toFixed(2)}
            </span>

          </div>

          {/* Promo Code */}
          <div className="mt-6 flex gap-3">

            <div className="flex h-12 min-w-0 flex-1 items-center gap-3 rounded-full border border-transparent bg-[#F0F0F0] px-4 transition-all duration-200 focus-within:border-black/20 focus-within:bg-white">

              <FiTag
                size={20}
                className="shrink-0 text-black/40"
              />

              <input
                type="text"
                placeholder="Add promo code"
                className="min-w-0 flex-1 bg-transparent font-satoshi text-sm text-black outline-none placeholder:text-black/40"
              />

            </div>

            <button
              type="button"
              className="h-12 rounded-full bg-black px-6 font-satoshi text-sm font-medium text-white transition hover:bg-black/90 active:scale-95"
            >
              Apply
            </button>

          </div>

          {/* Checkout */}
          <button
            type="button"
            className="mt-6 flex h-12 w-full items-center justify-center gap-3 rounded-full bg-black font-satoshi text-sm font-medium text-white transition hover:bg-black/90 active:scale-[0.99] sm:h-14 sm:text-base"
          >
            <span>
              Go to Checkout
            </span>

            <FaArrowRight className="text-sm" />
          </button>

        </div>

      </div>
    </main>
  );
}

export default CartPage;