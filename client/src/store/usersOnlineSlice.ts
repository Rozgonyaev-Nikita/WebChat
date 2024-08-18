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
        addUserOnline(state, action: PayloadAction<string>) {
            state.usersOnline.push(action.payload)
        }
    }
})

export const {  } = usersOnlineSlice.actions;
export default usersOnlineSlice.reducer;