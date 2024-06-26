import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { GiveSeriesRatingDto } from './dto/give-series-rating.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/mysql';
import { SeriesRating } from '../entities/SeriesRating';

@Injectable({ scope: Scope.REQUEST })
export class SeriesRatingService {
  constructor(
    @InjectRepository(SeriesRating)
    private readonly seriesRatingRepository: EntityRepository<SeriesRating>,
    @Inject(REQUEST) private readonly request,
    private readonly em: EntityManager,
  ) {}

  async findUserSeriesRating(seriesId: number) {
    const { id } = this.request.user;
    const existingRating = this.seriesRatingRepository.findOne({
      userId: id,
      seriesId,
    });
    return existingRating;
  }

  async giveSeriesRating(input: GiveSeriesRatingDto) {
    const { id } = this.request.user;
    const { seriesId, value } = input;

    const existingRating = await this.findUserSeriesRating(seriesId);

    if (existingRating) {
      existingRating.value = value;
      await this.em.persistAndFlush(existingRating);
      return existingRating;
    } else {
      const rating = new SeriesRating({
        userId: id,
        seriesId,
        value,
      });
      await this.em.persistAndFlush(rating);
      return rating;
    }
  }
}
