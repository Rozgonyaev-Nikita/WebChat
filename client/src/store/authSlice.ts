import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../types/IRoom";

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
    }
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authAction(state, action) {
      // state.isAuth = action.payload;
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