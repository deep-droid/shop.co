import { FiMenu, FiSearch, FiShoppingCart, FiUser, FiX } from "react-icons/fi";
import { useState } from "react";
import { Link } from "react-router-dom";

import { useAppSelector } from "../../app/hooks";
import { selectCartTotalItems } from "../../features/cart/cartSlice";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const totalQuantity = useAppSelector(selectCartTotalItems);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      {/* Promo Bar */}
      <div className="relative bg-black px-4 py-1.5 text-center text-[8px] text-white">
        Sign up and get 20% off to your first order.{" "}
        <button
          type="button"
          className="underline"
        >
          Sign Up Now
        </button>

        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2"
          aria-label="Close promotion"
        >
          ×
        </button>
      </div>

      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="container-shop my-6 flex h-12 items-center justify-between gap-10">

          {/* Mobile Menu */}
          <button
            type="button"
            className="lg:hidden"
            onClick={() => setMenuOpen((current) => !current)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? (
              <FiX size={18} />
            ) : (
              <FiMenu size={18} />
            )}
          </button>

          {/* Logo */}
          <Link
            to="/"
            onClick={closeMenu}
            className="top-bar-logo text-[19px] font-black md:text-[24px] lg:text-[32px]"
          >
            SHOP.CO
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 lg:flex">

            <Link
              to="/category/all"
              className="flex items-center gap-1 text-[14px] md:text-[16px]"
            >
              Shop
              <span className="text-[14px] md:text-[16px]">⌄</span>
            </Link>

            <Link
              to="/category/on-sale"
              className="text-[14px] md:text-[16px]"
            >
              On Sale
            </Link>

            <Link
              to="/category/new-arrivals"
              className="text-[14px] md:text-[16px]"
            >
              New Arrivals
            </Link>

            <Link
              to="/category/brands"
              className="text-[14px] md:text-[16px]"
            >
              Brands
            </Link>

          </nav>

          {/* Desktop Search */}
          <div className="hidden flex-1 md:block">
            <div className="mx-4 flex h-9.5 items-center rounded-full bg-[#f2f0f1] px-4">

              <FiSearch
                size={24}
                className="mr-3 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search for products..."
                className="w-full bg-transparent text-[16px] outline-none placeholder:text-gray-400"
              />

            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">

            {/* Mobile Search */}
            <button
              type="button"
              className="md:hidden"
              aria-label="Search"
            >
              <FiSearch size={23} />
            </button>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-black/5 active:scale-95"
              aria-label={`Shopping cart with ${totalQuantity} items`}
            >
              <FiShoppingCart size={24} />

              {totalQuantity > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-[#FF3333] px-1 font-satoshi text-[9px] font-bold text-white shadow-sm ring-2 ring-white">
                  {totalQuantity}
                </span>
              )}
            </Link>

            {/* Account */}
            <button
              type="button"
              aria-label="Account"
            >
              <FiUser size={24} />
            </button>

          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <nav className="border-t border-gray-200 bg-white px-6 py-5 lg:hidden">
            <div className="flex flex-col gap-4">

              <Link
                to="/category/all"
                onClick={closeMenu}
                className="text-sm"
              >
                Shop
              </Link>

              <Link
                to="/category/on-sale"
                onClick={closeMenu}
                className="text-sm"
              >
                On Sale
              </Link>

              <Link
                to="/category/new-arrivals"
                onClick={closeMenu}
                className="text-sm"
              >
                New Arrivals
              </Link>

              <Link
                to="/category/brands"
                onClick={closeMenu}
                className="text-sm"
              >
                Brands
              </Link>

              <Link
                to="/cart"
                onClick={closeMenu}
                className="text-sm"
              >
                Cart
              </Link>

            </div>
          </nav>
        )}

      </header>
    </>
  );
}

export default Header;