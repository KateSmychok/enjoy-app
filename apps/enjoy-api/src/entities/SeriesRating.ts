import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from './base.entity';

export interface RatingInput {
  seriesId: number;
  userId: number;
  value: number;
}

@Entity({ tableName: 'series_rating' })
export class SeriesRating extends BaseEntity {
  constructor(input: RatingInput) {
    super();

    this.seriesId = input.seriesId;
    this.userId = input.userId;
    this.value = input.value;
  }

  @Property({ nullable: false })
  seriesId: number;

  @Property({ nullable: false })
  userId: number;

  @Property({ nullable: false })
  value: number;
}
