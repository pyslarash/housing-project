import React, {useState, useEffect} from 'react';
import { Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MinMax from './sub-components/minmax';
import TextField from './sub-components/textfield';
import Checkmark from './sub-components/checkmark';
import Dropdown from './sub-components/dropdown';
import SelectMany from './sub-components/select-many';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

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
              <Typography variant="h5" component="h2" sx={{ marginBottom: '15px' }}>
                City
              </Typography>
                <MinMax name="City Population" questionMarkText="Enter minimum and maximum size for the city population" columnName="city_population" />
                <MinMax name="City Density" questionMarkText="Enter minimum and maximum size for the city density" columnName="city_density" />
                <MinMax name="City Median Income" questionMarkText="Enter minimum and maximum amount for the city median income" columnName="city_median_income" />
                <MinMax name="City Violent Crime" questionMarkText="Enter minimum and maximum numbers for violent crimes per 100K" columnName="city_crime_violent" />
                <MinMax name="City Property Crime" questionMarkText="Enter minimum and maximum numbers for property crimes per 100K" columnName="city_crime_property" />
                <MinMax name="City 1 Bedroom Rent Cost" questionMarkText="Enter minimum and maximum values for an average one bedroom rent cost in the city area" columnName="city_one_br_price" />
                <MinMax name="City 2 Bedroom Rent Cost" questionMarkText="Enter minimum and maximum values for an average two bedroom rent cost in the city area" columnName="city_two_br_price" />
                <TextField name="Min Breweries" questionMarkText="Enter minimum amount of breweries you want in the city" columnName="city_num_of_brews" />
                    <Checkmark name="Is Foode" columnName="" questionMarkText="Would you like to search among the foodie towns?" />
                    <Checkmark name="Is Startup" columnName="" questionMarkText="Would you like to search among the towns best suitable for startups?" />
            </Box>          
            <Box sx={{ width: '30%', margin: '10px' }}>
              {/* This column is responsible for the Metro Level*/}
              <Typography variant="h5" component="h2" sx={{ marginBottom: '15px' }}>
                Metro
              </Typography>
                <MinMax name="Metro Population" questionMarkText="Enter minimum and maximum size for the metro area population" columnName="metro_population" />
                <MinMax name="Metro AQI" questionMarkText="Enter minimum and maximum amount for the air quality index in the metro area" columnName="metro_aqi" />
                <MinMax name="Metro NWI" questionMarkText="Enter minimum and maximum amount for the average national walking index in the metro area" columnName="metro_avg_nwi" />
                <MinMax name="Metro Unemployment Rate" questionMarkText="Enter minimum and maximum amounts for the average unemployment rate in teh metro area" columnName="metro_unemployment" />
                <MinMax name="Metro 1 Bedroom Rent Cost" questionMarkText="Enter minimum and maximum values for an average one bedroom rent cost in the metro area" columnName="metro_one_br_price" /> 
                <MinMax name="Metro 2 Bedroom Rent Cost" questionMarkText="Enter minimum and maximum values for an average two bedroom rent cost in the metro area" columnName="metro_two_br_price" />
            </Box>
            <Box sx={{ width: '30%', margin: '10px' }}>
              {/* This column is responsible for the State Level*/}
              <Typography variant="h5" component="h2" sx={{ marginBottom: '15px' }}>
                State
              </Typography>
              <SelectMany name="States" questionMarkText="Choose a US state" columnName="state" />
              <MinMax name="State 1 Bedroom Rent Cost" questionMarkText="Enter minimum and maximum values for an average one bedroom rent cost in the state" columnName="state_one_br_price" /> 
              <MinMax name="State 2 Bedroom Rent Cost" questionMarkText="Enter minimum and maximum values for an average two bedroom rent cost in the state" columnName="state_two_br_price" />
              <MinMax name="State Min Wage" questionMarkText="Enter minimum and maximum values for the state minimum wage" columnName="state_min_wage" />
              <Dropdown name="Marijuana Legal Status" questionMarkText="Choose marijuana legal status if you are interested" columnName="mj_legal_status" />
              <Dropdown name="Marijuana Medicinal Status" questionMarkText="Choose marijuana medicinal status if you are interested" columnName="mj_medicinal" />
              <Dropdown name="Marijuana Criminal Status" questionMarkText="Choose marijuana criminal status" columnName="mj_decriminalized" trueValue="Decriminalized" falseValue="Criminalized" />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button sx={{ width: '200px', height: '60px', p: 3, fontSize: '24px' }} variant="contained" size="large">
              Search
            </Button>
          </Box>
        </Paper>
      </>
    );
}
export default SearchBox;