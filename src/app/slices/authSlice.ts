import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: "id",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    resetToken: (state) => {
      state.token = null;
    },
  },
});

export default authSlice.reducer;
export const { setToken, resetToken } = authSlice.actions;
