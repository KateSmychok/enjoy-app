import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/user-slice';
import topBooksReducer from './reducers/top-books-slice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    topBooks: topBooksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
