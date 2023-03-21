import React from 'react';
import { useEffect, useState } from 'react';
import Favorites from './favorites';
import { useDispatch, useSelector } from 'react-redux';
import { setToken, setId, setLoggedIn } from '../store/userSlice';
import Avatar from '@mui/material/Avatar';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Table, TableCell, TableContainer, TableRow, Paper, TextField, Button, Typography, Box, Grid } from '@mui/material';
import ProfileTable from './sub-components/profile-table';
import ProfileTableEdit from './sub-components/profile-table-edit';
import avatar_pic from "../../img/avatars/locationpropic.png";
import Dropzone from 'react-dropzone';
import { styled } from '@mui/material/styles';
import { Cropper } from 'react-easy-crop';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import { v4 as uuidv4 } from 'uuid';

const API_URL = process.env.REACT_APP_BD_URL;

const EditProfile = () => {
  const token = useSelector(state => state.user.token);
  const id = useSelector(state => state.user.id);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [profilePicName, setProfilePicName] = useState("");
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
        profile_pic: profilePicName,
        first_name: firstName,
        last_name: lastName,
        info,
      }, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      // handle success
      console.log("Handle Update: ", response.data);
      // Save the file if there's a new file selected
      if (selectedFile) {
        await saveFile(selectedFile, profilePicName);
      }
    } catch (error) {
      console.log(error);
      // handle error
    }
  };

  const saveFile = async (file, filename) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('filename', filename);
      const response = await axios.post(`${API_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log("Save File: ", response.data);
      // handle success
    } catch (error) {
      console.log(error);
      // handle error
    }
  };

  const handleGoBack = () => {
    navigate('/profile'); // use navigate to go to the edit-profile page
  }
  

  const [data, setData] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate(); // add this line to replace useHistory

  const [src, setSrc] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const DropzoneContainer = styled('div')(({ theme, isDragActive }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '250px',
    height: '250px',
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    padding: '30px',
    border: `3px dashed ${isDragActive ? theme.palette.secondary.main : 'white'}`,
    cursor: 'pointer',
    transition: 'border-color 0.2s ease-out',
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      border: `3px dashed ${theme.palette.secondary.main}`,
    }
  }));

  const handleFileDrop = (acceptedFiles) => {
    if (
      acceptedFiles.length === 1 &&
      acceptedFiles[0].type === 'image/jpeg' &&
      acceptedFiles[0].size <= 1048576
    ) {
      const file = acceptedFiles[0];
      const extension = file.name.split('.').pop();
      const filename = `${uuidv4()}.${extension}`;
      setProfilePicName(filename);

      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onloadend = () => {
        const base64String = fileReader.result;
        // Set the base64 string as the source for your image preview
        setSrc(base64String);
        // Automatically crop the image to 1x1 in the center
        const image = new Image();
        image.src = base64String;
        image.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const maxSize = Math.max(image.width, image.height);
          canvas.width = maxSize;
          canvas.height = maxSize;
          ctx.drawImage(image, maxSize / 2 - image.width / 2, maxSize / 2 - image.height / 2);
          const croppedImage = canvas.toDataURL('image/jpeg');
          setCroppedImage(croppedImage);
        };
      };
      setSelectedFile(file);
    } else {
      // File does not meet requirements
      alert('File must be a .jpg file and no larger than 1MB.')
    }
  };

  useEffect(() => {
    console.log("profilePic: ", profilePic);
  }, [src]);


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

  return (
    <Box sx={{ mb: 4 }}>
      <Typography component='h1' variant='h3' sx={{ textAlign: 'center', margin: '20px' }}>Edit Profile</Typography>
      <Grid item>
        <Grid container item sx={{ display: 'flex' }}>
          <Grid xs={12} s={4} md={2} item container sx={{ justifyContent: 'center', margin: '20px', alignItems: 'center', flexDirection: 'column', width: '100%' }}>
            <Dropzone onDrop={handleFileDrop}>
              {({ getRootProps, getInputProps, isDragActive }) => (
                <DropzoneContainer {...getRootProps()} isDragActive={isDragActive}>
                  <input {...getInputProps()} />
                  {!src && (
                    <>
                      <Typography textAlign='center'>Drag 'n' drop some files here, or click to select files.</Typography>
                      <Typography textAlign='center'>JPG up to 1MB.</Typography>
                    </>
                  )}
                  {src && (
                    <Avatar
                      alt="Avatar"
                      src={src}
                      sx={{ width: '250px', height: '250px', marginBottom: '20px' }}
                    />
                  )}
                </DropzoneContainer>
              )}
            </Dropzone>
            <Button onClick={handleUpdate} sx={{ marginTop: '20px' }} variant="outlined">Save Profile</Button>
            <Button onClick={handleGoBack} sx={{ marginTop: '20px' }} variant="outlined">Go Back</Button>
          </Grid>
          <Grid item xs={12} s={8} md={10} container sx={{ flexGrow: 1, textAlign: 'right', justifyContent: 'top', alignItems: 'right', width: '100%' }}>
            <Paper sx={{ width: '100%', justifyContent: 'center', margin: '20px' }}>
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
            </Paper>
          </Grid>
        </Grid>
        <Grid item sx={{ margin: '20px', flexShrink: 0 }}>
          <Favorites userId={id} token={token} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default EditProfile;
