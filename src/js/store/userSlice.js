import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: localStorage.getItem('token'),
    tokenTime: localStorage.getItem('expirationTime'),
    username: localStorage.getItem('username'),
    password: localStorage.getItem('password'),
    email: localStorage.getItem('email'),
    message: '',
    loggedIn: false,
    id: localStorage.getItem('id'),
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },
    setTokenTime: (state, action) => {
      state.tokenTime = action.payload;
      localStorage.setItem('tokenTime', action.payload);
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
      localStorage.setItem('loggedIn', action.payload);
    },
    setId: (state, action) => {
      state.id = action.payload;
      localStorage.setItem('id', action.payload);
    },
  },
});

export const {
  setToken,
  setTokenTime,
  setMessage,
  setUsername,
  setPassword,
  setLoggedIn,
  setEmail,
  setId,
} = userSlice.actions;

export default userSlice.reducer;
