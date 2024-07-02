import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/user-slice';
import topItemsReducer from './reducers/top-items-slice';
import authReducer from './reducers/auth-slice';
import homePageReducer from './reducers/home-page-slice';
import profilePageReducer from './reducers/profile-page-slice';

export const store = configureStore({
  reducer: {
    authReducer,
    userReducer,
    topItemsReducer,
    homePageReducer,
    profilePageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
