import Header from "./components/layout/Header";
import Newsletter from "./components/layout/Newsletter";
import Footer from "./components/layout/Footer";

import { Toaster } from "react-hot-toast";

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

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2500,
        }}
      />
    </>
  );
}

export default App;