import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/mysql';

export type GetBooksQueryResult = {
  id: number;
  author: string;
  title: string;
  description: string;
  rating: number;
  inProgress: number;
  completed: number;
  planned: number;
};

@Injectable()
export class GetBooksQuery {
  constructor(private readonly em: EntityManager) {}

  async getAllBooks(): Promise<GetBooksQueryResult[]> {
    const knex = this.em.getKnex();

    return knex('books')
      .select([
        'b.id as id',
        'b.author as author',
        'b.title as title',
        'b.description as description',
        knex.raw('avg(r.value) as rating'),
        knex.raw('count(distinct ip.user_id) as inProgress'),
        knex.raw('count(distinct c.user_id) as completed'),
        knex.raw('count(distinct p.user_id) as planned'),
      ])
      .from('books as b')
      .leftJoin('users_books_in_progress as ip', (qb) =>
        qb.on('b.id', 'ip.book_id'),
      )
      .leftJoin('users_books_completed as c', (qb) =>
        qb.on('b.id', 'c.book_id'),
      )
      .leftJoin('users_books_planned as p', (qb) => qb.on('b.id', 'p.book_id'))
      .leftJoin('books_rating as r', (qb) => qb.on('b.id', 'r.book_id'))
      .orderBy('inProgress', 'desc')
      .groupBy('b.id');
  }
}
