import React from 'react';
import { useEffect, useState } from 'react';
import { Box, Grid, Typography, Button } from '@mui/material';
import Favorites from './favorites';
import { useDispatch, useSelector } from 'react-redux';
import { setToken, setId, setLoggedIn } from '../store/userSlice';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Table, TableCell, TableContainer, TableRow, Paper } from '@mui/material';

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
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  const handleUpdateClick = () => {
    navigate('/profile/edit'); // use navigate to go to the edit-profile page
  }

  return (

    <Box sx={{ mb: 4 }}>
      <Stack direction="row" spacing={2} sx={{ marginLeft: '60px', marginTop: '30px' }}>
        <Avatar
          alt="Avatar"
          src="/static/images/avatar.jpg"
          sx={{ width: 200, height: 200 }}
        />

      </Stack>
      <Grid container alignItems="center" justifyContent="space-between" sx={{ padding: '10px', mb: 4 }}>
        <Grid item xs={12} sm={6}>
          <Paper>
            <TableContainer>
              <Table>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle1">Email:</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1">{data.email}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle1">Username:</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1">{data.username}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle1">First Name:</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1">{data.first_name}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle1">Last Name:</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1">{data.info}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle1">Info:</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1">{data.cloudcover + '%'}</Typography>
                  </TableCell>
                </TableRow>
              </Table>
            </TableContainer>
          </Paper>
          <Button variant="contained" onClick={handleUpdateClick}>Edit Profile</Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper>
            <Favorites userId={id} token={token} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Profile;
