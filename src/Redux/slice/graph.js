import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_URL = import.meta.env.VITE_API_URL;

export const getChart = createAsyncThunk("/users/transaction-report",
    async ({ period = "week" }, thunkAPI) => {
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
            return result.data || result; 
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message || "Connection error");
        }
    }
);

const initialState = {
    data: [], 
    status: 'idle',
    error: null,
}

const chartSlice = createSlice({
    name: "chart",
    initialState,
    reducers: {
        clearCharData: (state) => {
            state.data = [];
            state.status = 'idle';
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getChart.fulfilled, (state, action) => {
                state.data = action.payload || [];
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
                state.data = []; 
            })
    }
})

export const { clearCharData } = chartSlice.actions;
export default chartSlice.reducer;
