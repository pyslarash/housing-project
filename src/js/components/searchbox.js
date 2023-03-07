import React from 'react';
import { Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


const SearchBox = () => {
    
    return (
      <>
        <Typography variant="h2" component="h1">
            Find Your City!
        </Typography>
        <Paper sx={{ width: '100%', p: 5 }} elevation={1}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ width: '30%' }}>
              {/* This column is responsible for the City Level*/}
              <Typography variant="h5" component="h2">
                City
              </Typography>
              
            </Box>          
            <Box sx={{ width: '30%' }}>
              {/* This column is responsible for the Metro Level*/}
              <Typography variant="h5" component="h2">
                Metro
              </Typography>
              
            </Box>
            <Box sx={{ width: '30%' }}>
              {/* This column is responsible for the State Level*/}
              <Typography variant="h5" component="h2">
                State
              </Typography>
              
            </Box>
          </Box>
        </Paper>
      </>
    );
}
export default SearchBox;