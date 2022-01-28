import { configureStore } from '@reduxjs/toolkit'
import tokenReducer from "../features/ds/tokenSlice";
import { dsApi } from '../features/ds/dsSlice';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {combineReducers} from "redux"; 
import { getDefaultMiddleware } from '@reduxjs/toolkit';

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false
})

const reducers = combineReducers({
  token: tokenReducer,
  [dsApi.reducerPath]: dsApi.reducer,      
 });

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: {
    persistedReducer
  },
})