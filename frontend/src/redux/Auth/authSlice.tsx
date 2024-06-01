import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "../../types/UserType";

const initialState: {
  userInfo: Pick<
    UserType,
    "_id" | "username" | "email" | "isAdmin" | "image"
  > | null;
} = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") as string)
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logOut: (state) => {
      state.userInfo = null;
      localStorage.clear();
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;
