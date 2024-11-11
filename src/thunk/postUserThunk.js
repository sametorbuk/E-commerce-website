import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setUser } from "../redux/clientSlice";
import md5 from "md5";
import { toast } from "react-toastify";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  ({ email, password, rememberMe }, { dispatch }) => {
    return axios
      .post(
        "https://e-commerce-withspring.onrender.com/auth/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        const { token, name, email } = response.data;

        const user = { name, email };

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
        toast.warning(error.response.data.message);
        return 0;
      });
  }
);
