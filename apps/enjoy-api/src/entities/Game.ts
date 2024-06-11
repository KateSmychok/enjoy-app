import { Collection, Entity, ManyToMany, Property } from '@mikro-orm/core';
import { BaseEntity } from './base.entity';
import { User } from './User';

export interface GameInput {
  title: string;
  description?: string;
}

@Entity({ tableName: 'games' })
export class Game extends BaseEntity {
  constructor(input: GameInput) {
    super();

    this.title = input.title;
    this.description = input.description;
  }

  @Property({ nullable: false })
  title: string;

  @Property({ nullable: true })
  description: string;

  @ManyToMany({
    entity: () => User,
    mappedBy: (u) => u.gamesInProgress,
    hidden: true,
  })
  gamersInProgress = new Collection<User>(this);

  @ManyToMany({
    entity: () => User,
    mappedBy: (u) => u.gamesCompleted,
    hidden: true,
  })
  gamersCompleted = new Collection<User>(this);

  @ManyToMany({
    entity: () => User,
    mappedBy: (u) => u.gamesPlanned,
    hidden: true,
  })
  gamersPlanned = new Collection<User>(this);
}
