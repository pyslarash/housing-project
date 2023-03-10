import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Input, Switch, Checkbox, Tooltip } from '@mui/material';
import { useState, useEffect } from 'react';
import HelpIcon from '@mui/icons-material/Help';

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

export default function MinMax({ name, minValue, maxValue, columnName, isNACheckedProp, questionMarkText }) {
  const [value, setValue] = useState([minValue || 0, maxValue || 100]);
  const [isActive, setIsActive] = useState(true);
  const [isNAChecked, setIsNAChecked] = useState(Boolean(isNACheckedProp));
  const [isNADisabled, setIsNADisabled] = useState(false);

  useEffect(() => {
    if (!isNACheckedProp) {
      setIsNAChecked(false);
      setIsNADisabled(true);
    }
  }, [isNACheckedProp]);

  const handleInputChange = (event, index) => {
    const newValue = event.target.value === '' ? '' : Number(event.target.value);
    const updatedValue = [...value];
    updatedValue[index] = newValue;
    setValue(updatedValue);
  };

  const handleActiveToggle = () => {
    setIsActive(!isActive);
  };

  const handleNACheck = () => {
    if (isActive && !isNADisabled) {
      setIsNAChecked(!isNAChecked);
      if (!isNAChecked) {
        setValue([minValue || 0, maxValue || 100]);
      }
    }
  };

  // const isNA = () => {
  //   return value[0] === minValue && value[1] === maxValue;
  // };

  return (
    <Box sx={{ width: 250 }}>
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
              sx={{ width: 60 }}
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
              sx={{ width: 60 }}
            />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};  
