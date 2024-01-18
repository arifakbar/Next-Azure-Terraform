import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sid: null,
};

export const subscriptionSlice = createSlice({
  name: "sub",
  initialState,
  reducers: {
    change: (state, action) => {
      state.sid = action.payload;
    },
  },
});

export const { state } = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
