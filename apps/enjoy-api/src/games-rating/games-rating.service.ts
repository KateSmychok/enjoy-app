import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { GiveGameRatingDto } from './dto/give-game-rating.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/mysql';
import { GamesRating } from '../entities/GamesRating';

@Injectable({ scope: Scope.REQUEST })
export class GamesRatingService {
  constructor(
    @InjectRepository(GamesRating)
    private readonly gamesRatingRepository: EntityRepository<GamesRating>,
    @Inject(REQUEST) private readonly request,
    private readonly em: EntityManager,
  ) {}

  async findUserGameRating(gameId: number) {
    const { id } = this.request.user;
    const existingRating = this.gamesRatingRepository.findOne({
      userId: id,
      gameId,
    });
    return existingRating;
  }

  async giveGameRating(input: GiveGameRatingDto) {
    const { id } = this.request.user;
    const { gameId, value } = input;

    const existingRating = await this.findUserGameRating(gameId);

    if (existingRating) {
      existingRating.value = value;
      await this.em.persistAndFlush(existingRating);
      return existingRating;
    } else {
      const rating = new GamesRating({
        userId: id,
        gameId,
        value,
      });
      await this.em.persistAndFlush(rating);
      return rating;
    }
  }
}
