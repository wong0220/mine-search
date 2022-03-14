import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const mineSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
});

export const { increment } = mineSlice.actions;

export default mineSlice.reducer;
