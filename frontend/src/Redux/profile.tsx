import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: ""
  },
  reducers: {
    set: (state, action) => {
      state.profile = action.payload
    },
  }
});

// Action creators are generated for each case reducer function
export const { set } = profileSlice.actions;

export default profileSlice.reducer;
