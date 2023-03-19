// This page shows up when 404 Not Found happens
import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import notfoundImage from "../../img/notfound.png"
import userSlice, { setToken, setMessage, setUsername, setPassword, setLoggedIn, setId } from "../store/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Favorites = () => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.user.token);
    const message = useSelector(state => state.user.message);
    const username = useSelector(state => state.user.username);
    const password = useSelector(state => state.user.password);
    const loggedIn = useSelector(state => state.user.loggedIn);
    const id = useSelector(state => state.user.id);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Grid container direction="column" alignItems="center" justifyContent="center" spacing={2}>
                <Grid item>
                    <Typography variant="h1" sx={{ marginBottom: '1rem', textAlign: 'center', marginTop: '50px', fontWeight: 'bold' }}>
                        Favorites
                    </Typography>
                </Grid>
                <Grid item>
                    <img src={notfoundImage} alt="404 not found" style={{ maxWidth: '100%', height: 'auto', width: '800px' }} />
                </Grid>
                <Grid item>
                    <Typography variant="h4" sx={{ textAlign: 'center', marginTop: '30px' }}>
                        This is the favorites page!
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Favorites;