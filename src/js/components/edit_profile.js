import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { TextField, Button } from '@mui/material'; // Add this line

const API_URL = process.env.REACT_APP_BD_URL;

const EditProfile = () => {
  const token = useSelector(state => state.user.token);
  const id = useSelector(state => state.user.id);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [info, setInfo] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${API_URL}/users/${id}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        const user = response.data;
        setUsername(user.username);
        setEmail(user.email);
        setProfilePic(user.profile_picture);
        setFirstName(user.first_name);
        setLastName(user.last_name);
        setInfo(user.info);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`${API_URL}/users/${id}`, {
        username,
        email,
        profile_picture: profilePic,
        first_name: firstName,
        last_name: lastName,
        info,
      }, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      console.log(response.data);
      // handle success
    } catch (error) {
      console.log(error);
      // handle error
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', ml: 10, mr: 10 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mr: 10 }}>
        <Avatar
          alt="Avatar"
          src="/static/images/avatar.jpg"
          sx={{ width: 200, height: 200, mt: 4 }}
        />
      </Box>
      <Box component="form" sx={{ mt: 4, flexGrow: 1 }} onSubmit={handleUpdate}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <TextField
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item>
            <TextField
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item>
            <TextField
              label="Profile Picture"
              variant="outlined"
              value={profilePic}
              onChange={(e) => setProfilePic(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item>
            <TextField
              label="First Name"
              variant="outlined"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item>
            <TextField
              label="Last Name"
              variant="outlined"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item>
            <TextField
              label="Info"
              variant="outlined"
              value={info}
              onChange={(e) => setInfo(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" type="submit">
              Update
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
  
  }

  export default EditProfile
     
