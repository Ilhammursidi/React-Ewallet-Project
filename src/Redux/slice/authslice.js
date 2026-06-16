import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { forgotPassword, resetPassword, verifyResetToken } from "../thunks/forgotPassword";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8081";

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
        } catch(error) {
            return thunkAPI.rejectWithValue(error.message || "Connection error");
        }
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

export const logout = createAsyncThunk("auth/logout",
    async (token, thunkAPI) => {
        try {
            const token = localStorage.getItem("user_token");

            if (!token || token === "null" || token === "undefined") {
                return { success: true, message: "Sesi lokal dibersihkan" };
            }

            const response = await fetch(`${API_URL}/auth/logout`, {
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                    "X-koda-X":"true",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ token })
            });
            const result = await response.json();

            if(!response.ok) {
                return thunkAPI.rejectWithValue(result.error || "Failed to logout");
            }
            return result;
            
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message || "Connection error");
        } finally {
            localStorage.removeItem("user_token")
            window.location.href = "/auth/login"
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
        // logout: (state) => { state.currentUser = null
        //     localStorage.removeItem("user_token");
        //     state.currentUser = null;
        //     state.isLogin = false;
        // },
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
            // set pin
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
            // logout
            .addCase(logout.fulfilled, (state) => {
                state.isLogin = false;
                state.token = null;
                localStorage.removeItem("user_token");
                window.location.reload();
            })

            // forgot password
            .addCase(forgotPassword.fulfilled, (state, action) => {
                state.isLoading = false;
                state.message = action.payload.message
            })
            .addCase(forgotPassword.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // verify reset token
            .addCase(verifyResetToken.fulfilled, (state, action) => {
                state.isLoading = false;
                state.message = action.payload.message
            })
            .addCase(verifyResetToken.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(verifyResetToken.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload
            })

            // reset password
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.isLoading = false;
                state.message = action.payload.message
            })
            .addCase(resetPassword.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload
            })

            // 
    }
})

export const {updateCurrentUser,updateBalance } = authSlice.actions
export default authSlice.reducer