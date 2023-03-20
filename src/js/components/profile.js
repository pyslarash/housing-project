// This page shows up when 404 Not Found happens
import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import notfoundImage from "../../img/notfound.png";
import Favorites from './favorites';
import { useDispatch, useSelector } from 'react-redux';
import { setToken, setId, setLoggedIn } from '../store/userSlice';

const Profile = () => {
    const token = useSelector(state => state.user.token);
    const id = useSelector(state => state.user.id);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100vh',
            '@media (min-width: 1024px)': { // big screens
                width: '60%',
                marginLeft: 'auto',
                marginRight: 'auto',
            }
        }}>
            <Grid container direction="column" alignItems="center" justifyContent="center" spacing={2}>
                <Favorites userId={id} token={token} />
            </Grid>
        </Box>
    )
}

export default Profile;