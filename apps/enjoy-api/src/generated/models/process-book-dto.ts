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
import { BookAction } from './book-action';
// May contain unused imports in some cases
// @ts-ignore
import { BookType } from './book-type';

/**
 *
 * @export
 * @interface ProcessBookDto
 */
export interface ProcessBookDto {
  /**
   * bookId
   * @type {number}
   * @memberof ProcessBookDto
   */
  bookId: number;
  /**
   *
   * @type {BookType}
   * @memberof ProcessBookDto
   */
  type: BookType;
  /**
   *
   * @type {BookAction}
   * @memberof ProcessBookDto
   */
  action: BookAction;
}
