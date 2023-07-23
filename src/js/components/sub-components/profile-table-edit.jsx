import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { TextField, Button } from '@mui/material';
import { useState, useEffect } from 'react';


const API_URL = process.env.REACT_APP_BD_URL;

const ProfileTable = ({  }) => {
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
    <TableContainer>
      <Table>
        <TableRow>
          <TableCell>
            <Typography variant="subtitle1">Email:</Typography>
          </TableCell>
          <TableCell>
            <Typography variant="subtitle1"><TextField
            size="small"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
            /></Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Typography variant="subtitle1">Username:</Typography>
          </TableCell>
          <TableCell>
            <Typography variant="subtitle1"><TextField
            size="small"
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              required
            /></Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Typography variant="subtitle1">First Name:</Typography>
          </TableCell>
          <TableCell>
            <Typography variant="subtitle1"><TextField
            size="small"
              label="First Name"
              variant="outlined"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              fullWidth
              required
            /></Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Typography variant="subtitle1">Last Name:</Typography>
          </TableCell>
          <TableCell>
            <Typography variant="subtitle1"><TextField
            size="small"
              label="Last Name"
              variant="outlined"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              fullWidth
              required
            /></Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Typography variant="subtitle1">Info:</Typography>
          </TableCell>
          <TableCell>
            <Typography variant="subtitle1"><TextField
            size="small"
              label="Info"
              variant="outlined"
              value={info}
              onChange={(e) => setInfo(e.target.value)}
              fullWidth
              required
            /></Typography>
          </TableCell>
        </TableRow>
      </Table>
    </TableContainer>
  )
}

export default ProfileTable;