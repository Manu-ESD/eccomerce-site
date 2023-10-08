import { configureStore } from "@reduxjs/toolkit";
import { addToCartReducer } from "./features/cartSlice";
import { productViewReducer } from "./features/productViewSlice";
import { searchValueReducer } from "./features/searchValueSlice";
import { authDataReducer } from "./features/authSlice";

const store = configureStore({
  reducer: {
    addToCart: addToCartReducer,
    productViewId: productViewReducer,
    searchValue: searchValueReducer,
    authData:authDataReducer
  },
});

export default store;
