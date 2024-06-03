import { slice } from 'lodash';

export interface PaginatedDto<T> {
  total: number;
  items: T[];
  skip: number;
  limit: number;
}

export function getPaginated<T>(
  items: T[],
  skip: number,
  limit: number,
): PaginatedDto<T> {
  return {
    total: items.length,
    items: slice(items, skip, skip + limit),
    skip,
    limit,
  };
}
