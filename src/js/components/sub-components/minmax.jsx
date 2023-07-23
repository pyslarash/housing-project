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

export default function MinMax({ name, questionMarkText, columnName, onMinChange, onMaxChange, onNAChange, isItActive,
                                                                      minChange, maxChange, NAChange, activeChange }) {
  const [minValue, setMinValue] = useState(minChange); // Initialize to null instead of 0
  const [maxValue, setMaxValue] = useState(maxChange); // Initialize to null instead of 100
  const [value, setValue] = useState([0, 100]); // Initialize with default values
  const [isActive, setIsActive] = useState(activeChange);
  const [isNAChecked, setIsNAChecked] = useState(NAChange);
  const [isNADisabled, setIsNADisabled] = useState(false);
  const [apiCallMade, setApiCallMade] = useState(false); // Checking whether we already made an API call using toggle
  const URL = process.env.REACT_APP_BD_URL; // Defining the database URL



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

    if (index === 0) {
      setMinValue(newValue);
      onMinChange(newValue);
    } else if (index === 1) {
      setMaxValue(newValue);
      onMaxChange(newValue);
    }
  };

  const handleActiveToggle = () => {
    setIsActive(!isActive);
    if (!isActive) {
      if (!apiCallMade) {
        axios
          .get(`${URL}/column_review?column_name=${columnName}`)
          .then(response => {
            setMinValue(response.data.min_value); // Setting the most min value
            onMinChange(response.data.min_value); // Passing that value to SearchBox
            setMaxValue(response.data.max_value); // Settign the most max value
            onMaxChange(response.data.max_value); // Passing it to the SearchBox
            setIsNAChecked(response.data.null_values_exist); // Do we need to check NA?
            onNAChange(response.data.null_values_exist); // Sending it to the SearchBox
            setIsNADisabled(!response.data.null_values_exist); // Making the checkbox disabled if needed
            setApiCallMade(true); // Marking as API call made
            // console.log(response.data)
          })
          .catch(error => {
            console.error(error);
          });
      } else {
        onMinChange(minValue);
        onMaxChange(maxValue);
        onNAChange(isNAChecked);
      }
      isItActive(!isActive);
    } else {
      onMinChange(null);
      onMaxChange(null);
      onNAChange(null);
      isItActive(false);
    }
  };


  const handleNACheck = () => {
    if (isActive && !isNADisabled) {
      setIsNAChecked(!isNAChecked);
      onNAChange(!isNAChecked);
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
