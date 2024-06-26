import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/mysql';

export type GetSeriesQueryResult = {
  id: number;
  title: string;
  description: string;
  rating: number;
  inProgress: number;
  completed: number;
  planned: number;
};

@Injectable()
export class GetSeriesQuery {
  constructor(private readonly em: EntityManager) {}

  async getAllSeries(): Promise<GetSeriesQueryResult[]> {
    const knex = this.em.getKnex();

    return knex('series')
      .select([
        's.id as id',
        's.title as title',
        's.description as description',
        knex.raw('avg(r.value) as rating'),
        knex.raw('count(distinct ip.user_id) as inProgress'),
        knex.raw('count(distinct c.user_id) as completed'),
        knex.raw('count(distinct p.user_id) as planned'),
      ])
      .from('series as s')
      .leftJoin('users_series_in_progress as ip', (qb) =>
        qb.on('s.id', 'ip.series_id'),
      )
      .leftJoin('users_series_completed as c', (qb) =>
        qb.on('s.id', 'c.series_id'),
      )
      .leftJoin('users_series_planned as p', (qb) =>
        qb.on('s.id', 'p.series_id'),
      )
      .leftJoin('series_rating as r', (qb) => qb.on('s.id', 'r.series_id'))
      .orderBy('inProgress', 'desc')
      .groupBy('s.id');
  }
}
