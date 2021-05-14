import {
  createAction,
  createReducer,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";
export const setMovie = createAction("MOVIE");

export const addToFavorite = createAsyncThunk(
  "ADD_TO_FAVORITE",
  ({ mov, userId }) => {
    return axios
      .post("http://localhost:8000/api/user/favorites", { mov, userId })
      .then((res) => {
        return res.data;
      });
  }
);
// para borrar siempre ruta delete y se envia datos por params
export const removeToFavorite = createAsyncThunk(
  "REMOVE_TO_FAVORITE",
  ({ mov, userId }) => {
    return axios
      .delete(`http://localhost:8000/api/user/${userId}/delete/${mov}`)
      .then((res) => {
        // console.log(res, "res en stateeeeeeeeeeeee");
        return res.data;
      });
  }
);

export const allFavoritesUser = createAsyncThunk("ALL_FAVORITES_USER", (id) => {
  return axios
    .get(`http://localhost:8000/api/user/favorites/${id}`)
    .then((res) => {
      return res.data;
    });
});

const initialState = {
  add: [],
  delete: {},
  all: [],
};

const favoritoReducer = createReducer(initialState, {
  [addToFavorite.fulfilled]: (state, action) => {
    return { ...state, all: [...state.all, action.payload] };
  },

  [allFavoritesUser.fulfilled]: (state, action) => {
    return { ...state, all: action.payload };
  },
  [removeToFavorite.fulfilled]: (state, action) => {
    console.log(action.payload, "payloaaaaaaaaaaaaaaaaaaaaa");
    return {
      ...state,
      delete: action.payload,
    };
  },
});
export default favoritoReducer;
