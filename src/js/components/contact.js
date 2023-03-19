import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ReCAPTCHA from 'react-google-recaptcha';

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [captchaResponse, setCaptchaResponse] = useState('');

    const RECAPTCHA_SITE_KEY = "6LeA0hIlAAAAABWokI6PvCUWI2zpDQz8ULMrAugq";
    const RECAPTCHA_SECRET_KEY = "6LeA0hIlAAAAAMJC1a6UpUgjmZQi2UbK_585FTrc";

    const handleCaptchaChange = (value) => {
      setCaptchaResponse(value);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          message,
          captchaResponse
        })
      });
      const data = await response.json();
      console.log(data);
      setName('');
      setEmail('');
      setMessage('');
      setCaptchaResponse('');
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
                <ReCAPTCHA
                    sitekey="YOUR_RECAPTCHA_SITE_KEY"
                    onChange={handleCaptchaChange}
                />
                <Button variant="contained" type="submit">
                    Send
                </Button>
            </Box>
        </Box>
    );
};

export default Contact;
