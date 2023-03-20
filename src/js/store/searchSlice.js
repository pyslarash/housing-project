import { createSlice } from '@reduxjs/toolkit';

// Here we are storing the search results and the state of the Results table
export const searchSlice = createSlice({
  name: 'search',
  initialState: { 
    resultsData: [],
    orderBy: 'cityPopulation',
    order: 'asc',
    selected: [],
    selectedId: [],
    rowsPerPage: 10,
    dense: false,
    page: 0
  },
  reducers: {
    setResultsData: (state, action) => {
      state.resultsData = action.payload;
    },
    setOrderBy: (state, action) => {
      state.orderBy = action.payload;
    },
    setOrder: (state, action) => {
      state.order = action.payload;
    },
    setSelected: (state, action) => {
      state.selected = action.payload;
    },
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
      console.log("MSG FROM SLICE: ", action.payload)
    },
    setRowsPerPage: (state, action) => {
      state.rowsPerPage = action.payload;
    },
    setDense: (state, action) => {
      state.dense = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const { setResultsData, setOrderBy, setOrder, setSelected, setSelectedId, setRowsPerPage, setDense, setPage } = searchSlice.actions;

export default searchSlice.reducer;
