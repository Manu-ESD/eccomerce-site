import { configureStore } from "@reduxjs/toolkit";
import { addToCartReducer } from "./features/cartSlice";
import { productViewReducer } from "./features/productViewSlice";
import { authDataReducer } from "./features/authSlice";

const store = configureStore({
  reducer: {
    addToCart: addToCartReducer,
    productViewId: productViewReducer,
    authData:authDataReducer
  },
});

export default store;
