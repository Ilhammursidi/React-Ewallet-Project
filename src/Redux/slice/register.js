import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { getProfile } from "../thunks/profile";
import { getBalance } from "../thunks/balance";
import { getHistory } from "../thunks/history";
import { getChart } from "../thunks/graph";
import { editProfile } from "../thunks/editProfile";
import { editPassword } from "../thunks/changePassword";
import { editUserPin } from "../thunks/changePin";
import { getReceivers } from "../thunks/findReceiver";
import { getTransactionHistory } from "../thunks/findHistory";

const API_URL = import.meta.env.VITE_API_URL;

export const registerUser = createAsyncThunk("users/register",
    async (data, thunkAPI) => {
        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-koda-X": "true"
                },
                body: JSON.stringify(data)
            })
            const result = await response.json();
            if (!response.ok) {
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
        },
        resetProfileStatus: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.error = null;
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

            // profile
            .addCase(getProfile.fulfilled, (state, action) => {
                state.error = null;
                state.data = action.payload.data;
                state.isLoading = false;
            })
            .addCase(getProfile.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getProfile.rejected, (state, action) => {
                state.error = action.payload.data;
                state.data = null;
                state.isLoading = false;
            })

            // dashboard info
            .addCase(getBalance.fulfilled, (state, action) => {
                state.error = null;
                state.dataBalance = action.payload;
            })
            .addCase(getBalance.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getBalance.rejected, (state, action) => {
                state.error = action.payload
                state.dataBalance = null;
            })

            // transaction history
            .addCase(getHistory.fulfilled, (state, action) => {
                state.error = null;
                state.dataHistory = action.payload.data;
            })
            .addCase(getHistory.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getHistory.rejected, (state, action) => {
                state.error = action.payload
                state.dataHistory = null;
            })

            // transaction history graph
            .addCase(getChart.fulfilled, (state, action) => {
                state.error = null;
                state.dataChart = action.payload.data;
            })
            .addCase(getChart.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getChart.rejected, (state, action) => {
                state.error = action.payload
                state.dataChart = null;
            })

            // edit Profile
            .addCase(editProfile.pending, (state) => {
                state.isLoading = true; 
                state.error = null;
            })
            .addCase(editProfile.fulfilled, (state, action) => {
                state.isLoading = false; 
                state.error = null;
                state.data = action.payload.data;
            })
            .addCase(editProfile.rejected, (state, action) => {
                state.isLoading = false; 
                state.error = action.payload.message || "Failed to update profile";
            })

            .addCase(editPassword.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.error = null;
            })
            .addCase(editPassword.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.error = null;
            })
            .addCase(editPassword.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.error = action.payload; 
            })

            .addCase(editUserPin.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.error = null;
            })
            .addCase(editUserPin.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.error = null;
            })
            .addCase(editUserPin.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.error = action.payload; 
            })

            // get receivers
            .addCase(getReceivers.fulfilled, (state, action) => {
                state.error = null;
                state.receivers = action.payload.data.items;
            })
            .addCase(getReceivers.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getReceivers.rejected, (state, action) => {
                state.error = action.payload;
                state.receivers = null;
            })

            // get transaction history
            .addCase(getTransactionHistory.fulfilled, (state, action) => {
                state.error = null;
                state.history = action.payload.data;
            })
            .addCase(getTransactionHistory.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getTransactionHistory.rejected, (state, action) => {
                state.error = action.payload;
                state.history = null;
            });

    }
})

export const { resetProfileStatus, updatePin, updatePassword, updateProfile, topUp, transfer } = userSlice.actions
export default userSlice.reducer