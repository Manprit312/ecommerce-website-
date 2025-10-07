"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: {
    uid: string;
    displayName: string;
    email: string;
    photoURL: string;
  } | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        uid: string;
        displayName: string;
        email: string;
        photoURL: string;
      }>
    ) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
