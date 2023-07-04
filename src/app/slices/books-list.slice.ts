import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface BooksState {
  bookList: object[];
}

const initialState: BooksState = {
  bookList: [],
};

export const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setBookList: (state, action) => {
      state.bookList = action.payload;
    },
    addBookItem: (state, action) => {
      state.bookList.push(action.payload);
    },
    resetBookList: (state) => {
      state.bookList = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { setBookList, addBookItem, resetBookList } = bookSlice.actions;

export const booksListSlice = bookSlice.reducer;
