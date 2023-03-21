import * as React from 'react';
import { memo, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import { visuallyHidden } from '@mui/utils';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import searchSlice, { setOrderBy, setOrder, setSelected, setSelectedId, setRowsPerPage, setDense, setPage, setResultsData } from '../store/searchSlice.js';
import { setToken, setLoggedIn, setId } from '../store/userSlice.js';
import axios from 'axios';

const URL = process.env.REACT_APP_BD_URL;

let cityId = 0;
function createData(city, state, cityPopulation, cityDensity, metroPopulation, id) {
  cityId += 1;
  return {
    cityId,
    city,
    state,
    cityPopulation: cityPopulation || "N/A",
    cityDensity: cityDensity || "N/A",
    metroPopulation: metroPopulation || "N/A",
    id
  };
};

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// This function is making an API call to add items to favorites:

const EnhancedTableHead = React.memo((props) => {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const headCells = [
    {
      id: 'city',
      numeric: false,
      disablePadding: false,
      label: 'City',
    },
    {
      id: 'state',
      numeric: false,
      disablePadding: false,
      label: 'State',
    },
    {
      id: 'cityPopulation',
      numeric: true,
      disablePadding: false,
      label: 'City Population',
    },
    {
      id: 'cityDensity',
      numeric: true,
      disablePadding: false,
      label: 'City Density',
    },
    {
      id: 'metroPopulation',
      numeric: true,
      disablePadding: false,
      label: 'Metro Population',
    },
  ];

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
});

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  // Creagin a function that will handle adding the Favorites to the list

  const token = useSelector(state => state.user.token);
  const loggedIn = useSelector(state => state.user.loggedIn);
  const userId = useSelector(state => state.user.id);
  const selected = useSelector(state => state.search.selected);
  const selectedId = useSelector(state => state.search.selectedId);

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >

      <Typography
        sx={{ flex: '1 1 100%' }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Cities
      </Typography>

    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const Results = ({ results }) => {
  const resultsData = useSelector(state => state.search.resultsData);
  const order = useSelector(state => state.search.order);
  const orderBy = useSelector(state => state.search.orderBy);
  const selected = useSelector(state => state.search.selected);
  const selectedId = useSelector(state => state.search.selectedId);
  const page = useSelector(state => state.search.page);
  const dense = useSelector(state => state.search.dense);
  const rowsPerPage = useSelector(state => state.search.rowsPerPage);
  const loggedIn = useSelector(state => state.user.loggedIn);

  const dispatch = useDispatch();

  const rows = useMemo(() => {
    return resultsData.map(cityData => createData(cityData.city, cityData.state, cityData.city_population, cityData.city_density, cityData.metro_population, cityData.id));
  }, [resultsData]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    dispatch(setOrder(isAsc ? 'desc' : 'asc'));
    dispatch(setOrderBy(property));
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      dispatch(setSelected(rows.map((row) => row.city)));
      dispatch(setSelectedId(rows.map((row) => row.id)));
      return;
    }
    dispatch(setSelected([]));
    dispatch(setSelectedId([]));
  };

  const handleClick = (event, name, id) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    let newSelectedId = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
      newSelectedId = newSelectedId.concat(selectedId, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
      newSelectedId = newSelectedId.concat(selectedId.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
      newSelectedId = newSelectedId.concat(selectedId.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
      newSelectedId = newSelectedId.concat(
        selectedId.slice(0, selectedIndex),
        selectedId.slice(selectedIndex + 1),
      );
    }

    dispatch(setSelected(newSelected));
    dispatch(setSelectedId(newSelectedId));
  };

  const handleChangePage = (event, newPage) => {
    dispatch(setPage(newPage));
  };

  const handleChangeRowsPerPage = (event) => {
    dispatch(setRowsPerPage(parseInt(event.target.value, 10)));
    dispatch(setPage(0));
  };

  const handleChangeDense = (event) => {
    dispatch(setDense(event.target.checked));
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        {/* Checking if the user logged in */}
        {loggedIn ? (
          // If logged in, checking if there are results. If not, showing a message.
          <TableContainer>
            {rows.length === 0 ? (
              <Typography variant="body1" align="center">
                Sorry, it seems like there are no results.
              </Typography>
            ) : (
          // Else showing results
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={dense ? 'small' : 'medium'}
              >
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                />
                <TableBody>
                  {stableSort(rows, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row.city, row.id);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.cityId}
                          selected={isItemSelected}
                        >
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="normal"
                          >
                            <Link to={`/${row.id}`}>{row.city}</Link>
                          </TableCell>
                          <TableCell align="right" sx={{ width: '5%' }}>{row.state}</TableCell>
                          {/* Some values can be null, so when we are displaying them, we are showing N/A instead. */}
                          <TableCell align="right">{row.cityPopulation.toLocaleString()}</TableCell>
                          <TableCell align="right">{row.cityDensity.toLocaleString()}</TableCell>
                          <TableCell align="right">{row.metroPopulation.toLocaleString()}</TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: (dense ? 33 : 53) * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
            <TablePagination
              rowsPerPageOptions={[10, 25, 50, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        ) : (
          // If user not logged in, showing up to top 3 results and asking to login
          <>
            {rows.slice(0, 3).map((row, index) => (
              <div key={index}>
                <Link to={`/${row.id}`}>{row.city}</Link>
                <span> - {row.state}</span>
              </div>
            ))}
            <Typography variant="body1" align="center">
              If you want to view more, please&nbsp;
              <Link to="/login">Log In</Link>
              &nbsp;or&nbsp;
              <Link to="/signup">Sign Up</Link>.
            </Typography>
          </>
        )}
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}

export default memo(Results);