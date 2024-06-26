import { Module } from '@nestjs/common';
import { SeriesRatingService } from './series-rating.service';
import { SeriesRatingController } from './series-rating.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AuthModule } from '../auth/auth.module';
import { SeriesRating } from '../entities/SeriesRating';

@Module({
  providers: [SeriesRatingService],
  controllers: [SeriesRatingController],
  imports: [MikroOrmModule.forFeature([SeriesRating]), AuthModule],
})
export class SeriesRatingModule {}
