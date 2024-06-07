import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserDto } from '@generated/models';

const initialState: UserDto = {
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
    setUser(state: UserDto, action: PayloadAction<UserDto>) {
      return action.payload;
    },
  },
});

export const userSliceActions = userSlice.actions;
export default userSlice.reducer;
