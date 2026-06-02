import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = import.meta.env.VITE_API_URL;

export const editUserPin = createAsyncThunk("users/profile/change-pin",
    async ({ OldPin, NewPin }, thunkAPI) => {
        try {
            const token = localStorage.getItem("user_token");
            const response = await fetch(`${API_URL}/users/profile/change-pin`, {
                method: "PATCH",
                headers: {
                    "Content-Type":"application/json",
                    "X-koda-X": "true",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    oldpin: OldPin,
                    newpin: NewPin
                })
            });

            const result = await response.json();
            if (!response.ok) {
                return thunkAPI.rejectWithValue(result.message || "Failed to edit password");
            }
            return result;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message || "Connection error");
        }
    }
);
