import { Collection, Entity, ManyToMany, Property } from '@mikro-orm/core';
import { BaseEntity } from './base.entity';
import { User } from './User';

export interface SeriesInput {
  title: string;
  description?: string;
}

@Entity({ tableName: 'series' })
export class Series extends BaseEntity {
  constructor(input: SeriesInput) {
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
    mappedBy: (u) => u.seriesInProgress,
    hidden: true,
  })
  watchersInProgress = new Collection<User>(this);

  @ManyToMany({
    entity: () => User,
    mappedBy: (u) => u.seriesCompleted,
    hidden: true,
  })
  watchersCompleted = new Collection<User>(this);

  @ManyToMany({
    entity: () => User,
    mappedBy: (u) => u.seriesPlanned,
    hidden: true,
  })
  watchersPlanned = new Collection<User>(this);
}
