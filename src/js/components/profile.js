import * as React from 'react';
import { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { setToken, setId } from '../store/userSlice';
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

const API_URL = process.env.REACT_APP_BD_URL;

const Profile = () => {
  const token = useSelector(state => state.user.token);
  const id = useSelector(state => state.user.id);

  const [data, setData] = useState({});

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

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
      <Stack direction="row" spacing={2} sx={{ marginLeft: '60px', marginTop: '30px' }}>
        <Avatar
          alt="Avatar"
          src="/static/images/avatar.jpg"
          sx={{ width: 200, height: 200 }}
        />
      </Stack>
      <Grid container direction="row" alignItems="center" justifyContent="center" spacing={2}>
        <Grid item>
          <table>
            <tbody>
              <tr>
                <td>Email:</td>
                <td>{data.email}</td>
              </tr>
              <tr>
                <td>Username:</td>
                <td>{data.username}</td>
              </tr>
              <tr>
                <td>Profile Picture:</td>
                <td>{data.profile_picture}</td>
              </tr>
              <tr>
                <td>First Name:</td>
                <td>{data.first_name}</td>
              </tr>
              <tr>
                <td>Last Name:</td>
                <td>{data.last_name}</td>
              </tr>
              <tr>
                <td>Info:</td>
                <td>{data.info}</td>
              </tr>
              {/* Add more rows for other data */}
            </tbody>
          </table>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Profile;
