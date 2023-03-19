import { configureStore, getDefaultMiddleware, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import searchReducer from './searchSlice';
import searchBoxSliceReducer from './searchBoxSlice';
import userSliceReducer from './userSlice';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'] // only persist the 'user' slice of the store
};

const persistedReducer = persistReducer(persistConfig, combineReducers({
  search: searchReducer,
  searchBoxSlice: searchBoxSliceReducer,
  user: userSliceReducer,
}));

const middleware = [...getDefaultMiddleware(), thunk];

const store = configureStore({
  reducer: persistedReducer,
  middleware,
});

const persistor = persistStore(store);

export { store, persistor };
