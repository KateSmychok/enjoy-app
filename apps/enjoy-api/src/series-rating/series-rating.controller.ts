import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SeriesRatingService } from './series-rating.service';
import { GiveSeriesRatingDto } from './dto/give-series-rating.dto';

@UseGuards(JwtAuthGuard)
@Controller({ path: 'series-rating' })
@ApiTags('series-rating')
export class SeriesRatingController {
  constructor(private readonly seriesRatingService: SeriesRatingService) {}

  @Post('/')
  @ApiOperation({ operationId: 'giveSeriesRating' })
  @ApiResponse({ status: 200 })
  async giveSeriesRating(@Body() body: GiveSeriesRatingDto) {
    return this.seriesRatingService.giveSeriesRating(body);
  }
}
