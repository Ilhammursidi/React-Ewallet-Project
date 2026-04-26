import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const registerUser = createAsyncThunk("users/register",
    async (data, thunkAPI) => {
        const { users } = thunkAPI.getState().users

        const exist = users.find(u => u.email === data.email)

        if (exist) {
            return thunkAPI.rejectWithValue("email already exists")
        }
        return data
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
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.users.push({
                ...action.payload,
                balance: 0,
                income: 0,
                expense: 0,
                history: []
            })
        })
            .addCase(registerUser.rejected, (state, action) => {
                state.error = action.payload
            })
    }
})

export const { updatePin, updatePassword, updateProfile, topUp, transfer } = userSlice.actions
export default userSlice.reducer