import { BookDto } from '@generated/models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TopBooksState {
  allBooks: BookDto[];
  relevantBooks: BookDto[];
  page: number;
  totalPages: number;
  isLoading: boolean;
}

const initialState: TopBooksState = {
  allBooks: [],
  relevantBooks: [],
  page: 1,
  totalPages: 1,
  isLoading: true,
};

export const topBooksSlice = createSlice({
  name: 'topBooks',
  initialState,
  reducers: {
    setAllBooks(state: TopBooksState, action: PayloadAction<BookDto[]>) {
      state.allBooks = action.payload;
    },
    setRelevantBooks(state: TopBooksState, action: PayloadAction<BookDto[]>) {
      state.relevantBooks = action.payload;
    },
    setIsLoading(state: TopBooksState, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setPage(state: TopBooksState, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setTotalPages(state: TopBooksState, action: PayloadAction<number>) {
      state.totalPages = action.payload;
    },
  },
});

export const topBooksSliceActions = topBooksSlice.actions;
export default topBooksSlice.reducer;
