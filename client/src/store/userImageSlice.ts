import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IAvatat {
    avatar: string
}

const initialState = {
    avatar: null
}

const userImageSlice = createSlice({
    name: 'userImage',
    initialState,
    reducers: {
        setAvatar(state, action: PayloadAction<string>) {
            state.avatar = action.payload;
        }
    }
})

export const {setAvatar} = userImageSlice.actions;
export default userImageSlice.reducer;