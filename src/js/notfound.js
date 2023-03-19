// This page shows up when 404 Not Found happens
import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import notfoundImage from "../img/notfound.png";

const NotFound = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Grid container direction="column" alignItems="center" justifyContent="center" spacing={2}>
                <Grid item>
                    <Typography variant="h1" sx={{ marginBottom: '1rem', textAlign: 'center', marginTop: '50px', fontWeight: 'bold' }}>
                        404
                    </Typography>
                </Grid>
                <Grid item>
                    <img src={notfoundImage} alt="404 not found" style={{ maxWidth: '100%', height: 'auto', width: '800px' }} />
                </Grid>
                <Grid item>
                    <Typography variant="h4" sx={{ textAlign: 'center', marginTop: '30px' }}>
                        It looks like we've got lost and can't find what you are looking for.
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    )
}

export default NotFound;