import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IusersOnline {
    usersOnline: string[]
}

const initialState: IusersOnline = {
    usersOnline: []
}

const usersOnlineSlice = createSlice({
    name: 'usersOnline',
    initialState,
    reducers: {
        getUsersOnline(state, action: PayloadAction<string[]>) {
            state.usersOnline = action.payload;
        },
        addUserOnline(state, action: PayloadAction<string>) {
            state.usersOnline.push(action.payload)
        },
        removeUserOnline(state, action: PayloadAction<string>) {
            state.usersOnline = state.usersOnline.filter(u => u !== action.payload);
        }
    }
})

export const { getUsersOnline, addUserOnline, removeUserOnline } = usersOnlineSlice.actions;
export default usersOnlineSlice.reducer;