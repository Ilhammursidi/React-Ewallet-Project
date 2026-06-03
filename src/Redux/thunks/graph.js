import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_URL = import.meta.env.VITE_API_URL;

export const getChart = createAsyncThunk("/users/transaction-report",
    async ({ period = "week" }, thunkAPI) => {
        const existing = thunkAPI.getState().chart?.data?.[period];
        if (existing) return thunkAPI.fulfillWithValue({ period, data: existing });

        try {
            const token = localStorage.getItem("user_token");
            const response = await fetch(`${API_URL}/users/transaction-report?period=${period}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "X-koda-X": "true",
                    "Authorization": `Bearer ${token}`
                },
            });
            const result = await response.json();
            if (!response.ok) {
                return thunkAPI.rejectWithValue(result.error || "Failed get chart");
            }
            return result;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message || "Connection error");
        }
    }
);

const chartSlice = createSlice({
    name: "chart",
    initialState: {
        data: {
            week: null,
            month: null,
            year: null,
        },
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getChart.fulfilled, (state, action) => {
                const period = action.meta.arg.period;
                state.data[period] = action.payload.data; // ← ambil .data, bukan payload langsung
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(getChart.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getChart.rejected, (state, action) => {
                state.error = action.payload;
                state.status = 'failed';
            })
    }
})

export default chartSlice.reducer