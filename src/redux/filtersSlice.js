import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState/initialState";

const filterSlice = createSlice({
  name: "filters",
  initialState: initialState,
  reducers: {
    changeFilter(state, action) {
        state.filters.name = action.payload
    },
  },
});
export const { changeFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
