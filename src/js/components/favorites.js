import * as React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
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
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import axios from 'axios';

const URL = process.env.REACT_APP_BD_URL;

// This function is making an API call to add items to favorites:

const removeFromFavorites = (userId, cityId, token) => {
  const url = `${URL}/users/${userId}/favorites/${cityId}`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log("Axios: ", userId, cityId, token)
  return axios.delete(url, config);
};

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
}

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
  const { numSelected, setSelectedIds, passToken, passUserId, passSelectedIds } = props;

  // Function to delete from Favorites
  const handleRemoveFavoritesClick = (userId, token, selectedIds) => {
    selectedIds.forEach((cityId, index) => {
      removeFromFavorites(userId, cityId, token)
        .then((response) => {
          // Handle success for this city
          console.log(response.data.message);
          console.log(`Removing favorite with ID ${cityId}...`);
          setSelectedIds(prevSelectedIds => prevSelectedIds.filter(id => id !== cityId));
        })
        .catch((error) => {
          // Handle error for this city
          console.error(error);
        });
    });
  };

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
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Favorites
        </Typography>
      )}

      {numSelected > 0 && (
        <Tooltip title="Delete">
          <IconButton onClick={() => handleRemoveFavoritesClick(passUserId, passToken, passSelectedIds)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const Favorites = ({ userId, token }) => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [fetchedData, setFetchedData] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  // Getting the user's favorites
  const fetchData = async () => {
    const url = `${URL}/users/${userId}/favorites`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.get(url, config);
      setFetchedData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId, token]);

  console.log(fetchedData)

  const rows = useMemo(() => {
    return fetchedData.map(cityData => createData(cityData.city.city, cityData.city.state, cityData.city.city_population, cityData.city.city_density, cityData.city.metro_population, cityData.city.id));
  }, [fetchedData]);

  // console.log("userId in fav: ", userId);
  // console.log("token in fav: ", token);
  console.log("rows: ", rows)
  

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name, id) => {
    event.stopPropagation();
    const selectedIndex = selected.indexOf(name);
    const selectedIdIndex = selectedIds.indexOf(id);
  
    let newSelected = [];
    let newSelectedIds = [];
  
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
      newSelectedIds = newSelectedIds.concat(selectedIds, id);
    } else if (selectedIdIndex === -1) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
      newSelectedIds = newSelectedIds.concat(selectedIds.slice(0, selectedIdIndex), selectedIds.slice(selectedIdIndex + 1));
    }
  
    setSelected(newSelected);
    setSelectedIds(newSelectedIds);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            passToken={token}
            passUserId={userId}
            passSelectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
          />
          <TableContainer>
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
                    const isItemSelected = selected.indexOf(row.city) !== -1;
                    const labelId = `enhanced-table-checkbox-${index}`;
    
                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.city, row.id)}
                        role="checkbox"
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
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        />
      </Box>
    );
  }

export default Favorites;