import { Collection, Entity, ManyToMany, Property } from '@mikro-orm/core';
import { BaseEntity } from './base.entity';
import { User } from './User';

export interface BookInput {
  author: string;
  title: string;
  description?: string;
}

@Entity({ tableName: 'books' })
export class Book extends BaseEntity {
  constructor(input: BookInput) {
    super();

    this.author = input.author;
    this.title = input.title;
    this.description = input.description;
  }

  @Property({ nullable: false })
  author: string;

  @Property({ nullable: false })
  title: string;

  @Property({ nullable: true })
  description: string;

  @ManyToMany({
    entity: () => User,
    mappedBy: (u) => u.booksInProgress,
    hidden: true,
  })
  readersInProgress = new Collection<User>(this);

  @ManyToMany({
    entity: () => User,
    mappedBy: (u) => u.booksCompleted,
    hidden: true,
  })
  readersCompleted = new Collection<User>(this);

  @ManyToMany({
    entity: () => User,
    mappedBy: (u) => u.booksPlanned,
    hidden: true,
  })
  readersPlanned = new Collection<User>(this);
}
