import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from './base.entity';

export interface RatingInput {
  bookId: number;
  userId: number;
  value: number;
}

@Entity({ tableName: 'books_rating' })
export class BooksRating extends BaseEntity {
  constructor(input: RatingInput) {
    super();

    this.bookId = input.bookId;
    this.userId = input.userId;
    this.value = input.value;
  }

  @Property({ nullable: false })
  bookId: number;

  @Property({ nullable: false })
  userId: number;

  @Property({ nullable: false })
  value: number;
}
