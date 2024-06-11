import { Module } from '@nestjs/common';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Game } from '../entities/Game';
import { GamesRating } from '../entities/GamesRating';
import { GamesMapper } from './games.mapper';
import { GetGamesQuery } from './queries/get-games.query';

@Module({
  controllers: [GamesController],
  providers: [GamesService, GamesMapper, GetGamesQuery],
  imports: [MikroOrmModule.forFeature([Game, GamesRating])],
  exports: [GamesService],
})
export class GamesModule {}
