import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {
  Input,
  Switch,
  Tooltip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
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

export default function SelectMany({
  name,
  columnName,
  questionMarkText,
  listArray,
}) {
  const [value, setValue] = useState([]);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (listArray) {
      setValue([listArray[0]]);
    }
  }, [listArray]);

  const handleActiveToggle = () => {
    setIsActive(!isActive);
  };

  const handleSelectChange = (event) => {
    setValue(event.target.value);
  };

  const [listName, setListName] = React.useState([]);
  const handleChangeMultiple = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setListName(value);
  };

  return (
    <Box sx={{ width: 250 }}>
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
                value={listName}
                onChange={handleChangeMultiple}
                inputProps={{ id: 'select-many-native' }}
              >
                <option value="" />
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
