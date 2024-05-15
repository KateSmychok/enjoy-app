import axios, {AxiosInstance, AxiosResponse} from 'axios';
import {FetchError, HttpStatusError, RequestCancelledError} from '../utils/errors';
import AuthService from './auth-service';

const timeout = 30000;

export interface IData<T> {
  promise: Promise<T | void>;
  cancel: () => void;
}

function getStandardHeaders() {
  return {
    Authorization: `Bearer ${AuthService.authToken}`,
  };
}

interface IApiClient {
  get<T>(endpoint: string): IData<T>;

  post<T, U>(endpoint: string, data?: T): IData<U>;

  patch<T, U>(endpoint: string, data?: T): IData<U>;

  delete<T>(endpoint: string): IData<T>;
}

class ApiClientInner implements IApiClient {
  private axiosInstance: AxiosInstance;

  private handleError(url: string, err: any): never {
    if (axios.isCancel(err)) {
      throw new RequestCancelledError();
    }

    if (err.response) {
      throw new HttpStatusError(
        err.response.status,
        err.response.statusText,
        url.includes('?') ? url.substring(0, url.indexOf('?')) : url,
      );
    }

    if (err.request) {
      throw new FetchError(err);
    }

    throw err;
  }

  constructor() {
    this.axiosInstance = axios.create();
  }

  get<T>(endpoint: string): IData<T> {
    const url = `${process.env.API_URL}/${endpoint}`;
    const source = axios.CancelToken.source();

    const promise = this.axiosInstance
      .get<T>(url, {
        headers: {
          ...getStandardHeaders(),
        },
        timeout,
        cancelToken: source.token,
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        this.handleError(url, err);
      });

    return {promise, cancel: source.cancel};
  }

  post<T, U>(endpoint: string, data: T): IData<U> {
    const url = `${process.env.API_URL}/${endpoint}`;
    const source = axios.CancelToken.source();

    const promise = this.axiosInstance
      .post<T, AxiosResponse<U>>(url, data, {
        headers: {
          ...getStandardHeaders(),
        },
        timeout,
        cancelToken: source.token,
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        this.handleError(url, err);
      });

    return {promise, cancel: source.cancel};
  }

  patch<T, U>(endpoint: string, data: T): IData<U> {
    const url = `${process.env.API_URL}/${endpoint}`;
    const source = axios.CancelToken.source();

    const promise = this.axiosInstance
      .patch<T, AxiosResponse<U>>(url, data, {
        headers: {
          ...getStandardHeaders(),
        },
        timeout,
        cancelToken: source.token,
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        this.handleError(url, err);
      });

    return {promise, cancel: source.cancel};
  }

  delete<T, U>(endpoint: string): IData<U> {
    const url = `${process.env.API_URL}/${endpoint}`;
    const source = axios.CancelToken.source();

    const promise = this.axiosInstance
      .delete<T, AxiosResponse<U>>(url, {
        headers: {
          ...getStandardHeaders(),
        },
        timeout,
        cancelToken: source.token,
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        this.handleError(url, err);
      });

    return {promise, cancel: source.cancel};
  }
}

const ApiClient = new ApiClientInner();

export {IApiClient, ApiClient};
