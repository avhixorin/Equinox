import { configureStore } from '@reduxjs/toolkit';
import feedSlice from './feedSlice';

export const store = configureStore({
  reducer: {
    counter: feedSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
