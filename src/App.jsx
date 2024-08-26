import { Route } from "react-router-dom/cjs/react-router-dom.min";
import "./App.css";

import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import { useEffect, useState } from "react";
import ContactPage from "./pages/ContactPage";
import TeamPage from "./pages/TeamPage";
import AboutUsPage from "./pages/AboutUsPage";
import SignUpPage from "./pages/SignUpPage";
import ScrollToTop from "./hooks/ScrollToTop";
import LoginPage from "./pages/LoginPage";
import useAxios from "./hooks/useAxios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/clientSlice";
import { fetchCategories } from "./thunk/fetchCategoriesThunk";

function App() {
  const [currentProduct, setCurrentProduct] = useState(null);
  const { MakeRequest, data, METHODS } = useAxios();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const requestData = {
        headers: {
          Authorization: token,
        },
      };

      MakeRequest({
        url: "/verify",
        method: METHODS.GET,
        data: requestData,
      });

      if (data !== null) {
        dispatch(setUser(data));
        localStorage.setItem("token", data.token);
      } else {
        localStorage.clear();
      }
    } else {
      return;
    }
  }, []);

  const { categories } = useSelector((state) => state.product);

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories("/categories"));
    }
  }, []);

  const womenCats = categories.filter((item) => item.gender === "k");
  const menCats = categories.filter((item) => item.gender === "e");

  return (
    <>
      <ScrollToTop />

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

      <Route path="/login">
        <LoginPage />
      </Route>

      {womenCats.map((cat, ind) => {
        return (
          <Route key={ind} path={`/shop/${cat.gender}/${cat.title}`}></Route>
        );
      })}

      {menCats.map((cat, ind) => {
        return (
          <Route key={ind} path={`/shop/${cat.gender}/${cat.title}`}></Route>
        );
      })}
    </>
  );
}

export default App;
