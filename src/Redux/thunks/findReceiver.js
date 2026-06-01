import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_URL = import.meta.env.VITE_API_URL;

export const getReceivers = createAsyncThunk("/transaction/receivers", 
    async ({page, limit, search = ""}, thunkAPI) => {
        try {
            const token = localStorage.getItem("user_token")
            const response = await fetch(`${API_URL}/transaction/receivers?page=${page}&limit=${limit}&search=${search}`, {
                method: "GET",
                headers : {
                    "Content-Type":"application/json",
                    "X-koda-X":"true",
                    "Authorization":`Bearer ${token}`
                },
            })
            const result = await response.json();

            if(!response.ok) {
                return thunkAPI.rejectWithValue(result.error || "Failed get Receivers");
            }
            return result;
            
            } catch (error) {
            return thunkAPI.rejectWithValue(error.message || "Connection error");
        }
    })