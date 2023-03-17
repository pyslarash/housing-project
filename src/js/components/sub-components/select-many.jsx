import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {
  Switch,
  Tooltip,
  Select,
  FormControl,
} from '@mui/material';
import { useState, useEffect } from 'react';
import HelpIcon from '@mui/icons-material/Help';
import axios from 'axios';

const QuestionMark = styled(HelpIcon)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  fontSize: 'small',
  verticalAlign: 'middle',
  color: theme.palette.grey[500],
  cursor: 'help',
}));

export default function SelectMany({
  name,
  columnName,
  questionMarkText,
  onSelectingChange,
  isItActive,
  selections,
  activeChange,
  storeListArray,
  getListArray,
}) {
  const [value, setValue] = useState(selections);
  const [isActive, setIsActive] = useState(activeChange);
  const [listArray, setListArray] = useState(getListArray);
  const URL = "http://localhost:5000"; // Defining the database URL

  useEffect(() => {
    if (listArray && selections !== undefined) {
      setValue(selections);
    }
  }, [listArray, selections]);

  const handleActiveToggle = () => {
    setIsActive(!isActive);
    if (!isActive) {
      axios
        .get(`${URL}/column_values?column_name=${columnName}`)
        .then((response) => {
          const sortedValues = response.data.values.sort();
          setListArray(sortedValues);
          storeListArray(sortedValues);
        })
        .catch((error) => console.log(error));
    } else {
      setListName([]);
      onSelectingChange(null);
    }
    isItActive(!isActive);
  };

  const handleSelectChange = (event) => {
    setValue(event.target.value);
  };

  const [listName, setListName] = useState([]);

  const handleChangeMultiple = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setListName(value);
    onSelectingChange(value);
  };

  return (
    <Box sx={{ width: 300 }}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography id="select-many-label" gutterBottom>
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
            <FormControl sx={{ width: '100%' }}>
              <Select
                labelId="select-many-native-label"
                id="select-many-native"
                multiple
                native
                value={value === undefined ? '' : value}
                onChange={handleChangeMultiple}
                inputProps={{ id: 'select-many-native' }}
              >
                {listArray.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
