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
import { ChangeActivityStateDto } from '../models';
// @ts-ignore
import { UserDto } from '../models';
/**
 * ProfileApi - axios parameter creator
 * @export
 */
export const ProfileApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary 
         * @param {ChangeActivityStateDto} changeActivityStateDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        changeActivityState: async (changeActivityStateDto: ChangeActivityStateDto, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'changeActivityStateDto' is not null or undefined
            assertParamExists('changeActivityState', 'changeActivityStateDto', changeActivityStateDto)
            const localVarPath = `/profile/state`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PATCH', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(changeActivityStateDto, localVarRequestOptions, configuration)

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
        getUser: async (options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/profile/me`;
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
 * ProfileApi - functional programming interface
 * @export
 */
export const ProfileApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = ProfileApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary 
         * @param {ChangeActivityStateDto} changeActivityStateDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async changeActivityState(changeActivityStateDto: ChangeActivityStateDto, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.changeActivityState(changeActivityStateDto, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['ProfileApi.changeActivityState']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @summary 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getUser(options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UserDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getUser(options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['ProfileApi.getUser']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * ProfileApi - factory interface
 * @export
 */
export const ProfileApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = ProfileApiFp(configuration)
    return {
        /**
         * 
         * @summary 
         * @param {ChangeActivityStateDto} changeActivityStateDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        changeActivityState(changeActivityStateDto: ChangeActivityStateDto, options?: any): AxiosPromise<void> {
            return localVarFp.changeActivityState(changeActivityStateDto, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getUser(options?: any): AxiosPromise<UserDto> {
            return localVarFp.getUser(options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * ProfileApi - interface
 * @export
 * @interface ProfileApi
 */
export interface ProfileApiInterface {
    /**
     * 
     * @summary 
     * @param {ChangeActivityStateDto} changeActivityStateDto 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ProfileApiInterface
     */
    changeActivityState(changeActivityStateDto: ChangeActivityStateDto, options?: RawAxiosRequestConfig): AxiosPromise<void>;

    /**
     * 
     * @summary 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ProfileApiInterface
     */
    getUser(options?: RawAxiosRequestConfig): AxiosPromise<UserDto>;

}

/**
 * ProfileApi - object-oriented interface
 * @export
 * @class ProfileApi
 * @extends {BaseAPI}
 */
export class ProfileApi extends BaseAPI implements ProfileApiInterface {
    /**
     * 
     * @summary 
     * @param {ChangeActivityStateDto} changeActivityStateDto 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ProfileApi
     */
    public changeActivityState(changeActivityStateDto: ChangeActivityStateDto, options?: RawAxiosRequestConfig) {
        return ProfileApiFp(this.configuration).changeActivityState(changeActivityStateDto, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ProfileApi
     */
    public getUser(options?: RawAxiosRequestConfig) {
        return ProfileApiFp(this.configuration).getUser(options).then((request) => request(this.axios, this.basePath));
    }
}

