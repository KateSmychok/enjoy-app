import { ActivityType, BookDto, GameDto, SeriesDto } from '@generated/models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getActivityType } from '../../layouts/top-items-list/utils';
import { Item } from '@global/interfaces';

interface TopItemsState {
  books: BookDto[];
  games: GameDto[];
  series: SeriesDto[];
}

const initialState: TopItemsState = {
  books: [],
  games: [],
  series: [],
};

export const topItemsSlice = createSlice({
  name: 'topItems',
  initialState,
  reducers: {
    setAllBooks(state: TopItemsState, action: PayloadAction<BookDto[]>) {
      state.books = action.payload;
    },
    setAllGames(state: TopItemsState, action: PayloadAction<GameDto[]>) {
      state.games = action.payload;
    },
    setAllSeries(state: TopItemsState, action: PayloadAction<SeriesDto[]>) {
      state.series = action.payload;
    },
    changeCount(
      state: TopItemsState,
      action: PayloadAction<{
        id: number;
        activityType: ActivityType;
        increase: boolean;
      }>,
    ) {
      const key = getActivityType(action.payload.activityType);
      const items = state[key] as Item[];
      const item = items.find((i) => i.id === action.payload.id);
      if (action.payload.increase) {
        item.inProgress += 1;
      } else {
        item.inProgress -= 1;
      }
    },
  },
});

export const topItemsSliceActions = topItemsSlice.actions;
export default topItemsSlice.reducer;
