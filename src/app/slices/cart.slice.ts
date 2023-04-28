import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  count: number | undefined;
}

const initialState = { count: 0 } as CounterState;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartCount(state) {
      const ids =
        typeof window !== "undefined"
          ? (JSON.parse(localStorage.getItem("myIds") || "[]") as number[])
          : null;
      state.count = ids?.length;
    },
    resetCartCount(state) {
      state.count = 0;
    },
    incrementCart(state, action) {
      state.count = action.payload;
    },
    decrementCart(state, action) {
      state.count = action.payload;
    },
  },
});

export const { setCartCount, incrementCart, decrementCart, resetCartCount } =
  cartSlice.actions;
export default cartSlice.reducer;
