import { useEffect, useMemo } from 'react';
import { debounce, slice } from 'lodash';
import { useApiClient } from '@global/modules/api-client';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { homePageSliceActions } from '@store/reducers/home-page-slice';
import { booksSliceActions } from '@store/reducers/books-slice';
import { authSliceActions } from '@store/reducers/auth-slice';
import { RootState } from '@store/store';
import { AuthMode } from '@global/utils/enum';
import { ActivityType } from '@generated/models';
import { Item } from '@global/interfaces';

interface UseHomePage {
  selectedActivityType: ActivityType;
  isLoading: boolean;
  relevantItems: Item[];
  page: number;
  totalPages: number;
  mode: AuthMode;
  isLoggedIn: boolean;
  isAuthModalOpened: boolean;
  onCloseAuthModal: () => void;
  onOpenAuthModal: () => void;
  onSetActivityType: (tab: ActivityType) => void;
  onSetPage: (v: number) => void;
}

export const useHomePage = (): UseHomePage => {
  const client = useApiClient();
  const dispatch = useAppDispatch();

  const { isLoggedIn, isAuthModalOpened, mode } = useAppSelector(
    (state: RootState) => state.authReducer,
  );
  const {
    selectedActivityType,
    relevantItems,
    isLoading,
    page,
    totalPages,
    rowsPerPage,
  } = useAppSelector((state: RootState) => state.homePageReducer);
  const { allBooks } = useAppSelector((state: RootState) => state.booksReducer);

  // FIXME - games, series
  const items = useMemo(() => {
    switch (selectedActivityType) {
      case ActivityType.Reading:
        return allBooks;
    }
  }, [selectedActivityType]);

  const handleSetPage = (v: number) => {
    const skip = (v - 1) * rowsPerPage;
    const limit = skip + rowsPerPage;
    dispatch(homePageSliceActions.setRelevantItems(slice(items, skip, limit)));
    dispatch(homePageSliceActions.setPage(v));
  };

  const handleCloseAuthModal = () => {
    dispatch(authSliceActions.closeAuthModal());
  };

  const handleOpenAuthModal = () => {
    dispatch(authSliceActions.openAuthModal());
  };

  const handleSetActivityType = (type: ActivityType) => {
    dispatch(homePageSliceActions.setActivityType(type));
  };

  const getTopItems = async () => {
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
    return getTopItems();
  }, 200);

  useEffect(() => {
    debouncedInit();
  }, []);

  return <UseHomePage>{
    selectedActivityType,
    isLoading,
    relevantItems,
    page,
    totalPages,
    mode,
    isLoggedIn,
    isAuthModalOpened,
    onCloseAuthModal: handleCloseAuthModal,
    onOpenAuthModal: handleOpenAuthModal,
    onSetActivityType: handleSetActivityType,
    onSetPage: (v: number) => handleSetPage(v),
  };
};
