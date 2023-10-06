import { createSlice } from "@reduxjs/toolkit";

export const productViewSlice = createSlice({
  name: "productViewId",
  initialState: { value: {} },
  reducers: {
    updateProductViewId: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateProductViewId } = productViewSlice.actions;

export const productViewReducer = productViewSlice.reducer;
