import { configureStore } from "@reduxjs/toolkit";
import { addToCartReducer } from "./features/cartSlice";
import { productViewReducer } from "./features/productViewSlice";
import { searchValueReducer } from "./features/searchValueSlice";

const store = configureStore({
  reducer: {
    addToCart: addToCartReducer,
    productViewId: productViewReducer,
    searchValue: searchValueReducer,
  },
});

export default store;
