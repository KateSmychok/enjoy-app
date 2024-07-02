import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/mysql';

export type GetGamesQueryResult = {
  id: number;
  title: string;
  description: string;
  rating: number;
  inProgress: number;
  completed: number;
  planned: number;
};

@Injectable()
export class GetGamesQuery {
  constructor(private readonly em: EntityManager) {}

  async getAllGames(): Promise<GetGamesQueryResult[]> {
    const knex = this.em.getKnex();

    return knex('games')
      .select([
        'g.id as id',
        'g.title as title',
        'g.description as description',
        knex.raw('avg(r.value) as rating'),
        knex.raw('count(distinct ip.user_id) as inProgress'),
        knex.raw('count(distinct c.user_id) as completed'),
        knex.raw('count(distinct p.user_id) as planned'),
      ])
      .from('games as g')
      .leftJoin('users_games_in_progress as ip', (qb) =>
        qb.on('g.id', 'ip.game_id'),
      )
      .leftJoin('users_games_completed as c', (qb) =>
        qb.on('g.id', 'c.game_id'),
      )
      .leftJoin('users_games_planned as p', (qb) => qb.on('g.id', 'p.game_id'))
      .leftJoin('games_rating as r', (qb) => qb.on('g.id', 'r.game_id'))
      .orderBy('inProgress', 'desc')
      .groupBy('g.id');
  }
}
