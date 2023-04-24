import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: "id",
  initialState,
  reducers: {
    setToken: (state, payload: any) => {
      console.log(payload);
      state.token = payload?.payload;
    },
  },
});

export default authSlice.reducer;
export const { setToken } = authSlice.actions;
