import { atricle } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FeedState {
  feed: atricle[] | null;
}

const initialState: FeedState = {
  feed: [],
};

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    setFeed: (state, action: PayloadAction<atricle[]>) => {
      state.feed = action.payload;
    },
    addFeedItem: (state, action: PayloadAction<atricle>) => {
      state.feed?.push(action.payload);
    },
    removeFeedItem: (state, action: PayloadAction<string>) => {
      if (!state.feed) return;
      state.feed = state.feed?.filter((item) => item.id !== action.payload);
    },
  },
});

export const { setFeed, addFeedItem, removeFeedItem } = feedSlice.actions;
export default feedSlice.reducer;
