import { configureStore } from "@reduxjs/toolkit";
import { addToCartReducer } from "./features/cartSlice";

const store = configureStore({
  reducer: {
    addToCart: addToCartReducer,
  },
});

export default store;
