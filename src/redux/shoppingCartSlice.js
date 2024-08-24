import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  payment: {},
  address: {},
};

const shoppingCartSlice = createSlice({
  name: "shoopingCart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    setPayment: (state, action) => {
      state.payment = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
  },
});

export const { setCart, setPayment, setAddress } = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;
