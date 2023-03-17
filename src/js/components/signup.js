import * as React from 'react';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function Signup() {
  const [username, setUsername] =useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the signup logic here, such as sending a signup request to the backend API
    console.log('Signup clicked');
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
