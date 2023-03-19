import { useState } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BD_URL;

const Login = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameOrEmailChange = (event) => {
    setUsernameOrEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Send login request to backend API using axios
    axios.post(`${API_URL}/login`, {
      username: usernameOrEmail,
      password: password
    })
      .then((response) => {
        if (response.status === 200) {
          // If the login request is successful, set the access token in the local storage and redirect to the home page
          localStorage.setItem('access_token', response.data.access_token);
          window.location.href = '/';
        } else {
          // If the login request fails, display an error message
          console.log(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
                id="usernameOrEmail"
                label="Username or Email"
                value={usernameOrEmail}
                onChange={handleUsernameOrEmailChange}
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

export default Login;
