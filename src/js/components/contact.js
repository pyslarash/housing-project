import React, { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [token, setToken] = useState('');
    const recaptchaRef = useRef(null);

    const RECAPTCHA_SITE_KEY = process.env.REACT_APP_RECAPTCHA_SITE_KEY;
    const RECAPTCHA_SECRET_KEY = process.env.REACT_APP_RECAPTCHA_SECRET_KEY;

    const handleRecaptchaChange = (token) => {
      setToken(token);
      console.log('reCAPTCHA token:', token);
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
    
      const response = await verifyRecaptcha(token, RECAPTCHA_SECRET_KEY);
    
      console.log('reCAPTCHA verification response:', response);
    
      setName('');
      setEmail('');
      setMessage('');
      setToken('');
      recaptchaRef.current.reset();
    };

    const verifyRecaptcha = async (token) => {
      const url = 'https://www.google.com/recaptcha/api/siteverify';
      const secret = RECAPTCHA_SECRET_KEY;
      const response = await axios.post(url, null, {
        params: {
          secret: secret,
          response: token
        }
      });
      return response.data;
    };

    return (
        <Box sx={{ mx: 'auto', maxWidth: 600 }}>
            <Typography variant="h4" textAlign="center" sx={{ marginTop: '30px' }} gutterBottom>
                Contact Us
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
                <TextField
                    id="name"
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    id="email"
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    id="message"
                    label="Message"
                    multiline
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <ReCAPTCHA sitekey={RECAPTCHA_SITE_KEY} onChange={handleRecaptchaChange} />
                <Button variant="contained" type="submit" sx={{ marginTop: '5px'}}>
                    Send
                </Button>
            </Box>
        </Box>
    );
};

export default Contact;
