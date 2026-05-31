import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL;

export const registerUser = createAsyncThunk("users/register",
    async (data, thunkAPI) => {
        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                    "X-koda-X":"true"
                },
                body: JSON.stringify(data)
            })
            const result = await response.json();
            if(!response.ok) {
                return thunkAPI.rejectWithValue(result.message || "failed to register")
            }
            console.log(result)
            return result;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message || "Connection error");
        }
    })

const userSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
        error: null,
    },
    reducers: {
        updatePin: (state, action) => {
            const { email, newPin } = action.payload

            const user = state.users.find(u => u.email === email)

            if (user) {
                user.userPin = newPin;
            }
        },
        updatePassword: (state, action) => {
            const { email, newPassword } = action.payload;
            const user = state.users.find(u => u.email === email);
            if (user) user.password = newPassword;
        },
        updateProfile: (state, action) => {
            const { email, fullName, phone, photoProfile } = action.payload;
            const user = state.users.find(u => u.email === email);
            if (user) {
                user.fullName = fullName;
                user.phone = phone;
                user.photoProfile = photoProfile;
            }
        },
        topUp: (state, action) => {
            const { email, amount } = action.payload;

            const user = state.users.find(u => u.email === email);

            if (user) {
                user.balance = (user.balance || 0) + amount;
                user.income = (user.income || 0) + amount;

                if (!user.history) user.history = [];

                user.history.unshift({
                    id: Date.now(),
                    type: "Top Up",
                    amount,
                    name: user.email.split("@")[0],
                    date: new Date().toISOString()
                });
            }
        },
        transfer: (state, action) => {
            const { email, amount, targetName, targetImg, targetPhone } = action.payload;

            const user = state.users.find(u => u.email === email);

            user.balance -= amount;
            user.expense += amount;

            user.history.unshift({
                id: Date.now(),
                type: "Transfer",
                amount,
                name: targetName,
                img: targetImg,
                phone: targetPhone,
                date: new Date().toISOString()
            });
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(registerUser.fulfilled, (state) => {
            state.error = null
        })
        .addCase(registerUser.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })  
        .addCase(registerUser.rejected, (state, action) => {
            state.error = action.payload
        })
    }
})

export const { updatePin, updatePassword, updateProfile, topUp, transfer } = userSlice.actions
export default userSlice.reducer