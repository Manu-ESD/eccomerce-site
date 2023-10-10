import { createSlice } from "@reduxjs/toolkit";

export const selectedCategoriesSlice = createSlice({
  name: "selectedCategories",
  initialState: { value: "" },
  reducers: {
    updateselectedCategories: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateselectedCategories } = selectedCategoriesSlice.actions;

export const selectedCategoriesReducer = selectedCategoriesSlice.reducer;
