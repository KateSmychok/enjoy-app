import { BookDto } from '@generated/models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BooksState {
  allBooks: BookDto[];
}

const initialState: BooksState = {
  allBooks: [],
};

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setAllBooks(state: BooksState, action: PayloadAction<BookDto[]>) {
      state.allBooks = action.payload;
    },
  },
});

export const booksSliceActions = booksSlice.actions;
export default booksSlice.reducer;
