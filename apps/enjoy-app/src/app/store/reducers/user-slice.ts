import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IUser {
  id: null;
  name: null;
  email: null;
  isActivated: boolean;
  booksInProgress: [];
  booksCompleted: [];
  booksPlanned: [];
}

const initialState: IUser = {
  id: null,
  name: null,
  email: null,
  isActivated: false,
  booksInProgress: [],
  booksCompleted: [],
  booksPlanned: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state: IUser, action: PayloadAction<IUser>) {
      return action.payload;
    },
  },
});

export const userSliceActions = userSlice.actions;
export default userSlice.reducer;
