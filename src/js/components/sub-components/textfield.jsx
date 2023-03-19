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

const TextField = ({ name, columnName, questionMarkText, onMinChange, onNAChange, isItActive,
                                                          min, NAChange, activeChange }) => {
  const [isActive, setIsActive] = useState(activeChange);
  const [isNAChecked, setIsNAChecked] = useState(NAChange);
  const [minValue, setMinValue] = useState(min); // Initialize to null instead of 0
  const [value, setValue] = useState(minValue || 0);
  const [isNADisabled, setIsNADisabled] = useState(false);
  const URL = process.env.REACT_APP_BD_URL; // Defining the database URL



  useEffect(() => {
    if (minValue !== null) { // Render only when the API call has completed
      setValue(minValue);
    }
  }, [minValue]);

  const handleInputChange = (event) => {
    const newValue = event.target.value === '' ? '' : Number(event.target.value);
    setValue(newValue);
    onMinChange(newValue);
  };

  const handleActiveToggle = () => {
    setIsActive(!isActive);
    if (!isActive) { // make API request only if the toggle is being turned on
      axios
        .get(`${URL}/column_review?column_name=${columnName}`)
        .then(response => {
          setMinValue(response.data.min_value);
          onMinChange(response.data.min_value);
          setIsNAChecked(response.data.null_values_exist);
          onNAChange(response.data.null_values_exist);
          setIsNADisabled(!response.data.null_values_exist);
          console.log(response.data)
        })
        .catch(error => {
          console.error(error);
        });
      isItActive(!isActive);
    }
    else {
      onMinChange(null);
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
              onChange={handleNACheck}
              inputProps={{ 'aria-label': 'NA checkbox' }}
            />
            NA
          </Grid>
          <Grid item>
            <StyledInput
              value={value}
              size="small"
              onChange={handleInputChange}
              inputProps={{
                step: 1,
                min: minValue,
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

export default TextField;
