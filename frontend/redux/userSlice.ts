import { User } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: User;
}

const initialState: UserState = {
  user: {
    name: "",
    email: "",
    profilePicture: "",
    bookmarks: [],
    settings: {},
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    addBookmark: (state, action: PayloadAction<string>) => {
      if (state.user && !state.user.bookmarks.includes(action.payload)) {
        state.user.bookmarks.push(action.payload);
      }
    },
    removeBookmark: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.bookmarks = state.user.bookmarks.filter(
          (bookmark) => bookmark !== action.payload
        );
      }
    },
    clearUser: () => initialState,
  },
});

export const { setUser, addBookmark, removeBookmark, clearUser } =
  userSlice.actions;
export default userSlice.reducer;
