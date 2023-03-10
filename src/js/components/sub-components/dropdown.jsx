import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Input, Switch, Tooltip, Select, MenuItem } from '@mui/material';
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

export default function Dropdown({ name, columnName, questionMarkText, listArray }) {
  const [value, setValue] = useState(null);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (listArray) {
      setValue(listArray[0]);
    }
  }, [listArray]);

  const handleActiveToggle = () => {
    setIsActive(!isActive);
  };

  const handleSelectChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Box sx={{ width: 250 }}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography id="dropdown-label" gutterBottom>
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
      {isActive && listArray && (
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Select
              value={value}
              onChange={handleSelectChange}
              labelId="dropdown-label"
              id="dropdown"
              disabled={!isActive}
            >
              {listArray.map((item) => (
                <MenuItem value={item} key={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};
