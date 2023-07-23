import React, { useContext, useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import userSlice, { setToken, setMessage, setUsername, setPassword, setLoggedIn, setId, setTokenTime } from "../store/userSlice";
import { isTokenExpired } from "./utils/istokenexpired";
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_BD_URL;


const Login = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.user.token);
  const message = useSelector(state => state.user.message);
  const username = useSelector(state => state.user.username);
  const password = useSelector(state => state.user.password);
  const loggedIn = useSelector(state => state.user.loggedIn);
  const id = useSelector(state => state.user.id);
  const navigate = useNavigate();

  useEffect(() => {
    if (token && isTokenExpired(token)) {
      dispatch(setLoggedIn(false));
      alert('Your session has expired. Please log in again.');
    }
  }, [dispatch, token]);

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post(`${API_URL}/login`, {
        username,
        password,
      });
      if (response.status === 200) {
        dispatch(setToken(response.data.access_token));
        dispatch(setTokenTime(response.data.expiration_time));
        console.log("Data: ", response.data);        
        dispatch(setLoggedIn(true));
        navigate('/profile');// redirect to the home page or any other authenticated page             
      };
      dispatch(setId(response.data.user.id));
      console.log("user id: ", id);   
    } catch (error) {
      console.log(error.response);
      alert("There has been an error!");
    }    
  }

  return (
    <Box sx={{ m: 3 }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        Login
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ maxWidth: '50%' }}>
          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 2 }}>
              <TextField
                required
                fullWidth
                id="username"
                label="Username"
                value={username}
                onChange={(event) => dispatch(setUsername(event.target.value))}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <TextField
                required
                fullWidth
                type="password"
                id="password"
                label="Password"
                value={password}
                onChange={(event) => dispatch(setPassword(event.target.value))}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <Button type="submit" variant="contained" color="primary">
                Login
              </Button>
            </Box>
          </form>
          <Typography variant="body1">
            Don't have an account?{' '}
            <Link to="/signup" sx={{ textDecoration: 'none' }}>
              Sign up here
            </Link>
            .
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
