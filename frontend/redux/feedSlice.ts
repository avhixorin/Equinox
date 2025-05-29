import { article } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FeedState {
  feed: article[];
}

const initialState: FeedState = {
  feed: [],
};

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    setFeed: (state, action: PayloadAction<article[]>) => {
      return {
        ...state,
        feed: [...action.payload],
      };
    },
    addFeedItem: (state, action: PayloadAction<article>) => {
      return {
        ...state,
        feed: [...state.feed, action.payload],
      };
    },
    removeFeedItem: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        feed: state.feed.filter((item) => item.id !== action.payload),
      };
    },
  },
});

export const { setFeed, addFeedItem, removeFeedItem } = feedSlice.actions;
export default feedSlice.reducer;
