import axios, { AxiosInstance } from 'axios';
import { ToastType } from '../../utils/enum';
import { AuthApi, BookRatingApi, BooksApi, UsersApi } from '@generated/index';
import { environment } from '../../../../environments/environment';

export interface IApiClient {
  auth: AuthApi;
  books: BooksApi;
  users: UsersApi;
  bookRating: BookRatingApi;
}

export class ApiClient implements IApiClient {
  auth: AuthApi;
  books: BooksApi;
  users: UsersApi;
  bookRating: BookRatingApi;

  private readonly ax: AxiosInstance;

  constructor(setToastMsg: (msg: string, type: ToastType) => void) {
    const baseURL = environment.apiUrl;
    this.ax = axios.create({ baseURL });

    this.ax.interceptors.request.use(
      (config) => config,
      (error) => {
        const errorMessage =
          error.response?.data?.errorDisplay ||
          error.message ||
          'Unexpected error';
        setToastMsg(errorMessage, ToastType.Failed);
        return Promise.reject(error);
      },
    );

    this.ax.interceptors.response.use(
      (response) => response,
      (error) => {
        const canBeHandledByApp = error.response?.data?.isResolvable ?? false;

        if (!canBeHandledByApp && !error.__CANCEL__ && !error.response) {
          const errorMessage =
            error.response?.data?.errorDisplay ||
            error.message ||
            'Unexpected error';
          setToastMsg(errorMessage, ToastType.Failed);
        }

        return Promise.reject(error);
      },
    );

    this.auth = new AuthApi(null as any, baseURL, this.ax);
    this.users = new UsersApi(null as any, baseURL, this.ax);
    this.books = new BooksApi(null as any, baseURL, this.ax);
    this.bookRating = new BookRatingApi(null as any, baseURL, this.ax);
  }
}
