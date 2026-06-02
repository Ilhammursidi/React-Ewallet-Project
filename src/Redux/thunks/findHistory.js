import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_URL = import.meta.env.VITE_API_URL;

export const getTransactionHistory = createAsyncThunk("/users/transaction-history", 
    async ({page, search = ""} = {}, thunkAPI) => {
        try {
            const token = localStorage.getItem("user_token")
            const response = await fetch(`${API_URL}/users/transactions?search=${search}&page=${page}`, {
                method: "GET",
                headers : {
                    "Content-Type":"application/json",
                    "X-koda-X":"true",
                    "Authorization":`Bearer ${token}`
                },
            })
            const result = await response.json();

            if(!response.ok) {
                return thunkAPI.rejectWithValue(result.error || "Failed get History");
            }
            return result;
            
            } catch (error) {
            return thunkAPI.rejectWithValue(error.message || "Connection error");
        }
    })