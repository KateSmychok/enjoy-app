import { useEffect } from 'react';
import { useApiClient } from '@global/modules/api-client';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { topBooksSliceActions } from '../../store/reducers/top-books-slice';
import { RootState } from '../../store/store';
import { slice } from 'lodash';

export const useHomePage = () => {
  const client = useApiClient();
  const rowsPerPage = 10;

  const { allBooks, relevantBooks, page, totalPages, isLoading } = useAppSelector(
    (state: RootState) => state.topBooks,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    client.books.getAllBooks().then((res) => {
      const skip = (page - 1) * rowsPerPage;
      const limit = skip + rowsPerPage;

      dispatch(topBooksSliceActions.setAllBooks(res.data));
      dispatch(
        topBooksSliceActions.setRelevantBooks(
          slice(res.data, skip, limit),
        ),
      );
      dispatch(
        topBooksSliceActions.setTotalPages(
          Math.ceil(res.data.length / rowsPerPage),
        ),
      );
      dispatch(topBooksSliceActions.setIsLoading(false));
    });
  }, []);

  const handleSetPage = (v: number) => {
    const skip = (v - 1) * rowsPerPage;
    const limit = skip + rowsPerPage;

    dispatch(topBooksSliceActions.setRelevantBooks(slice(allBooks, skip, limit)));
    dispatch(topBooksSliceActions.setPage(v));
  };

  return {
    isLoading,
    relevantBooks,
    page,
    totalPages,
    onSetPage: (v: number) => handleSetPage(v),
  };
};
