import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setRoles } from "../redux/clientSlice";
import { setFetchState } from "../redux/productSlice";

export const fetchRoles = createAsyncThunk(
  "roles/fetchRoles",
  (endpoint, { dispatch, getState }) => {
    const state = getState();
    if (state.client.fetchState === "FETCHED") {
      return Promise.resolve();
    }

    dispatch(setFetchState("FETCHING"));
    return axios
      .get(endpoint)
      .then((response) => {
        dispatch(setRoles({ newRoles: response.data }));
        dispatch(setFetchState("FETCHED"));
      })
      .catch((error) => {
        dispatch(setFetchState("FAILED"));
        console.error("Error fetching roles:", error);

        throw error;
      });
  }
);
