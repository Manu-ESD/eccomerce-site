import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "authData",
    initialState: {
        isLoggedIn: false,
        user: null,
    },
    reducers: {
        signIn(state, action) {
            state.isLoggedIn = true;
            state.user = action.payload;
        },
        signOff(state) {
            state.isLoggedIn = false;
            state.user = null;
        }
    }
})

export const authDataReducer = authSlice.reducer;
export const { signIn,signOff } = authSlice.actions;

export default authSlice;