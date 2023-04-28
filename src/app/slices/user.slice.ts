import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface profileDataProps {
  profileData: {
    address: string;
    email: string;
    firstName: string;
    gender: string;
    id: string;
    lastName: string;
    phoneNumber: string;
    profilePhoto: null;
    userName: string;
  } | null;
  isOpen: boolean;
  isEdit: boolean;
}

const initialState = {
  profileData: {},
  isOpen: false,
  isEdit: false,
} as profileDataProps;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setProfileData: (state, action) => {
      state.profileData = action.payload;
    },
    resetProfileData: (state, action) => {
      state.profileData = action.payload;
    },
    toggleIsOpen: (state, action) => {
      state.isOpen = action.payload;
    },
    toggleIsEdit: (state, action) => {
      state.isEdit = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { setProfileData, toggleIsOpen, resetProfileData, toggleIsEdit } =
  userSlice.actions;
