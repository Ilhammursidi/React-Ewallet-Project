import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = import.meta.env.VITE_API_URL;

export const editProfile = createAsyncThunk("users/editProfile",
    async (profileData, thunkAPI) => {
        try {
            const token = localStorage.getItem("user_token");
            
            const formData = new FormData();
            
            if (profileData.fullName) formData.append("fullname", profileData.fullName);
            if (profileData.phone) formData.append("phone", profileData.phone);
            
            if (profileData.photoFile) {
                formData.append("photo", profileData.photoFile); 
            }

            const response = await fetch(`${API_URL}/users/profile`, {
                method: "PATCH",
                headers: {
                    "X-koda-X": "true",
                    "Authorization": `Bearer ${token}`,
                },
                body: formData 
            });

            const result = await response.json();
            if (!response.ok) {
                return thunkAPI.rejectWithValue(result.message || "Failed to edit profile");
            }
            return result;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message || "Connection error");
        }
    }
);
