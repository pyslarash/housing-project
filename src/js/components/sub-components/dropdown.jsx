import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Input, Switch, Tooltip, Select, MenuItem } from '@mui/material';
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

export default function Dropdown({ name, columnName, questionMarkText, trueValue, falseValue }) {
  const [value, setValue] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [listArray, setListArray] = useState(["It doesn't matter"]);
  const URL = "http://localhost:5000"; // Defining the database URL



  useEffect(() => {
    if (listArray) {
      setValue(listArray[0]);
    }
  }, [listArray]);

  const handleActiveToggle = () => {
    setIsActive(!isActive);
    if (!isActive) { // make API request only if the toggle is being turned on
        axios.get(`${URL}/column_values?column_name=${columnName}`)
        .then((response) => {
          const formattedListArray = ["It doesn't matter", ...response.data.values];
          setListArray(formattedListArray.map(item => item === "TRUE" ? trueValue : item === "FALSE" ? falseValue : item));
        })
          .catch((error) => console.log(error));
    }
  };

  const handleSelectChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Box sx={{ width: 300 }}>
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
          <Grid item sx={{ width: '100%' }}>
            <Select
              value={value}
              onChange={handleSelectChange}
              labelId="dropdown-label"
              id="dropdown"
              disabled={!isActive}
              sx={{ width: '100%' }}
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
