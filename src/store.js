import { configureStore } from "@reduxjs/toolkit";
import { addToCartReducer } from "./features/cartSlice";
import { productViewReducer } from "./features/productViewSlice";

const store = configureStore({
  reducer: {
    addToCart: addToCartReducer,
    productViewId: productViewReducer,
  },
});

export default store;
