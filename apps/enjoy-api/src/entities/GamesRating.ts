import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from './base.entity';

export interface RatingInput {
  gameId: number;
  userId: number;
  value: number;
}

@Entity({ tableName: 'games_rating' })
export class GamesRating extends BaseEntity {
  constructor(input: RatingInput) {
    super();

    this.gameId = input.gameId;
    this.userId = input.userId;
    this.value = input.value;
  }

  @Property({ nullable: false })
  gameId: number;

  @Property({ nullable: false })
  userId: number;

  @Property({ nullable: false })
  value: number;
}
