import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ActivityType } from '@generated/models';
import { Item } from '@global/interfaces';

interface HomePageState {
  selectedActivityType: ActivityType;
  relevantItems: Item[];
  isLoading: boolean;
  page: number;
  totalPages: number;
  rowsPerPage: number;
}

const initialState: HomePageState = {
  selectedActivityType: ActivityType.Reading,
  relevantItems: [],
  isLoading: true,
  page: 1,
  totalPages: 1,
  rowsPerPage: 10,
};

export const homePageSlice = createSlice({
  name: 'homePage',
  initialState,
  reducers: {
    setActivityType(state: HomePageState, action: PayloadAction<ActivityType>) {
      state.selectedActivityType = action.payload;
    },
    setRelevantItems(state: HomePageState, action: PayloadAction<Item[]>) {
      state.relevantItems = action.payload;
    },
    setIsLoading(state: HomePageState, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setPage(state: HomePageState, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setTotalPages(state: HomePageState, action: PayloadAction<number>) {
      state.totalPages = action.payload;
    },
  },
});

export const homePageSliceActions = homePageSlice.actions;
export default homePageSlice.reducer;
