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



/**
 * 
 * @export
 * @interface BookDto
 */
export interface BookDto {
    /**
     * 
     * @type {number}
     * @memberof BookDto
     */
    'id': number;
    /**
     * 
     * @type {string}
     * @memberof BookDto
     */
    'author': string;
    /**
     * 
     * @type {string}
     * @memberof BookDto
     */
    'title': string;
    /**
     * 
     * @type {string}
     * @memberof BookDto
     */
    'description'?: string;
    /**
     * 
     * @type {number}
     * @memberof BookDto
     */
    'rating'?: number;
    /**
     * 
     * @type {number}
     * @memberof BookDto
     */
    'readersInProgress'?: number;
    /**
     * 
     * @type {number}
     * @memberof BookDto
     */
    'readersCompleted'?: number;
    /**
     * 
     * @type {number}
     * @memberof BookDto
     */
    'readersPlanned'?: number;
}

