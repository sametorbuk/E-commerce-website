import { Route } from "react-router-dom/cjs/react-router-dom.min";
import "./App.css";

import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import { useState } from "react";

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

      <Route path="/product-detail-page">
        <ProductDetailPage currentProduct={currentProduct} />
      </Route>
    </>
  );
}

export default App;
