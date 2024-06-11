import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ActivityType } from '@generated/models';

export interface Item {
  id: number;
  author?: string;
  title: string;
  rating?: number;
  description?: string;
  inProgress?: number;
  completed?: number;
  planned?: number;
}

interface HomePageState {
  activityType: ActivityType;
  relevantItems: Item[];
  isLoading: boolean;
  page: number;
  totalPages: number;
  rowsPerPage: number;
}

const initialState: HomePageState = {
  activityType: ActivityType.Reading,
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
      state.activityType = action.payload;
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
