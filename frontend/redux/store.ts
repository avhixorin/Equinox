import { configureStore } from '@reduxjs/toolkit';
import feedSlice from './feedSlice';
import userSlice from './userSlice';
export const store = configureStore({
  reducer: {
    feed: feedSlice,
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
