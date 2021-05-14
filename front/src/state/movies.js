import {
  createAction,
  createReducer,
  createAsyncThunk,
} from "@reduxjs/toolkit";

export const setMovie = createAction("MOVIE");

const movieReducer = createReducer([], {
  [setMovie]: (state, action) => action.payload,
});

export default movieReducer;
