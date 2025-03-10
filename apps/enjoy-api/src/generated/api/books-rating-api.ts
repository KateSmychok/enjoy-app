/* tslint:disable */
/* eslint-disable */
/**
 * api
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import type { Configuration } from '../configuration';
import type { AxiosPromise, AxiosInstance, RawAxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import {
  DUMMY_BASE_URL,
  assertParamExists,
  setApiKeyToObject,
  setBasicAuthToObject,
  setBearerAuthToObject,
  setOAuthToObject,
  setSearchParams,
  serializeDataIfNeeded,
  toPathString,
  createRequestFunction,
} from '../common';
// @ts-ignore
import {
  BASE_PATH,
  COLLECTION_FORMATS,
  RequestArgs,
  BaseAPI,
  RequiredError,
  operationServerMap,
} from '../base';
// @ts-ignore
import { GiveBookRatingDto } from '../models';
/**
 * BooksRatingApi - axios parameter creator
 * @export
 */
export const BooksRatingApiAxiosParamCreator = function (
  configuration?: Configuration,
) {
  return {
    /**
     *
     * @summary
     * @param {GiveBookRatingDto} giveBookRatingDto
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    giveBookRating: async (
      giveBookRatingDto: GiveBookRatingDto,
      options: RawAxiosRequestConfig = {},
    ): Promise<RequestArgs> => {
      // verify required parameter 'giveBookRatingDto' is not null or undefined
      assertParamExists(
        'giveBookRating',
        'giveBookRatingDto',
        giveBookRatingDto,
      );
      const localVarPath = `/books-rating`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: 'POST',
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      localVarHeaderParameter['Content-Type'] = 'application/json';

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };
      localVarRequestOptions.data = serializeDataIfNeeded(
        giveBookRatingDto,
        localVarRequestOptions,
        configuration,
      );

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
  };
};

/**
 * BooksRatingApi - functional programming interface
 * @export
 */
export const BooksRatingApiFp = function (configuration?: Configuration) {
  const localVarAxiosParamCreator =
    BooksRatingApiAxiosParamCreator(configuration);
  return {
    /**
     *
     * @summary
     * @param {GiveBookRatingDto} giveBookRatingDto
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async giveBookRating(
      giveBookRatingDto: GiveBookRatingDto,
      options?: RawAxiosRequestConfig,
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.giveBookRating(
        giveBookRatingDto,
        options,
      );
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath =
        operationServerMap['BooksRatingApi.giveBookRating']?.[
          localVarOperationServerIndex
        ]?.url;
      return (axios, basePath) =>
        createRequestFunction(
          localVarAxiosArgs,
          globalAxios,
          BASE_PATH,
          configuration,
        )(axios, localVarOperationServerBasePath || basePath);
    },
  };
};

/**
 * BooksRatingApi - factory interface
 * @export
 */
export const BooksRatingApiFactory = function (
  configuration?: Configuration,
  basePath?: string,
  axios?: AxiosInstance,
) {
  const localVarFp = BooksRatingApiFp(configuration);
  return {
    /**
     *
     * @summary
     * @param {GiveBookRatingDto} giveBookRatingDto
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    giveBookRating(
      giveBookRatingDto: GiveBookRatingDto,
      options?: any,
    ): AxiosPromise<void> {
      return localVarFp
        .giveBookRating(giveBookRatingDto, options)
        .then((request) => request(axios, basePath));
    },
  };
};

/**
 * BooksRatingApi - interface
 * @export
 * @interface BooksRatingApi
 */
export interface BooksRatingApiInterface {
  /**
   *
   * @summary
   * @param {GiveBookRatingDto} giveBookRatingDto
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof BooksRatingApiInterface
   */
  giveBookRating(
    giveBookRatingDto: GiveBookRatingDto,
    options?: RawAxiosRequestConfig,
  ): AxiosPromise<void>;
}

/**
 * BooksRatingApi - object-oriented interface
 * @export
 * @class BooksRatingApi
 * @extends {BaseAPI}
 */
export class BooksRatingApi extends BaseAPI implements BooksRatingApiInterface {
  /**
   *
   * @summary
   * @param {GiveBookRatingDto} giveBookRatingDto
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof BooksRatingApi
   */
  public giveBookRating(
    giveBookRatingDto: GiveBookRatingDto,
    options?: RawAxiosRequestConfig,
  ) {
    return BooksRatingApiFp(this.configuration)
      .giveBookRating(giveBookRatingDto, options)
      .then((request) => request(this.axios, this.basePath));
  }
}
