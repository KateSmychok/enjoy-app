import axios, {AxiosInstance} from 'axios';
import {ToastType} from "../../utils/enum";

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
    const baseURL = process.env.API_URL;
    this.ax = axios.create({ baseURL });

    this.ax.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('access-token');

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => {
        const errorMessage =
          error.response?.data?.errorDisplay || error.message || 'Unexpected error';
        setToastMsg(errorMessage, ToastType.Failed);
        return Promise.reject(error);
      }
    );

    this.ax.interceptors.response.use(
      (response) => response,
      (error) => {
        const canBeHandledByApp = error.response?.data?.isResolvable ?? false;

        if (
          !canBeHandledByApp &&
          !error.__CANCEL__ &&
          !error.response
        ) {
          const errorMessage =
            error.response?.data?.errorDisplay || error.message || 'Unexpected error';
          setToastMsg(errorMessage, ToastType.Failed);
        }

        return Promise.reject(error);
      }
    );

    this.auth = new AuthApi(null, baseURL, this.ax);
    this.users = new UsersApi(null, baseURL, this.ax);
    this.books = new BooksApi(null, baseURL, this.ax);
    this.bookRating = new BookRatingApi(null, baseURL, this.ax);
  }
}
