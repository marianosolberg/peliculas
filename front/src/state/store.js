import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import usersReducer from "./user";
import movieReducer from "./movies";
import favoritoReducer from "./favorites";
const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: {
    users: usersReducer,
    movies: movieReducer,
    favorites: favoritoReducer,
  },
});
export default store;
