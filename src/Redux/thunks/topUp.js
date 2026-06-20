import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = import.meta.env.VITE_API_URL;

export const makeTopup = createAsyncThunk("transaction/topup",
    async (topupData, thunkAPI) => {
        try {
            const token = localStorage.getItem("user_token");
            const response = await fetch(`${API_URL}/transaction/topup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", 
                    "X-koda-X": "true",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    payment_method_id: topupData.paymentMethodId,
                    order_amount: topupData.orderAmount,
                    tax_amount: topupData.taxAmount || 0,
                    delivery_fee: topupData.deliveryFee || 0
                }),
            });

            const result = await response.json();
            if (!response.ok) {
                return thunkAPI.rejectWithValue(result.error || result.message || "TopUp failed");
            }
            return result;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message || "Connection error");
        }
    }
);
