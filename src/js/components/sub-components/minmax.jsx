import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Input, Switch, Checkbox, Tooltip } from '@mui/material';
import { useState, useEffect } from 'react';
import HelpIcon from '@mui/icons-material/Help';
import axios from 'axios';


const StyledInput = styled(Input)(({ theme }) => ({
  width: '50px',
}));

const QuestionMark = styled(HelpIcon)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  fontSize: 'small',
  verticalAlign: 'middle',
  color: theme.palette.grey[500],
  cursor: 'help',
}));

export default function MinMax({ name, columnName, questionMarkText }) {
  const [minValue, setMinValue] = useState(null); // Initialize to null instead of 0
  const [maxValue, setMaxValue] = useState(null); // Initialize to null instead of 100
  const [value, setValue] = useState([0, 100]); // Initialize with default values
  const [isActive, setIsActive] = useState(false);
  const [isNAChecked, setIsNAChecked] = useState(false);
  const [isNADisabled, setIsNADisabled] = useState(false);
  const URL = "http://localhost:5000"; // Defining the database URL

  

  useEffect(() => {
    if (minValue !== null && maxValue !== null) { // Render only when the API call has completed
      setValue([minValue, maxValue]);
    }
  }, [minValue, maxValue]);

  const handleInputChange = (event, index) => {
    const newValue = event.target.value === '' ? '' : Number(event.target.value);
    const updatedValue = [...value];
    updatedValue[index] = newValue;
    setValue(updatedValue);
  };

  const handleActiveToggle = () => {
    setIsActive(!isActive);
    if (!isActive) { // make API request only if the toggle is being turned on
    axios
      .get(`${URL}/column_review?column_name=${columnName}`)
      .then(response => {
        setMinValue(response.data.min_value);
        setMaxValue(response.data.max_value);
        setIsNAChecked(response.data.null_values_exist);
        setIsNADisabled(!response.data.null_values_exist);
        console.log(response.data)
      })
      .catch(error => {
        console.error(error);
      });
    }
  };

  const handleNACheck = () => {
    if (isActive && !isNADisabled) {
      setIsNAChecked(!isNAChecked);
      if (!isNAChecked) {
        setValue([minValue || 0, maxValue || 100]);
      }
    }
  };

  return (
    <Box sx={{ width: 300 }}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography id="input-slider" gutterBottom>
            {name}
            <Tooltip title={questionMarkText}>
              <QuestionMark />
            </Tooltip>
          </Typography>
        </Grid>
        <Grid item>
          <Switch checked={isActive} onChange={handleActiveToggle} />
        </Grid>
      </Grid>
      {isActive && (
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Checkbox
              checked={isNAChecked}
              disabled={!isActive || isNADisabled}
              onChange={handleNACheck}
              inputProps={{ 'aria-label': 'NA checkbox' }}
            />
            NA
          </Grid>
          <Grid item>
            <StyledInput
              value={value[0]}
              size="small"
              onChange={(event) => handleInputChange(event, 0)}
              inputProps={{
                step: 10,
                min: minValue,
                max: maxValue,
                type: 'number',
                'aria-labelledby': 'input-slider',
              }}
              sx={{ width: 80 }}
            />
          </Grid>
          <Grid item>
            <Typography variant="body2">to</Typography>
          </Grid>
          <Grid item>
            <StyledInput
              value={value[1]}
              size="small"
              onChange={(event) => handleInputChange(event, 1)}
              inputProps={{
                step: 10,
                min: minValue,
                max: maxValue,
                type: 'number',
                'aria-labelledby': 'input-slider',
              }}
              sx={{ width: 80 }}
            />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};  
