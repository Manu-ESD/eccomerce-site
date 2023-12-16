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

export const filteredProductsSlice = createSlice({
  name: "filteredProducts",
  initialState: { value: [] },
  reducers: {
    updateFilteredProducts: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const filterPillsDataSlice = createSlice({
  name: "filterPillsData",
  initialState: { value: [] },
  reducers: {
    updateFilterPillsData: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateProductsData } = productsDataSlice.actions;
export const { updateCurrentCategoryProducts } = currentCategoryProductsSlice.actions;
export const { updateFilteredProducts } = filteredProductsSlice.actions;
export const { updateFilterPillsData } = filterPillsDataSlice.actions;

export const productsDataReducer = productsDataSlice.reducer;
export const currentCategoryProductsReducer = currentCategoryProductsSlice.reducer;
export const filteredProductsReducer = filteredProductsSlice.reducer;
export const filterPillsDataReducer = filterPillsDataSlice.reducer;