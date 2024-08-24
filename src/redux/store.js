import logger from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../redux/productSlice";
import clientReducer from "../redux/clientSlice";
import shoppingCartReducer from "../redux/shoppingCartSlice";

const store = configureStore({
  reducer: {
    client: clientReducer,
    product: productReducer,
    shoppingCart: shoppingCartReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
