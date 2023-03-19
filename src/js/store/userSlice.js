import { createSlice } from '@reduxjs/toolkit';

// Here we are storing the search results and the state of the Results table
export const userSlice = createSlice({
    name: 'user',
    initialState: {
        token: null,
        username: '',
        password: '',
        email: '',
        message: null,
        loggedIn: false,
    },
    reducers: {
      setToken: (state, action) => {
        state.token = action.payload;
      },
      setMessage: (state, action) => {
        state.message = action.payload;
      },
      setUsername: (state, action) => {
        state.username = action.payload;
      },
      setPassword: (state, action) => {
        state.password = action.payload;
      },
      setEmail: (state, action) => {
        state.email = action.payload;
      },
      setLoggedIn: (state, action) => {
        state.loggedIn = action.payload;
      }
    },
  });
  
  export const { setToken, setMessage, setUsername, setPassword, setLoggedIn, setEmail } = userSlice.actions;
  
  export default userSlice.reducer;