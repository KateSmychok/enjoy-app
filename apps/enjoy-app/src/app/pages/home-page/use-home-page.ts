import { useEffect } from 'react';
import { useApiClient } from '@global/modules/api-client';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { topBooksSliceActions } from '@store/reducers/top-books-slice';
import { authSliceActions } from '@store/reducers/auth-slice';
import { RootState } from '@store/store';
import { slice } from 'lodash';
import { BookDto } from '@generated/models';
import { AuthMode } from '@global/utils/enum';

interface UseHomePage {
  isLoading: boolean;
  relevantBooks: BookDto[];
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
  const rowsPerPage = 10;

  const { isLoggedIn, isAuthModalOpened, mode } = useAppSelector(
    (state: RootState) => state.authReducer,
  );

  const { allBooks, relevantBooks, page, totalPages, isLoading } =
    useAppSelector((state: RootState) => state.topBooksReducer);

  const dispatch = useAppDispatch();

  const handleSetPage = (v: number) => {
    const skip = (v - 1) * rowsPerPage;
    const limit = skip + rowsPerPage;

    dispatch(
      topBooksSliceActions.setRelevantBooks(slice(allBooks, skip, limit)),
    );
    dispatch(topBooksSliceActions.setPage(v));
  };

  const handleCloseAuthModal = () => {
    dispatch(authSliceActions.closeAuthModal());
  };

  const checkAuth = async () => {};

  const init = async () => {
    const res = await client.books.getAllBooks();
    const skip = (page - 1) * rowsPerPage;
    const limit = skip + rowsPerPage;

    dispatch(topBooksSliceActions.setAllBooks(res.data));
    dispatch(
      topBooksSliceActions.setRelevantBooks(slice(res.data, skip, limit)),
    );
    dispatch(
      topBooksSliceActions.setTotalPages(
        Math.ceil(res.data.length / rowsPerPage),
      ),
    );
    dispatch(topBooksSliceActions.setIsLoading(false));
  };

  useEffect(() => {
    init();
  }, []);

  return {
    isLoading,
    relevantBooks,
    page,
    totalPages,
    onSetPage: (v: number) => handleSetPage(v),

    mode,
    isLoggedIn,
    isAuthModalOpened,
    onCloseAuthModal: handleCloseAuthModal,
  };
};
