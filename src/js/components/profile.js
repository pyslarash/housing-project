import React from 'react';
import { useEffect, useState } from 'react';
import { Box, Grid, Typography, Container } from '@mui/material';
import Favorites from './favorites';
import { useDispatch, useSelector } from 'react-redux';
import { setToken, setId, setLoggedIn } from '../store/userSlice';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Table, TableCell, TableContainer, TableRow, Paper } from '@mui/material';
import ProfileTable from './sub-components/profile-table';
import avatar_pic from "../../img/avatars/locationpropic.png"
import Button from '@mui/material/Button';

const API_URL = process.env.REACT_APP_BD_URL;

const Profile = () => {
  const token = useSelector(state => state.user.token);
  const id = useSelector(state => state.user.id);

  const [data, setData] = useState({});
  const navigate = useNavigate(); // add this line to replace useHistory

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${API_URL}/users/${id}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  let setProfileImage = null;

  if (data.profile_pic) {
    console.log("data: ", data)
    console.log("data.profile_pic: ", data.profile_pic);
    const imageFolder = "./avatars/";
    const imageFile = data.profile_pic;
    const imagePath = imageFolder + imageFile;
    setProfileImage = require(`${imagePath}`);
  }

  const handleUpdateClick = () => {
    navigate('/profile/edit'); // use navigate to go to the edit-profile page
  }

  return (
    <Container maxWidth="xl">

      <Typography component='h1' variant='h3' sx={{ textAlign: 'center', margin: '20px' }}>
        {data.first_name ? (data.first_name === "Captain" ? `Ahoy, ${data.first_name}` : `Welcome,  ${data.first_name}`) : "Welcome, Stranger"}
      </Typography>

      <Grid container spacing={3} sx={{ marginRight:'20px'}}>

        <Grid item xs={12} sm={6} md={3} sx={{ textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <Avatar
            alt="Avatar"
            src={setProfileImage ? setProfileImage : avatar_pic}
            sx={{ width: '250px', height: '250px', marginBottom: '20px', justifyContent: 'center' }}
          />
          <Button onClick={handleUpdateClick} variant="outlined">Edit Profile</Button>
        </Grid>

        <Grid item xs={12} sm={6} md={9} sx={{ justifyContent: 'top' }}>
          <Paper  sx={{ width: '100%', justifyContent: 'center', maxWidth: 'none' }}>
            <ProfileTable email={data.email} username={data.username} first_name={data.first_name} last_name={data.last_name} info={data.info} />
          </Paper>
        </Grid>

        <Grid item xs={12} s={12} md={12} sx={{ width: '100%', maxWidth: 'none' }}>
          <Favorites userId={id} token={token} />
        </Grid>

      </Grid>

    </Container>
  )
}

export default Profile;
