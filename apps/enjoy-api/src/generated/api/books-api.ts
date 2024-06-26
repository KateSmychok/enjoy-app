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
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError, operationServerMap } from '../base';
// @ts-ignore
import { BookDto } from '../models';
// @ts-ignore
import { CreateBookDto } from '../models';
/**
 * BooksApi - axios parameter creator
 * @export
 */
export const BooksApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary 
         * @param {CreateBookDto} createBookDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addBook: async (createBookDto: CreateBookDto, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'createBookDto' is not null or undefined
            assertParamExists('addBook', 'createBookDto', createBookDto)
            const localVarPath = `/books`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(createBookDto, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAllBooks: async (options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/books`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary 
         * @param {string} author 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAllBooksByAuthor: async (author: string, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'author' is not null or undefined
            assertParamExists('getAllBooksByAuthor', 'author', author)
            const localVarPath = `/books/{author}`
                .replace(`{${"author"}}`, encodeURIComponent(String(author)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * BooksApi - functional programming interface
 * @export
 */
export const BooksApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = BooksApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary 
         * @param {CreateBookDto} createBookDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async addBook(createBookDto: CreateBookDto, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<BookDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.addBook(createBookDto, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['BooksApi.addBook']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @summary 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getAllBooks(options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<BookDto>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getAllBooks(options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['BooksApi.getAllBooks']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @summary 
         * @param {string} author 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getAllBooksByAuthor(author: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<BookDto>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getAllBooksByAuthor(author, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['BooksApi.getAllBooksByAuthor']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * BooksApi - factory interface
 * @export
 */
export const BooksApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = BooksApiFp(configuration)
    return {
        /**
         * 
         * @summary 
         * @param {CreateBookDto} createBookDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addBook(createBookDto: CreateBookDto, options?: any): AxiosPromise<BookDto> {
            return localVarFp.addBook(createBookDto, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAllBooks(options?: any): AxiosPromise<Array<BookDto>> {
            return localVarFp.getAllBooks(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 
         * @param {string} author 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAllBooksByAuthor(author: string, options?: any): AxiosPromise<Array<BookDto>> {
            return localVarFp.getAllBooksByAuthor(author, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * BooksApi - interface
 * @export
 * @interface BooksApi
 */
export interface BooksApiInterface {
    /**
     * 
     * @summary 
     * @param {CreateBookDto} createBookDto 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof BooksApiInterface
     */
    addBook(createBookDto: CreateBookDto, options?: RawAxiosRequestConfig): AxiosPromise<BookDto>;

    /**
     * 
     * @summary 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof BooksApiInterface
     */
    getAllBooks(options?: RawAxiosRequestConfig): AxiosPromise<Array<BookDto>>;

    /**
     * 
     * @summary 
     * @param {string} author 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof BooksApiInterface
     */
    getAllBooksByAuthor(author: string, options?: RawAxiosRequestConfig): AxiosPromise<Array<BookDto>>;

}

/**
 * BooksApi - object-oriented interface
 * @export
 * @class BooksApi
 * @extends {BaseAPI}
 */
export class BooksApi extends BaseAPI implements BooksApiInterface {
    /**
     * 
     * @summary 
     * @param {CreateBookDto} createBookDto 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof BooksApi
     */
    public addBook(createBookDto: CreateBookDto, options?: RawAxiosRequestConfig) {
        return BooksApiFp(this.configuration).addBook(createBookDto, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof BooksApi
     */
    public getAllBooks(options?: RawAxiosRequestConfig) {
        return BooksApiFp(this.configuration).getAllBooks(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary 
     * @param {string} author 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof BooksApi
     */
    public getAllBooksByAuthor(author: string, options?: RawAxiosRequestConfig) {
        return BooksApiFp(this.configuration).getAllBooksByAuthor(author, options).then((request) => request(this.axios, this.basePath));
    }
}

