import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/mysql';
import { slice } from 'lodash';
import { GetSeriesQuery } from './queries/get-series.query';
import { SeriesMapper } from './series.mapper';
import { CreateSeriesDto } from './dto/create-series.dto';
import { Series } from '../entities/Series';
import { SeriesRating } from '../entities/SeriesRating';

@Injectable()
export class SeriesService {
  constructor(
    @InjectRepository(Series)
    private readonly gamesRepository: EntityRepository<Series>,
    @InjectRepository(SeriesRating)
    private readonly ratingRepository: EntityRepository<SeriesRating>,
    private readonly getSeriesQuery: GetSeriesQuery,
    private readonly seriesMapper: SeriesMapper,
    private em: EntityManager,
  ) {}

  async getAllSeries() {
    const series = await this.getSeriesQuery.getAllSeries();
    return slice(series, 0, 250);
  }

  async addNewSeries(input: CreateSeriesDto) {
    if (!input.title) {
      throw new HttpException('Title not provided', HttpStatus.BAD_REQUEST);
    }

    const series = new Series({
      title: input.title,
      description: input.description,
    });

    await this.em.persistAndFlush(series);
    return this.seriesMapper.seriesToDto(series);
  }
}
