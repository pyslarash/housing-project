import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import searchReducer from "./searchSlice"
import searchBoxSliceReducer from './searchBoxSlice';
import userSliceReducer from "./userSlice"
import thunk from 'redux-thunk';

const middleware = [...getDefaultMiddleware(), thunk];


const store = configureStore({
  reducer: {
    search: searchReducer,
    searchBoxSlice: searchBoxSliceReducer,
    user: userSliceReducer,
  },
  middleware,
});
// store.subscribe(() => {
//   console.log("Updated store:", store.getState());
// });
export default store;