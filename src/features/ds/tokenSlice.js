import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: {
    token: "",
    role: "",
  },
};

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.auth.token = action.payload;
    },
    setRole: (state, action) => {
      state.auth.role = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setToken, setRole } = tokenSlice.actions;

export default tokenSlice.reducer;
