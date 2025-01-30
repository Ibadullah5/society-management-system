import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  role: null,
  name: null,
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userId = action.payload.userId;
      state.role = action.payload.role;
      state.name = action.payload.name;
      state.token = action.payload.token;
    },
    clearUser: (state) => {
      state.userId = null;
      state.role = null;
      state.name = null;
      state.token = null;
      s;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
