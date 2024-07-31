import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../types/IRoom";

interface IAuth {
  isAuth: boolean;
  user: IUser;
}
const initialState: IAuth = {
  isAuth: false,
  user: {
    _id: '',
    login: "",
    password: "",
    rooms: [],
    friends: {
      myFriends: [],
      request: [],
      offer: [],
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
      state.isAuth = true;
    },
    addRoom(state, action: PayloadAction<string>) {
      state.user.rooms.push(action.payload);
    },
  },
});

export const { authAction, addRoom } = authSlice.actions;
export default authSlice.reducer;