import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/user-slice';
import booksReducer from './reducers/books-slice';
import authReducer from './reducers/auth-slice';
import homePageReducer from './reducers/home-page-slice';
import profilePageReducer from './reducers/profile-page-slice';

const rootReducer = combineReducers({
  authReducer,
  userReducer,
  booksReducer,
  homePageReducer,
  profilePageReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
