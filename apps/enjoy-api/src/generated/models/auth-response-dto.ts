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


// May contain unused imports in some cases
// @ts-ignore
import { UserDto } from './user-dto';

/**
 * 
 * @export
 * @interface AuthResponseDto
 */
export interface AuthResponseDto {
    /**
     * 
     * @type {string}
     * @memberof AuthResponseDto
     */
    'accessToken': string;
    /**
     * 
     * @type {string}
     * @memberof AuthResponseDto
     */
    'refreshToken': string;
    /**
     * 
     * @type {UserDto}
     * @memberof AuthResponseDto
     */
    'user': UserDto;
}

