import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetails: {},
};

export const userDetailSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    updateUserDetails: (state, action) => {
      state.userDetails = { ...action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUserDetails } = userDetailSlice.actions;

export default userDetailSlice.reducer;
