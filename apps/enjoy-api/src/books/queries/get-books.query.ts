import { Injectable } from "@nestjs/common";
import { EntityManager } from "@mikro-orm/mysql";

export type GetBookQueryResult = {
  id: number;
  author: string;
  title: string;
  description: string;
  rating: number;
  readersInProgress: number;
  readersCompleted: number;
  readersPlanned: number;
}

@Injectable()
export class GetBooksQuery {
  constructor(
    private readonly em: EntityManager
  ) {}

  async getAllBooks(): Promise<GetBookQueryResult[]> {
    const knex = this.em.getKnex();

    return knex('books')
      .select([
        'b.id as id',
        'b.author as author',
        'b.title as title',
        'b.description as description',
        knex.raw('avg(r.value) as rating'),
        knex.raw('count(distinct ip.user_id) as readersInProgress'),
        knex.raw('count(distinct c.user_id) as readersCompleted'),
        knex.raw('count(distinct p.user_id) as readersPlanned'),
      ])
      .from('books as b')
      .leftJoin('users_books_in_progress as ip', (qb) => qb.on('b.id', 'ip.book_id'))
      .leftJoin('users_books_completed as c', (qb) => qb.on('b.id', 'c.book_id'))
      .leftJoin('users_books_planned as p', (qb) => qb.on('b.id', 'p.book_id'))
      .leftJoin('book_rating as r', (qb) => qb.on('b.id', 'r.book_id'))
      .orderBy('readersInProgress', 'desc')
      .groupBy('b.id');
  }
}
