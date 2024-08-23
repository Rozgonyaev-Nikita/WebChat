import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../types/IUser";

interface IAuth {
  online: boolean;
  user: IUser;
}
const initialState: IAuth = {
  online: false,
  user: {
    _id: '',
    login: "",
    password: "",
    rooms: [],
    friends: {
      myFriends: [],
      request: [],
      offer: [],
      wait: [],
    },
    avatar: null
  },
  
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authAction(state, action) {
      state.user = action.payload;
      state.online = true;
    },
    addRoom(state, action: PayloadAction<string>) {
      state.user.rooms.push(action.payload);
    },
  },
});

export const { authAction, addRoom } = authSlice.actions;
export default authSlice.reducer;