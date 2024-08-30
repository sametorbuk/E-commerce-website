import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setFetchState } from "../redux/productSlice";
import { setAddressList } from "../redux/clientSlice";

export const fetchAddressList = createAsyncThunk(
  "categories/fetchCategories",
  (endpoint, { dispatch, getState }) => {
    const state = getState();
    if (state.client.fetchState === "FETCHED") {
      return Promise.resolve();
    }

    const token = localStorage.getItem("token");
    dispatch(setFetchState("FETCHING"));
    return axios
      .get(`https://workintech-fe-ecommerce.onrender.com${endpoint}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        dispatch(setAddressList(response.data));
        dispatch(setFetchState("FETCHED"));
        localStorage.setItem("addressList", JSON.stringify(response.data));
      })
      .catch((error) => {
        dispatch(setFetchState("FAILED"));
        console.error("Error fetching roles:", error);

        return error;
      });
  }
);
