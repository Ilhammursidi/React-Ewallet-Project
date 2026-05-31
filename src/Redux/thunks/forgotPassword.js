import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_URL = import.meta.env.VITE_API_URL;

export const forgotPassword = createAsyncThunk("/auth/forgot-password", 
    async (emailData, thunkAPI) => {
        try {
            const response = await fetch(`${API_URL}/auth/forgot-password`, {
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                    "X-koda-X":"true"
                },
                body: JSON.stringify({email: emailData})
            })
            const result = await response.json();
            console.log("reponse error:",result)
            if (!response.ok) {
                return thunkAPI.rejectWithValue(result.error || "wrong email or password");
            }
            return result
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message || "Connection error");
        }
    }
)

export const verifyResetToken = createAsyncThunk("/auth/verify-reset-token", 
    async (token, thunkAPI) => {
        try {
            const response = await fetch(`${API_URL}/auth/verify-reset-token?token=${token}`, {
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                    "X-koda-X":"true"
                },
            })
            const result = await response.json();
            console.log("reponse error:",result)
            if (!response.ok) {
                return thunkAPI.rejectWithValue(result.error || "invalid token or expired");
            }
            return result
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message || "Connection error");
        }
    }
)

export const resetPassword = createAsyncThunk("/auth/reset-password", 
    async ({token, password}, thunkAPI) => {
        try {
            const response = await fetch(`${API_URL}/auth/reset-password`, {
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                    "X-koda-X":"true"
                },
                body: JSON.stringify({ token, password })
            })
            const result = await response.json();
            console.log("reponse error:",result)
            if (!response.ok) {
                return thunkAPI.rejectWithValue(result.error || "failed to reset password");
            }
            return result
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message || "Connection error");
        }
    }
)

