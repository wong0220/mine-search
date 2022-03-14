import { configureStore } from "@reduxjs/toolkit";
import mineReducer from "../features/mine/mineSlice";

export const store = configureStore({
  reducer: {
    mine: mineReducer,
  },
});
