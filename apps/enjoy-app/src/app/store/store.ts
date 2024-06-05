import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/user-slice';
import topBooksReducer from './reducers/top-books-slice';
import authReducer from './reducers/auth-slice';

const rootReducer = combineReducers({
  authReducer,
  userReducer,
  topBooksReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
