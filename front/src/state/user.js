import {
  createReducer,
  createAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";

export const logout = createAction("LOGOUT");

export const registerUser = createAsyncThunk("REGISTER_USER", (input) => {
  return axios
    .post("http://localhost:8000/api/register", input)
    .then((res) => res.data)
    .catch((e) => console.log(e));
});
//localStorage almacena pares clave-valor. Entonces, para almacenar un objeto javascript completo, primero debemos serializarlo (con JSON.stringify)

export const loginUser = createAsyncThunk("LOGIN_USER", (input) => {
  return axios
    .post("http://localhost:8000/api/login", input)
    .then((res) => {
      localStorage.setItem("token", JSON.stringify(res.data.token));
    })
    .catch((err) => console.log(err));
});

// para recuperarlo de la tienda y convertirlo en un objeto nuevamente:
//var user = JSON.parse (localStorage.getItem ('token'));
//aca tengo el usuario logueado
export const controlLogin = createAsyncThunk("CONTROL_LOGIN", () => {
  const loginToken = JSON.parse(localStorage.getItem("token"));
  return axios
    .get(`http://localhost:8000/api/me`, {
      headers: { Authorization: `Bearer ${loginToken}` },
    })
    .then((info) => {
      return info.data;
    })
    .catch((err) => console.log(err));
});

export const allUsers = createAsyncThunk("ALL_USERS", () => {
  return axios.get(`http://localhost:8000/api/user`).then((res) => {
    return res.data;
  });
});

// export const onlyUser = createAsyncThunk("ONLY_USER", (id) => {
//   return axios.get(`http://localhost:8000/api/user/${id}`).then((res) => {
//     console.log(res.data, "dataaaaaaaaa en redux");
//     return res.data;
//   });
// });
const initialState = {
  login: {},
  register: {},
  control: {},
  // only: {},
  allUser: [],
  logoutt: {},
};

const usersReducer = createReducer(initialState, {
  [loginUser.fulfilled]: (state, action) => {
    return { ...state, login: action.payload };
  },
  [registerUser.fulfilled]: (state, action) => {
    return { ...state, register: action.payload };
  },
  [controlLogin.fulfilled]: (state, action) => {
    return { ...state, control: action.payload };
  },
  // [onlyUser.fulfilled]: (state, action) => {
  //   return { ...state, only: action.payload };
  // },
  [allUsers.fulfilled]: (state, action) => {
    return { ...state, alluser: action.payload };
  },

  [logout]: (state, action) => {
    return { ...state, logoutt: action.payload };
  },
});
export default usersReducer;
