import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk("auth/login",
    async (data, thunkAPI) => {
        const { users } = thunkAPI.getState().users

        const user = users.find(u => u.email === data.email && u.password === data.password)

        if (!user) {
            return thunkAPI.rejectWithValue("wrong email or password")
        }

        return user
    })

const authSlice = createSlice({
    name: "auth",
    initialState: {
        currentUser: null,
        isLoading: false,
        isLogin: false,
        error: null
    },
    reducers: {
        logout: (state) => { state.currentUser = null },
        setPin: (state, action) => {
            state.currentUser.userPin = action.payload
        },
        updateCurrentUser: (state, action) => {
    state.currentUser = {
        ...state.currentUser,
        ...action.payload
    };
},
    updateBalance: (state, action) => {
    const { amount } = action.payload;

    if (state.currentUser) {
        state.currentUser.balance += amount;
        state.currentUser.income += amount;
    }
}
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.currentUser = action.payload
                state.isLoading = false
                state.isLogin = true
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.payload
                state.isLoading = false
                state.isLogin = false
            })
    }
})

export const { logout,setPin,updateCurrentUser,updateBalance } = authSlice.actions
export default authSlice.reducer