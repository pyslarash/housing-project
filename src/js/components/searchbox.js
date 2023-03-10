import React from 'react';
import { Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MinMax from './sub-components/minmax';
import TextField from './sub-components/textfield';
import Checkmark from './sub-components/checkmark';
import Dropdown from './sub-components/dropdown';
import SelectMany from './sub-components/select-many';

const arrayCheck = ["Uno", "Dos", "Tres"];
const arrayCheck2 = ["Raz", "Dva", "Tri"];

const SearchBox = () => {
    
    return (
      <>
        <Typography variant="h2" component="h1">
            Find Your City!
        </Typography>
        <Paper sx={{ width: '100%', p: 3, marginTop: '30px' }} elevation={3}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-evenly', // reduce margins between columns
          flexWrap: 'wrap', // wrap columns to next line if necessary
          flexDirection: 'row', // default value for larger screens
          '@media screen and (max-width: 600px)': { // change to column layout for smaller screens
            flexDirection: 'column'
          }
        }}>
            <Box sx={{ width: '30%', margin: '10px' }}>
              {/* This column is responsible for the City Level*/}
              <Typography variant="h5" component="h2">
                City
              </Typography>
                <MinMax name="City Population" questionMarkText="Enter minimum and maximum size for the city population" minValue="1000000" maxValue="3000000" isNACheckedProp={false} />
                <TextField name="Min brewerites per cap" questionMarkText="Enter minimum breweries per capita" minValue="2" />
                <Checkmark name="Is Foodie" questionMarkText="Search in foodie towns" />
                <Dropdown name="Testing Array" questionMarkText="Let's do some testing, bro!" listArray={arrayCheck2} />
                <SelectMany name="Testing Array 2" questionMarkText="Let's do some multiple testing, bro!" listArray={arrayCheck} />
            </Box>          
            <Box sx={{ width: '30%', margin: '10px' }}>
              {/* This column is responsible for the Metro Level*/}
              <Typography variant="h5" component="h2">
                Metro
              </Typography>
              
            </Box>
            <Box sx={{ width: '30%', margin: '10px' }}>
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