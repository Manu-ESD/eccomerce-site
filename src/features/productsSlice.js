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

export const { updateProductsData } = productsDataSlice.actions;
export const productsDataReducer = productsDataSlice.reducer;