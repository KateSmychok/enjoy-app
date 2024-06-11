import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/user-slice';
import booksReducer from './reducers/books-slice';
import authReducer from './reducers/auth-slice';
import homePageReducer from './reducers/home-page-slice';
import profilePageReducer from './reducers/profile-page-slice';

export const store = configureStore({
  reducer: {
    authReducer,
    userReducer,
    booksReducer,
    homePageReducer,
    profilePageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
