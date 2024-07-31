import { configureStore } from "@reduxjs/toolkit";
import authSlice from './authSlice'
import { roomApi } from "./roomApi";
import { userApi } from "./userApi";

const store = configureStore({
  reducer: {
    auth: authSlice,
    [roomApi.reducerPath]: roomApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(roomApi.middleware).concat(userApi.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;