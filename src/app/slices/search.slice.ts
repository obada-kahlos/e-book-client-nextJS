import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  search: string;
}

const initialState = { search: "" } as SearchState;

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    resetSearch(state) {
      state.search = "";
    },
  },
});

export const { setSearchValue, resetSearch } = searchSlice.actions;
export default searchSlice.reducer;
