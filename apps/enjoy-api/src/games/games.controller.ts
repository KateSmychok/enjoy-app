import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GamesService } from './games.service';
import { GameDto } from './dto/game.dto';
import { CreateGameDto } from './dto/create-game.dto';

@Controller('games')
@ApiTags('games')
export class GamesController {
  constructor(private gamesService: GamesService) {}

  @Get('/')
  @ApiOperation({ operationId: 'getAllGames' })
  @ApiResponse({ status: 200, type: [GameDto] })
  async getAllGames(): Promise<GameDto[]> {
    return this.gamesService.getAllGames();
  }

  @Post('/')
  @ApiOperation({ operationId: 'addGame' })
  @ApiResponse({ status: 200, type: GameDto })
  async addNewGame(@Body() body: CreateGameDto): Promise<GameDto> {
    return this.gamesService.addNewGame(body);
  }
}
