import { useEffect } from 'react';
import { useApiClient } from '@global/modules/api-client';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { topBooksSliceActions } from '@store/reducers/top-books-slice';
import { authSliceActions } from '@store/reducers/auth-slice';
import { RootState } from '@store/store';
import { debounce, slice } from 'lodash';
import { BookDto, UserDto } from '@generated/models';
import { AuthMode } from '@global/utils/enum';
import { userSliceActions } from '@store/reducers/user-slice';

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

  const checkAuth = async () => {
    const { data } = await client.auth.refreshToken();
    localStorage.setItem('token', data.accessToken);
    dispatch(authSliceActions.logIn());
    dispatch(userSliceActions.setUser(data.user as UserDto));
  };

  const getTopBooks = async () => {
    const { data } = await client.books.getAllBooks();
    const skip = (page - 1) * rowsPerPage;
    const limit = skip + rowsPerPage;

    dispatch(topBooksSliceActions.setAllBooks(data));
    dispatch(topBooksSliceActions.setRelevantBooks(slice(data, skip, limit)));
    dispatch(
      topBooksSliceActions.setTotalPages(Math.ceil(data.length / rowsPerPage)),
    );
    dispatch(topBooksSliceActions.setIsLoading(false));
  };

  const debouncedInit = debounce(() => {
    return init();
  }, 200);

  const init = async () => {
    if (localStorage.getItem('token')) await checkAuth();
    getTopBooks();
  };

  useEffect(() => {
    debouncedInit();
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
