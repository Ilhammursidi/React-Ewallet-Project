import { createSlice } from "@reduxjs/toolkit";

const registerSlice = createSlice({
    name: "registration",
    initialState: {
        allUsers: [],
    },
    reducers: {
        addUser: (state, action) => {
            state.allUsers.push(action.payload);
        },
    },
});

export const { addUser } = registerSlice.actions
export default registerSlice.reducer    