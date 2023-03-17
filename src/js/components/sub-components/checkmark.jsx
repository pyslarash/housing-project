import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Checkbox, Tooltip } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';

const QuestionMark = styled(HelpIcon)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  fontSize: 'small',
  verticalAlign: 'middle',
  color: theme.palette.grey[500],
  cursor: 'help',
}));

const Checkmark = ({ name, questionMarkText, onCheckingChange }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (event) => {
    setIsChecked(event.target.checked);
    onCheckingChange(!isChecked);
  };

  return (
    <Box sx={{ width: 300 }}>
      <Grid container alignItems="center">
        <Grid item>
          <Checkbox
            checked={isChecked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'checkmark' }}
          />
        </Grid>
        <Grid item>
          <Typography id="input-slider" gutterBottom>
            {name}
            <Tooltip title={questionMarkText}>
              <QuestionMark />
            </Tooltip>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Checkmark;
