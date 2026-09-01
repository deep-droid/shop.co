import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Instantly resets browser screen viewport matrices back to coordinate zero on route changes
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;
