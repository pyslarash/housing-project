import React, { useContext, useState } from "react";
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import injectContext, { Context } from "../store/appContext";

const API_URL = "http://localhost:5000";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { actions } = useContext(Context);

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/login`, {
        username,
        password,
      });
      if (response.status === 200) {
        actions.setLoggedIn(true);
        // redirect to the home page or any other authenticated page
      }
    } catch (error) {
      console.log(error);
      alert("There has been an error!");
    }
  };

  const renderLoginForm = () => {
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
                  onChange={handleUsername}
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
                  onChange={handlePasswordChange}
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

  return renderLoginForm();
};

export default injectContext(Login);


