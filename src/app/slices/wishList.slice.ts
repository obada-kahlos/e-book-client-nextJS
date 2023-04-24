import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface WishState {
  toggle: boolean;
}

const initialState = { toggle: false } as WishState;

const wishListSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishList(state) {
      state.toggle = !state.toggle;
    },
  },
});

export const { toggleWishList } = wishListSlice.actions;
export default wishListSlice.reducer;
