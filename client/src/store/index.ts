import { configureStore } from "@reduxjs/toolkit";
import authSlice from './authSlice'
import { roomApi } from "./roomApi";

const store = configureStore({
  reducer: {
    auth: authSlice,
    [roomApi.reducerPath]: roomApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(roomApi.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;