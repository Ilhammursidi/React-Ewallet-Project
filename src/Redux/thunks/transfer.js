import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = import.meta.env.VITE_API_URL;

export const makeTransfer = createAsyncThunk("transaction/transfer",
    async (transferData, thunkAPI) => {
        try {
            const token = localStorage.getItem("user_token");
            const response = await fetch(`${API_URL}/transaction/transfer`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", 
                    "X-koda-X": "true",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(transferData),
            });

            const result = await response.json();
            if (!response.ok) {
                return thunkAPI.rejectWithValue(result.error || result.message || "Transfer failed");
            }
            return result;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message || "Connection error");
        }
    }
);
