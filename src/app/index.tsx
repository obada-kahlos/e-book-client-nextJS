import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../api/api-slice";
import authSlice from "./slices/authSlice";
import wishListSlice from "./slices/wishList.slice";
import cartSlice from "./slices/cart.slice";
import userSlice from "./slices/user.slice";
import searchSlice from "./slices/search.slice";
import { booksListSlice } from "./slices/books-list.slice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,

    auth: authSlice,

    wishList: wishListSlice,

    cart: cartSlice,

    user: userSlice,

    search: searchSlice,

    booksListSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
