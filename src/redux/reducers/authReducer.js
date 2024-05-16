import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setuserData: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setToken, setuserData, setIsLoggedIn } = authSlice.actions;

export default authSlice.reducer;
