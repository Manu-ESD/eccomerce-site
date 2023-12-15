import { createSlice } from "@reduxjs/toolkit";

export const productsDataSlice = createSlice({
  name: "productsData",
  initialState: { value: [] },
  reducers: {
    updateProductsData: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const currentCategoryProductsSlice = createSlice({
  name: "currentCategoryProducts",
  initialState: { value: [] },
  reducers: {
    updateCurrentCategoryProducts: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateProductsData } = productsDataSlice.actions;
export const productsDataReducer = productsDataSlice.reducer;
export const { updateCurrentCategoryProducts } = currentCategoryProductsSlice.actions;
export const currentCategoryProductsReducer = currentCategoryProductsSlice.reducer;