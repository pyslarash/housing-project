import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';


function Signup() {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      await axios.post('http://localhost:5000/create_user', {
        username,
        email,
        password,
        type: 'user',
      });
  
      console.log('User created successfully');
      window.location.href = '/login';
    } catch (error) {
      if (error.response.status === 400 && error.response.data.message === 'Username or email already exists') {
        alert('Username or email already exists');
        console.log('Username or email already exists');
      } else {
        console.log(error.response.data.message);
      }
    }
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
