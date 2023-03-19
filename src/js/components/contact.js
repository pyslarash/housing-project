import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState(null);

    const BACKEND_URL = process.env.REACT_APP_BD_URL;

    const handleSubmit = async (event) => {
        event.preventDefault();

        const emailResponse = await sendEmail(name, email, message);
        console.log('Email sending response:', emailResponse);

        if (emailResponse.status === 200) {
            setStatus('Email sent successfully');
        } else {
            setStatus('Error sending email');
        }

        setName('');
        setEmail('');
        setMessage('');
    };

    const sendEmail = async (name, email, message) => {
        const response = await axios.post(`${BACKEND_URL}/contact`, {
          name: name,
          email: email,
          message: message
        });
        console.log(response.data);
        return response;
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
                <Button variant="contained" type="submit" sx={{ marginTop: '5px'}}>
                    Send
                </Button>
            </Box>
            {status && (
                <Typography sx={{ marginTop: '10px' }}>
                    {status}
                </Typography>
            )}
        </Box>
    );
};

export default Contact;
