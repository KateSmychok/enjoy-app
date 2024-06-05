import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from './base.entity';

export interface TokenInput {
  userId: number;
  refreshToken: string;
}

@Entity({ tableName: 'tokens' })
export class Token extends BaseEntity {
  constructor(input: TokenInput) {
    super();

    this.userId = input.userId;
    this.refreshToken = input.refreshToken;
  }

  @Property({ nullable: false })
  userId: number;

  @Property({ nullable: false })
  refreshToken: string;
}
