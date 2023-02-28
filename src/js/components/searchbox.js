import TextField from '@mui/material/TextField';
import { Button, Paper, Slider, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import React, { useState } from 'react';

function valueTextPopDensity(value) {
    return `${value}°C`;
  }

function valueTextAvgIncome(value) {
    return `${value}°C`;
};

const SearchBox = () => {

    const [valuePopDens, setValuePopDens] = useState([20, 37]);
    const [valueAvgInc, setValueAvgInc] = useState([20, 37]);

    const handleChangePopDensity = (event, newValue) => {
        setValuePopDens(newValue);
    };

    const handleChangeAvgIncome = (event, newValue) => {
        setValueAvgInc(newValue);
    };

    return (        
        <Paper sx={{ p: 5, width: '100%' }} elevation={5} >
            <Grid container>
                {/* First Row */}
                <Grid xs={3}>
                    <TextField sx={{ margin: '10px' }}
                        id="min-population"
                        label="Min Population"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid xs={3}>
                    <TextField sx={{ margin: '10px' }}
                        id="max-population"
                        label="Max Population"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid xs={3} justify="center" alignItems="center">
                    <Typography id="input-slider" gutterBottom>
                        Population Density
                    </Typography>
                    <Slider
                        style={{ width: "85%" }}
                        getAriaLabel={() => 'Population Density'}
                        value={valuePopDens}
                        onChange={handleChangePopDensity}
                        valueLabelDisplay="auto"
                        getAriaValueText={valueTextPopDensity}
                    />
                </Grid>
                <Grid xs={3} justify="center" alignItems="center">
                    <Typography id="input-slider" gutterBottom>
                        Average Income
                    </Typography>
                    <Slider
                        style={{ width: "85%" }}
                        getAriaLabel={() => 'Population Density'}
                        value={valueAvgInc}
                        onChange={handleChangeAvgIncome}
                        valueLabelDisplay="auto"
                        getAriaValueText={valueTextAvgIncome}
                    />
                </Grid>
                {/* Second Row */}
                <Grid xs={3}>
                    
                </Grid>
                <Grid xs={3}>
                    
                </Grid>
                <Grid xs={3}>
                    
                </Grid>
                <Grid xs={3}>
                    
                </Grid>
                {/* Second-to-last Row */}        
                <Grid xs={3}>
                    <TextField sx={{ margin: '10px' }}
                        id="result-limit"
                        label="Result Limit"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid xs={3}>

                </Grid>
                <Grid xs={3}>

                </Grid>
                <Grid xs={3}>

                </Grid>
                {/* Last Row */}
                <Grid xs={12} container justifyContent="flex-end">
                    <Button variant="contained" size="large">
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </Paper>

    )
}

export default SearchBox;
