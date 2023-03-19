import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import searchReducer from "./searchSlice"
import searchBoxSliceReducer from './searchBoxSlice';
import thunk from 'redux-thunk';

const middleware = [...getDefaultMiddleware(), thunk];


const store = configureStore({
  reducer: {
    search: searchReducer,
    searchBoxSlice: searchBoxSliceReducer,
  },
  middleware,
});
store.subscribe(() => {
  console.log("Updated store:", store.getState());
});
export default store;