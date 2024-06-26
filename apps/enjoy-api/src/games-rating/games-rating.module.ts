import { Module } from '@nestjs/common';
import { GamesRatingService } from './games-rating.service';
import { GamesRatingController } from './games-rating.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { GamesRating } from '../entities/GamesRating';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [GamesRatingService],
  controllers: [GamesRatingController],
  imports: [MikroOrmModule.forFeature([GamesRating]), AuthModule],
})
export class GamesRatingModule {}
