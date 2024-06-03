import { BookDto } from '@generated/models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  id: number;
  name: string;
  booksInProgress: BookDto[];
  booksCompleted: BookDto[];
  booksPlanned: BookDto[];
}

const initialState: UserState = {
  id: null,
  name: null,
  booksInProgress: [],
  booksCompleted: [],
  booksPlanned: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state: UserState, action: PayloadAction<UserState>) {
      return action.payload;
    },
  },
});

export default userSlice.reducer;
