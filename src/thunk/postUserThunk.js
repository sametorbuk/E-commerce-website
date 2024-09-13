import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setUser } from "../redux/clientSlice";
import md5 from "md5";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  ({ email, password, rememberMe }, { dispatch }) => {
    return axios
      .post("https://workintech-fe-ecommerce.onrender.com/login", {
        email,
        password,
      })
      .then((response) => {
        const { token, name, email, role_id } = response.data;

        const user = { name, email, role_id };

        const gravatarHash = md5(email.trim().toLowerCase());
        const gravatarUrl = `https://www.gravatar.com/avatar/${gravatarHash}`;

        user.gravatarUrl = gravatarUrl;

        dispatch(setUser(user));

        if (rememberMe) {
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
        } else {
          sessionStorage.setItem("token", token);
          sessionStorage.setItem("user", JSON.stringify(user));
        }

        return response.data;
      })
      .catch((error) => {
        console.log(error);
        return 0;
      });
  }
);
