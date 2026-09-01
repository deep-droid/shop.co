import Header from "./components/layout/Header";
import Newsletter from "./components/layout/Newsletter";
import Footer from "./components/layout/Footer";

import AppRoutes from "./routes/AppRoutes";
import ScrollToTop from "./components/utils/ScrollToTop";

function App() {
  return (
    <>
      <ScrollToTop />
      <Header />

      <main>
        <AppRoutes />
      </main>

      <Newsletter />

      <Footer />
    </>
  );
}

export default App;