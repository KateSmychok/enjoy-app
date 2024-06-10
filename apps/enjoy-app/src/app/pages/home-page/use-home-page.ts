import { useEffect, useMemo } from 'react';
import { useApiClient } from '@global/modules/api-client';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { booksSliceActions } from '@store/reducers/books-slice';
import { authSliceActions } from '@store/reducers/auth-slice';
import { RootState } from '@store/store';
import { debounce, slice } from 'lodash';
import { ActivityType, AuthMode } from '@global/utils/enum';
import { homePageSliceActions, Item } from '@store/reducers/home-page-slice';

interface UseHomePage {
  activityType: ActivityType;
  isLoading: boolean;
  relevantItems: Item[];
  page: number;
  totalPages: number;
  onSetPage: (v: number) => void;

  mode: AuthMode;
  isLoggedIn: boolean;
  isAuthModalOpened: boolean;
  onCloseAuthModal: () => void;
}

export const useHomePage = (): UseHomePage => {
  const client = useApiClient();
  const dispatch = useAppDispatch();

  const { isLoggedIn, isAuthModalOpened, mode } = useAppSelector(
    (state: RootState) => state.authReducer,
  );
  const {
    activityType,
    relevantItems,
    isLoading,
    page,
    totalPages,
    rowsPerPage,
  } = useAppSelector((state: RootState) => state.homePageReducer);
  const { allBooks } = useAppSelector((state: RootState) => state.booksReducer);

  const items = useMemo(() => {
    switch (activityType) {
      case ActivityType.Reading:
        return allBooks;
    }
  }, [activityType]);

  const handleSetPage = (v: number) => {
    const skip = (v - 1) * rowsPerPage;
    const limit = skip + rowsPerPage;
    dispatch(homePageSliceActions.setRelevantItems(slice(items, skip, limit)));
    dispatch(homePageSliceActions.setPage(v));
  };

  const handleCloseAuthModal = () => {
    dispatch(authSliceActions.closeAuthModal());
  };

  const getTopBooks = async () => {
    const { data } = await client.books.getAllBooks();
    const skip = (page - 1) * rowsPerPage;
    const limit = skip + rowsPerPage;

    dispatch(booksSliceActions.setAllBooks(data));
    dispatch(
      homePageSliceActions.setRelevantItems(slice(data as Item[], skip, limit)),
    );
    dispatch(
      homePageSliceActions.setTotalPages(Math.ceil(data.length / rowsPerPage)),
    );
    dispatch(homePageSliceActions.setIsLoading(false));
  };

  const debouncedInit = debounce(() => {
    return init();
  }, 200);

  const init = async () => {
    getTopBooks();
  };

  useEffect(() => {
    debouncedInit();
  }, []);

  return {
    activityType,
    isLoading,
    relevantItems,
    page,
    totalPages,
    onSetPage: (v: number) => handleSetPage(v),

    mode,
    isLoggedIn,
    isAuthModalOpened,
    onCloseAuthModal: handleCloseAuthModal,
  };
};
