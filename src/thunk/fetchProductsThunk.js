import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setFetchState, setProductList, setTotal } from "../redux/productSlice";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  (endpoint, { dispatch, getState }) => {
    const state = getState();
    if (state.client.fetchState === "FETCHED") {
      return Promise.resolve();
    }

    dispatch(setFetchState("FETCHING"));
    return axios
      .get(`https://workintech-fe-ecommerce.onrender.com${endpoint}`)
      .then((response) => {
        dispatch(setProductList(response.data.products));
        dispatch(setFetchState("FETCHED"));
        dispatch(setTotal(response.data.total));
      })
      .catch((error) => {
        dispatch(setFetchState("FAILED"));
        console.error("Error fetching roles:", error);

        return error;
      });
  }
);
