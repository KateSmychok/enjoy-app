import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GamesRatingService } from './games-rating.service';
import { GiveGameRatingDto } from './dto/give-game-rating.dto';

@UseGuards(JwtAuthGuard)
@Controller({ path: 'games-rating' })
@ApiTags('games-rating')
export class GamesRatingController {
  constructor(private readonly gamesRatingService: GamesRatingService) {}

  @Post('/')
  @ApiOperation({ operationId: 'giveGameRating' })
  @ApiResponse({ status: 200 })
  async giveGameRating(@Body() body: GiveGameRatingDto) {
    return this.gamesRatingService.giveGameRating(body);
  }
}
