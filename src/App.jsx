import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
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
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "./thunk/fetchCategoriesThunk";
import { setProductList } from "./redux/productSlice";
import { fetchProducts } from "./thunk/fetchProductsThunk";
import CategoryShopPage from "./pages/CategoryShopPage";
import ShoppingCartPage from "./pages/shoppingCartPage";
import PrivateRoute from "./components/PrivateRoute";

import CreateOrderPage from "./pages/createOrderPage";
import PreviousOrderPage from "./pages/PreviousOrderPage";
import axios from "axios";

function App() {
  const [currentProduct, setCurrentProduct] = useState(null);

  const { categories } = useSelector((state) => state.product);

  const dispatch = useDispatch();

  useEffect(() => {
    const token =
      localStorage.getItem("token") === null
        ? sessionStorage.getItem("token")
        : localStorage.getItem("token");

    const refreshToken =
      localStorage.getItem("refreshToken") === null
        ? sessionStorage.getItem("refreshToken")
        : localStorage.getItem("refreshToken");

    const tokenSavedArea =
      localStorage.getItem("token") === null ? "session" : "local";

    if (token) {
      const requestData = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios
        .get("http://localhost:8080/verify", requestData)
        .then((res) => {
          console.log(res.data);
          tokenSavedArea === "local"
            ? localStorage.setItem("token", res.data.token)
            : sessionStorage.setItem("token", res.data.token);
        })
        .catch((err) => {
          if (err.response && err.response.status === 401) {
            console.log("This token expired");

            axios
              .post("http://localhost:8080/refresh-token", refreshToken)
              .then((res) => {
                const { token, refreshToken, email } = res.data;
                if (tokenSavedArea == "local") {
                  localStorage.setItem("token", token);
                  localStorage.setItem("refreshToken", refreshToken);
                } else {
                  sessionStorage.setItem("token", token);
                  sessionStorage.setItem("refreshToken", refreshToken);
                }
              })
              .catch((err) => {
                console.log(err.response.data.message);
              });
          }
        });
    }
  }, []);

  useEffect(() => {
    if (setProductList.length === 0) {
      dispatch(fetchProducts("/products"));
    } else {
      return;
    }
  }, []);

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories("/categories"));
    }
  }, []);

  const womenCats = categories.filter((item) => item.gender === "k");
  const menCats = categories.filter((item) => item.gender === "e");
  const [willNavigateCurrentCategory, setWillNavigateCurrentCategory] =
    useState({});

  return (
    <>
      <ScrollToTop />

      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>

        <Route path="/" exact>
          <HomePage setCurrentProduct={setCurrentProduct} />
        </Route>

        <Route path="/shop" exact>
          <ShopPage
            setCurrentProduct={setCurrentProduct}
            setWillNavigateCurrentCategory={setWillNavigateCurrentCategory}
          />
        </Route>

        <Route
          path="/shop/:gender/:code/:id"
          exact
          render={(props) => (
            <CategoryShopPage
              {...props}
              setCurrentProduct={setCurrentProduct}
              setWillNavigateCurrentCategory={setWillNavigateCurrentCategory}
            />
          )}
        />

        <Route
          path="/shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId"
          exact
        >
          <ProductDetailPage
            currentProduct={currentProduct}
            setCurrentProduct={setCurrentProduct}
          />
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

        <Route path="/shopping-cart-page" exact>
          <ShoppingCartPage />
        </Route>

        <PrivateRoute>
          <Route path="/create-order-page">
            <CreateOrderPage />
          </Route>

          <Route path="/previous-orders">
            <PreviousOrderPage />
          </Route>
        </PrivateRoute>
      </Switch>
    </>
  );
}

export default App;
