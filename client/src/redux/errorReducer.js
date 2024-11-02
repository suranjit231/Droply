// redux/errorReducer.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  errorMessage: null,
};

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setError(state, action) {
      state.errorMessage = action.payload;
    },
    clearError(state) {
      state.errorMessage = null;
    },
  },
});

export const { setError, clearError } = errorSlice.actions;
export const errorSelector = (state) => state.errorReducer;
export const errorReducer = errorSlice.reducer;