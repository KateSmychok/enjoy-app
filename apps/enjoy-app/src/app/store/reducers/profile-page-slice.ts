import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ActivityType, ItemState } from '@generated/models';

export interface Item {
  id: number;
  author?: string;
  title: string;
  rating?: number;
  inProgress?: number;
  completed?: number;
  planned?: number;
}

interface ProfilePageState {
  selectedActivityType: ActivityType;
  selectedStateType: ItemState;
  relevantItems: Item[];
  page: number;
  totalPages: number;
  rowsPerPage: number;
}

const initialState: ProfilePageState = {
  selectedActivityType: ActivityType.Reading,
  selectedStateType: ItemState.InProgress,
  relevantItems: [],
  page: 1,
  totalPages: 1,
  rowsPerPage: 10,
};

export const profilePageSlice = createSlice({
  name: 'homePage',
  initialState,
  reducers: {
    setActivityType(
      state: ProfilePageState,
      action: PayloadAction<ActivityType>,
    ) {
      state.selectedActivityType = action.payload;
    },
    setStateType(state: ProfilePageState, action: PayloadAction<ItemState>) {
      state.selectedStateType = action.payload;
    },
    setRelevantItems(state: ProfilePageState, action: PayloadAction<Item[]>) {
      state.relevantItems = action.payload;
    },
    setPage(state: ProfilePageState, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setTotalPages(state: ProfilePageState, action: PayloadAction<number>) {
      state.totalPages = action.payload;
    },
  },
});

export const profilePageSliceActions = profilePageSlice.actions;
export default profilePageSlice.reducer;
