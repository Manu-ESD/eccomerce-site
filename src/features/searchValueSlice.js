import { createSlice } from "@reduxjs/toolkit";

export const searchValueSlice = createSlice({
  name: "searchValue",
  initialState: "",
  reducers: {
    updateSearchValue: (state, action) => {
      return action.payload;
    },
  },
});

export const { updateSearchValue } = searchValueSlice.actions;

export const searchValueReducer = searchValueSlice.reducer;
