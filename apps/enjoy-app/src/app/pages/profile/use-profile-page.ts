import { useAppDispatch, useAppSelector } from '@store/hooks';
import { RootState } from '@store/store';
import {
  Item,
  profilePageSliceActions,
} from '@store/reducers/profile-page-slice';
import { useEffect } from 'react';
import { slice } from 'lodash';
import { getActivityType } from '../../layouts/top-items-list/utils';
import { ActivityType, ItemState } from '@generated/models';

export const useProfilePage = () => {
  const dispatch = useAppDispatch();

  const {
    selectedActivityType,
    selectedStateType,
    relevantItems,
    page,
    totalPages,
    rowsPerPage,
  } = useAppSelector((state: RootState) => state.profilePageReducer);
  const user = useAppSelector((state: RootState) => state.userReducer);

  useEffect(() => {
    const skip = (page - 1) * rowsPerPage;
    const limit = skip + rowsPerPage;
    const key = getActivityType(selectedActivityType) + selectedStateType;

    dispatch(
      profilePageSliceActions.setRelevantItems(
        slice(user[key] as Item[], skip, limit),
      ),
    );
  }, [selectedActivityType, selectedStateType, page]);

  const handleSetPage = (v: number) => {
    dispatch(profilePageSliceActions.setPage(v));
  };

  const handleSetActivityType = (type: ActivityType) => {
    dispatch(profilePageSliceActions.setActivityType(type));
  };

  const handleSetStateType = (type: ItemState) => {
    dispatch(profilePageSliceActions.setStateType(type));
  };

  return {
    selectedActivityType,
    onSetActivityType: handleSetActivityType,
    selectedStateType,
    onSetStateType: handleSetStateType,
    relevantItems,
    page,
    totalPages,
    rowsPerPage,
    onSetPage: handleSetPage,
  };
};
