import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/mysql';
import { slice } from 'lodash';
import { Game } from '../entities/Game';
import { GamesRating } from '../entities/GamesRating';
import { CreateGameDto } from './dto/create-game.dto';
import { GamesMapper } from './games.mapper';
import { GetGamesQuery } from './queries/get-games.query';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private readonly gamesRepository: EntityRepository<Game>,
    @InjectRepository(GamesRating)
    private readonly ratingRepository: EntityRepository<GamesRating>,
    private readonly getGamesQuery: GetGamesQuery,
    private readonly gamesMapper: GamesMapper,
    private em: EntityManager,
  ) {}

  async getAllGames() {
    const games = await this.getGamesQuery.getAllGames();
    return slice(games, 0, 250);
  }

  async addNewGame(input: CreateGameDto) {
    if (!input.title) {
      throw new HttpException('Title not provided', HttpStatus.BAD_REQUEST);
    }

    const game = new Game({
      title: input.title,
      description: input.description,
    });

    await this.em.persistAndFlush(game);
    return this.gamesMapper.gameToDto(game);
  }
}
