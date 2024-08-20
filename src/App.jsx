import { Route } from "react-router-dom/cjs/react-router-dom.min";
import "./App.css";

import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import { useState } from "react";
import ContactPage from "./pages/ContactPage";

function App() {
  const [currentProduct, setCurrentProduct] = useState(null);
  console.log(currentProduct);
  return (
    <>
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
      
      
      <ContactPage/>
      
      
      
      </Route>
    </>
  );
}

export default App;
