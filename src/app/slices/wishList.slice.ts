import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface wishListProps {
  authors: [""];
  description: string;
  genreType: string;
  id: number;
  image: string;
  language: string;
  numberPages: number;
  price: string;
  publicationDate: string;
  publishers: string;
  quantity: number;
  title: string;
}
interface WishState {
  toggle: boolean;
  count: number | undefined;
  wishLists: wishListProps[];
}

const initialState = { toggle: false, count: 0, wishLists: [] } as WishState;

const wishListSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishList(state) {
      state.toggle = !state.toggle;
    },
    setWishCount(state) {
      const localWishList =
        typeof window !== "undefined"
          ? (JSON.parse(
              localStorage.getItem("wishList") || "[]"
            ) as wishListProps[])
          : null;
      state.count = localWishList?.length;
    },
    resetWishCount(state) {
      state.count = 0;
    },
    incrementWish(state, action) {
      state.count = action.payload;
    },
    decrementWish(state, action) {
      state.count = action.payload;
    },
    setWishList(state) {
      const localWishList =
        typeof window !== "undefined"
          ? JSON.parse(localStorage.getItem("wishList") || "[]")
          : null;
      state.wishLists = localWishList;
    },
    addToWishList(state, action) {
      state.wishLists.push(action.payload);
    },
    removeItemWishList(state, action) {
      state.wishLists = state.wishLists.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const {
  toggleWishList,
  decrementWish,
  incrementWish,
  setWishCount,
  setWishList,
  removeItemWishList,
  resetWishCount,
  // addToWishList,
} = wishListSlice.actions;
export default wishListSlice.reducer;
