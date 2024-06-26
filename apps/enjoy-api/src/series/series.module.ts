import { Module } from '@nestjs/common';
import { SeriesController } from './series.controller';
import { SeriesService } from './series.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { SeriesMapper } from './series.mapper';
import { GetSeriesQuery } from './queries/get-series.query';
import { Series } from '../entities/Series';
import { SeriesRating } from '../entities/SeriesRating';

@Module({
  controllers: [SeriesController],
  providers: [SeriesService, SeriesMapper, GetSeriesQuery],
  imports: [MikroOrmModule.forFeature([Series, SeriesRating])],
  exports: [SeriesService],
})
export class SeriesModule {}
