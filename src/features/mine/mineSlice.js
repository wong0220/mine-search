import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  level: "",
};

export const mineSlice = createSlice({
  name: "mine",
  initialState,
  reducers: {
    SetLevel: (state, action) => {
      state.level = action.payload;
    },
  },
});

export const { SetLevel } = mineSlice.actions;

export default mineSlice.reducer;
