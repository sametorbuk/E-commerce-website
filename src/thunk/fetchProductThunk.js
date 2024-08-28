import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setFetchState, setProduct } from "../redux/productSlice";

export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  (endpoint, { dispatch, getState }) => {
    const state = getState();
    if (state.client.fetchState === "FETCHED") {
      return Promise.resolve();
    }

    dispatch(setFetchState("FETCHING"));
    return axios
      .get(`https://workintech-fe-ecommerce.onrender.com${endpoint}`)
      .then((response) => {
        localStorage.setItem("product", JSON.stringify(response.data));
        dispatch(setProduct(response.data));
        dispatch(setFetchState("FETCHED"));
      })
      .catch((error) => {
        dispatch(setFetchState("FAILED"));
        console.error("Error fetching roles:", error);

        return error;
      });
  }
);
