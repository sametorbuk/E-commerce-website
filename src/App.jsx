import { Route } from "react-router-dom/cjs/react-router-dom.min";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import { useState } from "react";
import ContactPage from "./pages/ContactPage";
import TeamPage from "./pages/TeamPage";
import AboutUsPage from "./pages/AboutUsPage";
import SignUpPage from "./pages/SignUpPage";
import ScrollToTop from "./hooks/ScrollToTop";

function App() {
  const [currentProduct, setCurrentProduct] = useState(null);

  return (
    <>
      <ScrollToTop />
      <ToastContainer />
      <Route path="/" exact>
        <HomePage setCurrentProduct={setCurrentProduct} />
      </Route>

      <Route path="/shop">
        <ShopPage setCurrentProduct={setCurrentProduct} />
      </Route>

      <Route path="/product-detail">
        <ProductDetailPage currentProduct={currentProduct} />
      </Route>

      <Route path="/contact">
        <ContactPage />
      </Route>

      <Route path="/team">
        <TeamPage />
      </Route>

      <Route path="/about-us">
        <AboutUsPage />
      </Route>

      <Route path="/signup">
        <SignUpPage />
      </Route>
    </>
  );
}

export default App;
