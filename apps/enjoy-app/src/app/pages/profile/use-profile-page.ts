import {useAppDispatch, useAppSelector} from "@store/hooks";
import {RootState} from "@store/store";
import {ActivityType, StateType} from "@global/utils/enum";
import {Item, profilePageSliceActions} from '@store/reducers/profile-page-slice';
import {useEffect} from "react";
import {slice} from "lodash";

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

    if (selectedActivityType === ActivityType.Reading) {
      const key = 'books' + selectedStateType as 'booksInProgress' | 'booksCompleted' | 'booksPlanned';
      dispatch(profilePageSliceActions.setRelevantItems(slice(user[key] as Item[], skip, limit)));
    }
  }, [selectedActivityType, selectedStateType, page]);

  const handleSetPage = (v: number) => {
    dispatch(profilePageSliceActions.setPage(v));
  };

  const handleSetActivityType = (type: ActivityType) => {
    dispatch(profilePageSliceActions.setActivityType(type));
  }

  const handleSetStateType = (type: StateType) => {
    dispatch(profilePageSliceActions.setStateType(type));
  }

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
  }
}
