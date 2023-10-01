import { createSlice } from "@reduxjs/toolkit";

export const addToCartSlice = createSlice({
  name: "addToCart",
  initialState: { value: [] },
  reducers: {
    updateAddtoCart: (state, action) => {
      state.value = action.payload;
    },
    removeFromCart: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateAddtoCart } = addToCartSlice.actions;

export const addToCartReducer = addToCartSlice.reducer;
