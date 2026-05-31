import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = import.meta.env.VITE_API_URL;

export const loginUser = createAsyncThunk("auth/login",
    async (data, thunkAPI) => {
        try {
            const response = await fetch(`${API_URL}/auth/login`,{
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                    "X-koda-X":"true"
                },
                body: JSON.stringify(data)
            })
            
            const result = await response.json();
            console.log("reponse error:",result)
            if (!response.ok) {
                return thunkAPI.rejectWithValue(result.error || "wrong email or password");
            }

            if (result.data.token) {
                localStorage.setItem("user_token", result.data.token);
            }
            return result.data
            console.log(result)
        } catch(error) {
            return thunkAPI.rejectWithValue(error.message || "Connection error");
        }
        // const { users } = thunkAPI.getState().users

        // const user = users.find(u => u.email === data.email && u.password === data.password)

        // if (!user) {
        //     return thunkAPI.rejectWithValue("wrong email or password")
        // }

        // return user
    })

export const setPin = createAsyncThunk("auth/enter-pin",
    async (pin, thunkAPI) => {
        try {
            const token = localStorage.getItem("user_token")
            const response = await fetch(`${API_URL}/auth/enter-pin`, {
                method: "PATCH",
                headers: {
                    "Content-Type":"application/json",
                    "X-koda-X":"true",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ pin })
            });
            const result = await response.json();

            if(!response.ok) {
                return thunkAPI.rejectWithValue(result.error || "Failed set PIN");
            }
            return result;
            
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message || "Connection error");
        }
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState: {
        has_pin: false,
        isLoading: false,
        isLogin: !!localStorage.getItem("user_token"),
        error: null
    },
    reducers: {
        logout: (state) => { state.currentUser = null
            localStorage.removeItem("user_token");
            state.currentUser = null;
            state.isLogin = false;
        },
        // setPin: (state, action) => {
        //     if (state.currentUser) {
        //         state.currentUser.userPin = action.payload;
        //     }
        // },
        updateCurrentUser: (state, action) => {
            if (state.currentUser) {
                state.currentUser = {
                    ...state.currentUser,
                    ...action.payload
            }
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
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.token = action.payload.token;
                state.has_pin = action.payload.has_pin; 
                // state.currentUser = action.payload
                state.isLoading = false
                state.isLogin = true
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.payload
                state.isLoading = false
                state.isLogin = false
            })
            .addCase(setPin.fulfilled, (state) => {
                state.has_pin = true;
                state.isLoading = false
            })
            .addCase(setPin.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(setPin.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            })
    }
})

export const { logout,updateCurrentUser,updateBalance } = authSlice.actions
export default authSlice.reducer