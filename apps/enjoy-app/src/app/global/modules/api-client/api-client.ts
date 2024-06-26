import axios, { AxiosInstance } from 'axios';
import { ToastType } from '../../utils/enum';
import {
  AuthApi,
  BooksRatingApi,
  BooksApi,
  UsersApi,
  ProfileApi, GamesApi, GamesRatingApi
} from '@generated/index';
import { environment } from '../../../../environments/environment';

export interface IApiClient {
  auth: AuthApi;
  users: UsersApi;
  profile: ProfileApi;
  books: BooksApi;
  booksRating: BooksRatingApi;
  games: GamesApi;
  gamesRating: GamesRatingApi;
}

export class ApiClient implements IApiClient {
  auth: AuthApi;
  books: BooksApi;
  users: UsersApi;
  profile: ProfileApi;
  booksRating: BooksRatingApi;
  games: GamesApi;
  gamesRating: GamesRatingApi;

  private readonly ax: AxiosInstance;

  constructor(setToastMsg: (msg: string, type: ToastType) => void) {
    const baseURL = environment.apiUrl;
    this.ax = axios.create({ baseURL, withCredentials: true });

    this.ax.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
        return config;
      },
      (error) => {
        const errorMessage = error.message || 'Unexpected error';
        setToastMsg(errorMessage, ToastType.Failed);
        return Promise.reject(error);
      },
    );

    this.ax.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalReq = error.config;
        if (
          error.config &&
          !error.config._isRetry &&
          error.response.status === 401
        ) {
          originalReq._isRetry = true;
          try {
            const res = await axios.get(`${baseURL}/auth/refresh`, {
              withCredentials: true,
            });
            localStorage.setItem('token', res.data.accessToken);
            await this.ax.request(originalReq);
          } catch (e) {
            return Promise.reject(error);
          }
        }
        return Promise.reject(error);
      },
    );

    this.auth = new AuthApi(null as any, baseURL, this.ax);
    this.users = new UsersApi(null as any, baseURL, this.ax);
    this.profile = new ProfileApi(null as any, baseURL, this.ax);
    this.books = new BooksApi(null as any, baseURL, this.ax);
    this.booksRating = new BooksRatingApi(null as any, baseURL, this.ax);
    this.games = new GamesApi(null as any, baseURL, this.ax);
    this.gamesRating = new GamesRatingApi(null as any, baseURL, this.ax);
  }
}
