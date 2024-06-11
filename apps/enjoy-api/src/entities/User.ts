import { Collection, Entity, ManyToMany, Property } from '@mikro-orm/core';
import { BaseEntity } from './base.entity';
import { Book } from './Book';
import { Game } from './Game';
import { Series } from './Series';

export interface UserInput {
  email: string;
  password: string;
  activationLink: string;
  roles: string[];
}

@Entity({ tableName: 'users' })
export class User extends BaseEntity {
  constructor(input: UserInput) {
    super();

    this.email = input.email;
    this.password = input.password;
    this.activationLink = input.activationLink;
    this.roles = input.roles.join(',');
  }

  @Property({ nullable: false })
  email: string;

  @Property({ nullable: false })
  password: string;

  @Property({ nullable: true })
  name: string;

  @Property({ nullable: true })
  roles: string;

  @Property({ nullable: true })
  isActivated: boolean;

  @Property({ nullable: true })
  activationLink: string;

  @ManyToMany({
    entity: () => Book,
    inversedBy: (b) => b.readersInProgress,
    owner: true,
    pivotTable: 'users_books_in_progress',
    joinColumn: 'user_id',
    inverseJoinColumn: 'book_id',
    hidden: true,
  })
  booksInProgress = new Collection<Book>(this);

  @ManyToMany({
    entity: () => Book,
    inversedBy: (b) => b.readersCompleted,
    owner: true,
    pivotTable: 'users_books_completed',
    joinColumn: 'user_id',
    inverseJoinColumn: 'book_id',
    hidden: true,
  })
  booksCompleted = new Collection<Book>(this);

  @ManyToMany({
    entity: () => Book,
    inversedBy: (b) => b.readersPlanned,
    owner: true,
    pivotTable: 'users_books_planned',
    joinColumn: 'user_id',
    inverseJoinColumn: 'book_id',
    hidden: true,
  })
  booksPlanned = new Collection<Book>(this);

  @ManyToMany({
    entity: () => Game,
    inversedBy: (g) => g.gamersInProgress,
    owner: true,
    pivotTable: 'users_games_in_progress',
    joinColumn: 'user_id',
    inverseJoinColumn: 'game_id',
    hidden: true,
  })
  gamesInProgress = new Collection<Game>(this);

  @ManyToMany({
    entity: () => Game,
    inversedBy: (g) => g.gamersCompleted,
    owner: true,
    pivotTable: 'users_games_completed',
    joinColumn: 'user_id',
    inverseJoinColumn: 'game_id',
    hidden: true,
  })
  gamesCompleted = new Collection<Game>(this);

  @ManyToMany({
    entity: () => Game,
    inversedBy: (g) => g.gamersPlanned,
    owner: true,
    pivotTable: 'users_games_planned',
    joinColumn: 'user_id',
    inverseJoinColumn: 'game_id',
    hidden: true,
  })
  gamesPlanned = new Collection<Game>(this);

  @ManyToMany({
    entity: () => Series,
    inversedBy: (s) => s.watchersInProgress,
    owner: true,
    pivotTable: 'users_series_in_progress',
    joinColumn: 'user_id',
    inverseJoinColumn: 'series_id',
    hidden: true,
  })
  seriesInProgress = new Collection<Series>(this);

  @ManyToMany({
    entity: () => Series,
    inversedBy: (s) => s.watchersCompleted,
    owner: true,
    pivotTable: 'users_series_completed',
    joinColumn: 'user_id',
    inverseJoinColumn: 'series_id',
    hidden: true,
  })
  seriesCompleted = new Collection<Series>(this);

  @ManyToMany({
    entity: () => Series,
    inversedBy: (s) => s.watchersPlanned,
    owner: true,
    pivotTable: 'users_series_planned',
    joinColumn: 'user_id',
    inverseJoinColumn: 'series_id',
    hidden: true,
  })
  seriesPlanned = new Collection<Series>(this);
}
