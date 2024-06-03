import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { C } from 'ts-toolbelt';
import {
  ReferenceObject,
  SchemaObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export class PaginatedDto<T> {
  @ApiProperty({ type: 'integer', example: 15 })
  total: number;

  @ApiProperty({ type: 'integer', example: 0 })
  skip: number;

  @ApiProperty({ type: 'integer', example: 10 })
  limit: number;

  items: T[];
}

export function makePaginatedSchema(
  itemClass: C.Class,
): SchemaObject & Partial<ReferenceObject> {
  return {
    type: 'object',
    title: 'Paginated<' + itemClass.name + '>',
    properties: {
      total: {
        type: 'integer',
      },
      skip: {
        type: 'integer',
      },
      limit: {
        type: 'integer',
      },
      items: {
        type: 'array',
        items: { $ref: getSchemaPath(itemClass) },
      },
    },
    required: ['total', 'skip', 'limit', 'items'],
  };
}
