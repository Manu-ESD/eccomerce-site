import { configureStore, combineReducers  } from "@reduxjs/toolkit";
import { addToCartReducer } from "./features/cartSlice";
import { productViewReducer } from "./features/productViewSlice";
import { searchValueReducer } from "./features/searchValueSlice";
import { authDataReducer } from "./features/authSlice";
import { selectedCategoriesReducer } from "./features/selectedCategories";
import { productsDataReducer,currentCategoryProductsReducer,filteredProductsReducer,filterPillsDataReducer } from "./features/productsSlice";
import sessionStorage from "redux-persist/es/storage/session";
import { persistReducer } from "redux-persist";

const rootReducer = combineReducers({
  addToCart: addToCartReducer,
  productViewId: productViewReducer,
  searchValue: searchValueReducer,
  authData: authDataReducer,
  selectedCategories: selectedCategoriesReducer,
  productsData:productsDataReducer,
  currentCategoryProducts:currentCategoryProductsReducer,
  filteredProducts:filteredProductsReducer,
  filterPillsData:filterPillsDataReducer
});

const persistConfig = {
  key: "root",
  version: 1,
  storage: sessionStorage,
  blacklist: [
    "searchValue",
    "productViewId",
    "currentCategoryProducts",
    "filterPillsData"
  ]
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
        }),
});

export default store;