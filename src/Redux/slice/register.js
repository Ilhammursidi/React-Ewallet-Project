import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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
            const { email, pin } = action.payload

            state.users = state.users.map((u) => {
                if (u.email === email) {
                    return { ...u, userPin: pin }
                }
                return u
            })
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.fulfilled, (state, action) => {
                state.users.push(action.payload)
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.error = action.payload
            })
    }
})

export const { updatePin } = userSlice.actions
export default userSlice.reducer