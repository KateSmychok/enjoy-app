import { Injectable } from '@nestjs/common';
import { Game } from '../entities/Game';
import { GameDto } from './dto/game.dto';

@Injectable()
export class GamesMapper {
  gameToDto(game: Game): GameDto {
    const dto = new GameDto();

    dto.id = game.id;
    dto.title = game.title;
    dto.description = game.description;

    return dto;
  }
}
