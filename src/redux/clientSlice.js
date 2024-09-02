import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || {},
  addressList: [],
  creditCards: [],
  roles: [],
  theme: "",
  language: "",
};

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { email, name, password } = action.payload;
      state.user = {
        ...state.user,
        email,
        name,
        password,
      };
    },
    setRoles: (state, action) => {
      const { newRoles } = action.payload;
      state.roles = [...state.roles, newRoles];
    },
    setTheme: (state, action) => {
      const { newTheme } = action.payload;
      state.theme = newTheme;
    },
    setLanguage: (state, action) => {
      const { newLang } = action.payload;
      state.language = newLang;
    },
    setAddressList: (state, action) => {
      state.addressList = action.payload;
    },
    setCreditCards: (state, action) => {
      state.creditCards = action.payload;
    },
  },
});

export const {
  setRoles,
  setLanguage,
  setTheme,
  setUser,
  setAddressList,
  setCreditCards,
} = clientSlice.actions;

export default clientSlice.reducer;
