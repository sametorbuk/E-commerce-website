import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setUser } from "../redux/clientSlice";
import md5 from "md5";
import { toast } from "react-toastify";

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
        }

        toast.success(`Merhaba, hoşgeldin ${user.name}!`);
        return { user, token };
      })
      .catch((error) => {
        toast.warning("Login failed! Please check your details.");

        throw error;
      });
  }
);
