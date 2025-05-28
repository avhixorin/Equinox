import { configureStore } from '@reduxjs/toolkit';
import feedSlice from './feedSlice';

export const store = configureStore({
  reducer: {
    feed: feedSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
