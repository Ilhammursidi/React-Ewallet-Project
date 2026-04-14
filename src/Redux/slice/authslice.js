import { createSlice } from "@reduxjs/toolkit";

const initialState = {
        user:{},
        isSuccess: false
    }

const authSlice = createSlice({
    initialState,
    name: 'auth',
    reducers: {
        loginUser:(state,action) => {
            state.user = action.payload.user;
            state.isSuccess = true;
        },
        logoutUser:(state) => {
            state.user = null;
            state.isSuccess = false;
        } 
    }
})

export const { loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer