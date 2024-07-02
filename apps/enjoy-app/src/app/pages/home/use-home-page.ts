import { useEffect, useState } from 'react';
import { debounce, slice } from 'lodash';
import { useApiClient } from '@global/modules/api-client';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { homePageSliceActions } from '@store/reducers/home-page-slice';
import { topItemsSliceActions } from '@store/reducers/top-items-slice';
import { authSliceActions } from '@store/reducers/auth-slice';
import { RootState } from '@store/store';
import { AuthMode } from '@global/utils/enum';
import {
  ActivityType,
  BookDto,
  GameDto,
  SeriesDto,
} from '@generated/models';
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

  const [isInitialized, setIsInitialized] = useState(false);

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
  const { books, games, series } = useAppSelector(
    (state: RootState) => state.topItemsReducer,
  );

  const getItems = (): Item[] => {
    switch (selectedActivityType) {
      case ActivityType.Reading:
        return books;
      case ActivityType.Playing:
        return games;
      case ActivityType.Watching:
        return series;
    }
  };

  useEffect(() => {
    dispatch(homePageSliceActions.setIsLoading(true));
    dispatch(
      homePageSliceActions.setRelevantItems(slice(getItems(), 0, rowsPerPage)),
    );
    dispatch(
      homePageSliceActions.setTotalPages(
        Math.ceil(getItems.length / rowsPerPage),
      ),
    );
    dispatch(homePageSliceActions.setIsLoading(false));
  }, [selectedActivityType, isInitialized]);

  useEffect(() => {
    dispatch(
      homePageSliceActions.setRelevantItems(slice(getItems(), 0, rowsPerPage)),
    );
  }, [books, games, series]);

  const handleSetPage = (v: number) => {
    const skip = (v - 1) * rowsPerPage;
    const limit = skip + rowsPerPage;
    dispatch(
      homePageSliceActions.setRelevantItems(slice(getItems(), skip, limit)),
    );
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

  const init = async () => {
    const [booksRes, gamesRes, seriesRes] = await Promise.all([
      client.books.getAllBooks(),
      client.games.getAllGames(),
      client.series.getAllSeries(),
    ]);

    dispatch(topItemsSliceActions.setAllBooks(booksRes.data as BookDto[]));
    dispatch(topItemsSliceActions.setAllGames(gamesRes.data as GameDto[]));
    dispatch(topItemsSliceActions.setAllSeries(seriesRes.data as SeriesDto[]));

    setIsInitialized(true);
  };

  const debouncedInit = debounce(() => {
    return init();
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
