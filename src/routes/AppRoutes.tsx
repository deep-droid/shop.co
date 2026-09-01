import { Routes, Route } from "react-router-dom";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import HomePage from "../pages/HomePage";
import CartPage from "../pages/CartPage";
import ProductListingPage from "../pages/ProductListingPage";

function AppRoutes() {
  return (
    <Routes>

      <Route
        path="/"
        element={<HomePage />}
      />

      <Route
        path="/category/:category"
        element={<ProductListingPage />}
      />

      <Route
        path="/product/:id"
        element={<ProductDetailsPage />}
      />

      <Route
        path="/cart"
        element={<CartPage />}
      />
    </Routes>
  );
}

export default AppRoutes;