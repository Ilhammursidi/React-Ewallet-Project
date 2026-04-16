import { createSlice } from "@reduxjs/toolkit";

const initialState = {
        user: null,
        isLogin: false,
    }

const authSlice = createSlice({
    initialState,
    name: 'auth',
    reducers: {
        loginUser:(state,action) => {
            state.user = action.payload.user;
            state.isLogin = true
        },
        logoutUser:(state) => {
            state.user = null;
            state.isLogin = false
        } 
    }
})

export const { loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer