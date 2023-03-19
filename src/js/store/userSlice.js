import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token'),
  username: localStorage.getItem('username'),
  password: localStorage.getItem('password'),
  email: localStorage.getItem('email'),
  message: null,
  loggedIn: false,
  id: localStorage.getItem('id'),
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
      localStorage.setItem('username', action.payload);
    },
    setPassword: (state, action) => {
      state.password = action.payload;
      localStorage.setItem('password', action.payload);
    },
    setEmail: (state, action) => {
      state.email = action.payload;
      localStorage.setItem('email', action.payload);
    },
    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
      localStorage.setItem('id', action.payload);
    },
  },
});

export const {
  setToken,
  setMessage,
  setUsername,
  setPassword,
  setLoggedIn,
  setEmail,
  setId,
} = userSlice.actions;

export default userSlice.reducer;
