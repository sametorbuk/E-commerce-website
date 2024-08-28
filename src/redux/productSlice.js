import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  productList: [],
  total: 0,
  limit: 50,
  offset: 0,
  filter: "",
  fetchState: "NOT_FETCHED",
  product: {
    id: 15,
    name: "Minimal Kalp Baskılı",
    description: "Minimal Kalp Baskılı Siyah Oversize Tshirt",
    price: 85,
    stock: 56,
    store_id: 1,
    category_id: 1,
    rating: 4.42,
    sell_count: 686,
    images: [
      {
        url: "https://cdn.dsmcdn.com/ty900/product/media/images/20230523/16/356806190/516079941/1/1_org_zoom.jpg",
        index: 0,
      },
    ],
  },
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setFetchState: (state, action) => {
      state.fetchState = action.payload;
    },
    setProduct: (state, action) => {
      state.product = action.payload;
    },

    setCategories: (state, action) => {
      state.categories = action.payload;
    },

    setProductList: (state, action) => {
      state.productList = action.payload;
    },

    setTotal: (state, action) => {
      state.total = action.payload;
    },

    setLimit: (state, action) => {
      state.limit = action.payload;
    },
    setOffset: (state, action) => {
      state.offset = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const {
  setFetchState,
  setCategories,
  setProductList,
  setTotal,
  setLimit,
  setOffset,
  setFilter,
  setProduct,
} = productSlice.actions;

export default productSlice.reducer;
