import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Input, Switch, Checkbox, Tooltip } from '@mui/material';
import { useState } from 'react';
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

const TextField = ({ name, columnName, minValue, questionMarkText }) => {
  const [isActive, setIsActive] = useState(true);
  const [isNAChecked, setIsNAChecked] = useState(false);
  const [value, setValue] = useState(minValue || 0);

  const handleInputChange = (event) => {
    const newValue = event.target.value === '' ? '' : Number(event.target.value);
    setValue(newValue);
  };

  const handleActiveToggle = () => {
    setIsActive(!isActive);
  };

  const handleNACheck = () => {
    setIsNAChecked(!isNAChecked);
    if (isNAChecked) {
      setValue(minValue || 0);
    }
  };

  return (
    <Box sx={{ width: 250 }}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography id="input-slider" gutterBottom>
            {name}
            <Tooltip title={questionMarkText}>
              <QuestionMark title={columnName} />
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
                step: 0.1,
                min: minValue,
                type: 'number',
                'aria-labelledby': 'input-slider',
              }}
            />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default TextField;
