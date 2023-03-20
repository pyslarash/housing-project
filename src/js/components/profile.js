import * as React from 'react';
import { useEffect, useState } from 'react';
import { Box, Grid, Typography, Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

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
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
      <Stack direction="row" spacing={2} sx={{ marginLeft: '60px', marginTop: '30px' }}>
        <Avatar
          alt="Avatar"
          src="/static/images/avatar.jpg"
          sx={{ width: 200, height: 200 }}
        />
      </Stack>
      <Box sx={{ ml: '60px', mt: '30px', width: '600px'}}>
        <table sx={{ width: '100%' }}>
          <tbody>
            <tr>
              <td sx={{ width: '150px' }}>Email:</td>
              <td>{data.email}</td>
            </tr>
            <tr>
              <td sx={{ width: '150px' }}>Username:</td>
              <td>{data.username}</td>
            </tr>
            <tr>
              <td sx={{ width: '150px' }}>Profile Picture:</td>
              <td>{data.profile_picture}</td>
            </tr>
            <tr>
              <td sx={{ width: '150px' }}>First Name:</td>
              <td>{data.first_name}</td>
            </tr>
            <tr>
              <td sx={{ width: '150px' }}>Last Name:</td>
              <td>{data.last_name}</td>
            </tr>
            <tr>
              <td sx={{ width: '150px' }}>Info:</td>
              <td>{data.info}</td>
            </tr>
            {/* Add more rows for other data */}
            <tr>
              <td colSpan="2" sx={{ textAlign: 'center', pt: '20px' }}><Button variant="contained" onClick={handleUpdateClick}>Edit Profile</Button></td>
            </tr>
          </tbody>
        </table>
      </Box>
    </Box>
  );
}

export default Profile;
