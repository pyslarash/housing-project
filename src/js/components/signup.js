import * as React from 'react';
import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { setToken, setUsername, setPassword, setLoggedIn, setEmail, setId, setTokenTime } from '../store/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { isTokenExpired } from "./utils/istokenexpired";

const API_URL = process.env.REACT_APP_BD_URL;

function Signup() {
  const dispatch = useDispatch();
  const token = useSelector(state => state.user.token);
  const username = useSelector(state => state.user.username);
  const password = useSelector(state => state.user.password);
  const loggedIn = useSelector(state => state.user.loggedIn);
  const email = useSelector(state => state.user.email);
  const id = useSelector(state => state.user.id);

  const navigate = useNavigate();

  useEffect(() => {
    if (token && isTokenExpired(token)) {
      dispatch(setLoggedIn(false));
      alert('Your session has expired. Please log in again.');
    }
  }, [dispatch, token]);

  const handleUsernameChange = (event) => {
    dispatch(setUsername(event.target.value));
  };



  const handlePasswordChange = (event) => {
    dispatch(setPassword(event.target.value));
  };

  useEffect(() => {
    console.log('user id:', id);
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${API_URL}/create_user`, {
        email,
        username,
        password,
        type: 'user'
      });
      if (response.status === 200) {
        dispatch(setToken(response.data.access_token));
        dispatch(setTokenTime(response.data.expiration_time));
        console.log("My token: ", response.data.access_token)
        dispatch(setLoggedIn(true));
        navigate('/profile');

        // redirect to the home page or any other authenticated page        
      };
      dispatch(setId(response.data.user.id));
      // handle successful response
    } catch (error) {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        // log user out
        console.log(error);
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        navigate('/signup');
      } else {
        // handle other errors
        console.log(error.response.data.message);
      }
    }
  };


  // Validating email
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return "Invalid email";
    }
  };

  const checkEmailExistence = async (email) => {
    try {
      const response = await axios.get(`${API_URL}/check_email`, {
        params: { email }
      });
      return response.data.exists;
    } catch (error) {
      console.log(error);
      // handle error
    }
  };

  const [emailError, setEmailError] = useState("");
  const [emailExists, setEmailExists] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);

  const handleEmailChange = (event) => {
    dispatch(setEmail(event.target.value));
    setEmailError(validateEmail(event.target.value));
  };

  const handleEmailBlur = async () => {
    setEmailTouched(true);
    const exists = await checkEmailExistence(email);
    setEmailExists(exists);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '30px',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Sign Up
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          maxWidth: '400px',
          '& .MuiTextField-root': {
            margin: '10px 0',
          },
          '& .MuiButton-root': {
            margin: '20px 0',
          },
        }}
      >
        <TextField
          required
          fullWidth
          id="username"
          label="Username"
          value={username}
          onChange={handleUsernameChange}
        />
        <TextField
          required
          fullWidth
          id="email"
          label="Email"
          value={email}
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
          error={emailError || emailExists}
          helperText={
            emailError
              ? 'Please enter a valid email address'
              : emailExists
                ? 'This email is already in use'
                : ''
          }
        />

        <TextField
          required
          fullWidth
          type="password"
          id="password"
          label="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          Sign Up
        </Button>
      </Box>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Already have an account?{' '}
        <Link to="/login">Log in here</Link>
      </Typography>
    </Box>
  );
}

export default Signup;
