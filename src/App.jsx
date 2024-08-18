import { Route } from "react-router-dom/cjs/react-router-dom.min";
import "./App.css";

import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";

function App() {
  return (
    <>
      <Route path="/" exact>
        <HomePage />
      </Route>

      <Route path="/shop">
        <ShopPage />
      </Route>
    </>
  );
}

export default App;
