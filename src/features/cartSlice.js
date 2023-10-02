import { createSlice } from "@reduxjs/toolkit";

export const addToCartSlice = createSlice({
  name: "addToCart",
  initialState: { value: [] },
  reducers: {
    updateAddToCart: (state, action) => {
      state.value = action.payload;
    },
    removeFromCart: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateAddToCart } = addToCartSlice.actions;

export const addToCartReducer = addToCartSlice.reducer;
